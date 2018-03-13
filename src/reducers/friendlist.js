import * as types from "../constants/ActionTypes"
import omit from "lodash/omit"
import assign from "lodash/assign"
import mapValues from "lodash/mapValues"


const initialState = {
    isFetching: false,
    didInvalidate: false,
    items: {}
};

export default function friends(state = initialState, action) {
    switch (action.type) {
        case types.ADD_FRIEND:
            const newId=state.items.friends[state.items.friends.length-1]+1;
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
                didInvalidate: false
            }
        case types.RECEIVE_FRIEND:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.friends,
                lastUpdated: action.receivedAt
            }
        default:
            return state;
    }
}