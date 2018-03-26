import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import FriendListApp from './FriendListApp';
import CartContainer from './CartContainer';
import ShoppingCart from "./ShoppingCart";
import Header from '../components/Header'

const Root = ({ store }) => (
        <div>
            <Header/>
            <Route exact path="/cart" component={ShoppingCart}/>
            <Route path="/contacts/:filter/:page" component={FriendListApp}/>
            <Route exact path="/contacts/:filter" component={FriendListApp}/>
            <Route exact path="/" component={FriendListApp}/>
            <CartContainer/>
        </div>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Root
