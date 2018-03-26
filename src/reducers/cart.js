import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE
} from '../constants/ActionTypes'

const initialState = {
  addedIds: [],
  quantityById: {},
  total: 0
}

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.friendId) !== -1) {
        return state
      }
      return [ ...state, action.friendId ]
    default:
      return state
  }
}

const quantityById = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { friendId, count } = action
      return { ...state,
        [friendId]: (state[friendId] || 0) + count
      }
    default:
      return state
  }
}

const total = (state = initialState.total, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const { price, count } = action
            return state+price*count
        default:
            return state
    }
}

export const getQuantity = (state, friendId) =>
  state.quantityById[friendId] || 0

export const getAddedIds = state => state.addedIds

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action),
        total: total(state.total, action)
      }
  }
}

export default cart
