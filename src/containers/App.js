import thunkMiddleware from 'redux-thunk'
import React, {Component} from 'react'
import FriendListApp from './FriendListApp'

import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import * as reducers from '../reducers';
import 'bootstrap/scss/bootstrap.scss'
import {fetchFriends} from '../actions/FriendActions'


const reducer = combineReducers(reducers);
let store = createStore(reducer, /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        thunkMiddleware, // позволяет нам отправлять функции
    )
);

store.dispatch(fetchFriends('friends')).then(() =>
    console.log(store.getState())
)

export default class App extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <FriendListApp/>
                </Provider>
            </div>
        )
    }
}