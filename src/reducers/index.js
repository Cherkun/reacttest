import { combineReducers } from 'redux'
import cart, * as fromCart from './cart'
import friends, * as fromFriends from './friendlist'

export default combineReducers({
    cart,
    friends,
})


const getAddedIds = state => fromCart.getAddedIds(state.cart)
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
const getFriend = (state, id) => fromFriends.getFriend(state.friendlist, id)

export const getTotalCount = state =>
    getAddedIds(state)
        .reduce((total, id) =>
            total + getQuantity(state, id),
            0
        )

export const getCartFriends = state =>
    getAddedIds(state).map(id => ({
        ...getFriend(state, id),
        quantity: getQuantity(state, id)
    }))

