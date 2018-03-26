import thunkMiddleware from 'redux-thunk';
import React, {Component} from 'react';
import Root from './Root';

import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducer from '../reducers';
import 'bootstrap/scss/bootstrap.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";


let store = createStore(reducer, /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        thunkMiddleware, // позволяет нам отправлять функции
    )
);

export default class App extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <Router>
                        <Root/>
                    </Router>
                </Provider>
            </div>
        )
    }
}
