import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTotalCount } from '../reducers'
import {CartList} from "../components/ShoppingCart";
import { withRouter } from 'react-router-dom'

class ShoppingCart extends Component {

    render() {
        const {total}=this.props;
        return (
            <div>
                <h1>Корзина</h1>
                <CartList friends={this.props.friends}/>
                <p>Сумма: &#36;{total}</p>
            </div>
    );

    }
}

ShoppingCart.propTypes = {
    total_count: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    friends: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    total_count: getTotalCount(state),
    total: state.cart.total,
    friends: state.friends.cartfriends.items.friendsById
})
export default withRouter(connect(mapStateToProps)(ShoppingCart))