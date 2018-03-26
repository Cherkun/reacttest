import * as types from "../constants/ActionTypes"
import omit from "lodash/omit"
import assign from "lodash/assign"
import mapValues from "lodash/mapValues"
import indexOf from "lodash/indexOf"
import { combineReducers } from 'redux'


const initialState = {
    isFetching: false,
    didInvalidate: false,
    items: {
        friends: [],
        friendsById: {}
    },
    meta: {}
};

const cartfriends = (state = initialState, action) => {
    console.log(indexOf(state.items.friends, action.friendId));
    switch (action.type) {
        case types.ADD_TO_CART:
            return {
                ...state,
                items: {
                    ...state.items,
                    friends: indexOf(state.items.friends, action.friendId)===-1?state.items.friends.concat(action.friendId):state.items.friends,
                    friendsById: {
                        ...state.items.friendsById,
                        [action.friendId]: {
                            id: action.friendId,
                            name: action.name,
                            price: action.price,
                            count: (state.items.friendsById[action.friendId]?state.items.friendsById[action.friendId].count:0) + action.count
                        }
                    }
                }
            }
        default:
            return state;
    }
}

const friendlist = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_TO_CART:
            return {
                ...state,
                items: {
                    ...state.items,
                    friendsById: mapValues(state.items.friendsById, (friend) => {
                        return friend.id === action.friendId ? assign({}, friend, {'inCart': true}) : friend
                    })
                }
            }
        case types.ADD_FRIEND:
            const newId = state.items.friends[state.items.friends.length - 1] + 1;
            return {
                ...state,
                items: {
                    ...state.items,
                    friends: state.items.friends.concat(newId),
                    friendsById: {
                        ...state.items.friendsById,
                        [newId]: {
                            id: newId,
                            name: action.name
                        }
                    }
                }
            }
        case types.DELETE_FRIEND:
            return {
                ...state,
                items: {
                    ...state.items,
                    friends: state.items.friends.filter(id => id !== action.id),
                    friendsById: omit(state.items.friendsById, action.id)
                }
            }
        case types.STAR_FRIEND:
            return {
                ...state,
                items: {
                    ...state.items,
                    friendsById: mapValues(state.items.friendsById, (friend) => {
                        return friend.id === action.id ? assign({}, friend, {'starred': !friend.starred}) : friend
                    })
                }
            }
        case types.INVALIDATE_FRIEND:
            return {
                ...state,
                didInvalidate: true
            }
        case types.REQUEST_FRIEND:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false,
                items: {},
            }
        case types.RECEIVE_FRIEND:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: {
                    friends: action.friends.friends,
                    friendsById:
                        mapValues(action.friends.friendsById, (friend) => {
                            return action.cart.quantityById[friend.id]>0 ? assign({}, friend, {'inCart': true}) : friend
                        })
                },
                lastUpdated: action.receivedAt,
                meta: action.meta
            }
        default:
            return state;
    }
}

export default combineReducers({
    cartfriends,
    friendlist
})