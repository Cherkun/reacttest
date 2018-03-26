import React, {Component} from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CartItem from './CartItem'

import styles from './CartList.scss'

class CartList extends Component {

    render() {
        console.log(this.props.friends)
        return (
            <div>
                <ul className={classNames(styles.cartList, {
                    'loader': this.props.isFetching,
                    'animate-bottom': !this.props.isFetching
                })}>
                    {
                        Object.keys(this.props.friends).map((i) => {
                            return (
                                <CartItem
                                    id={this.props.friends[i].id}
                                    name={this.props.friends[i].name}
                                    price={this.props.friends[i].price}
                                    count={this.props.friends[i].count} />
                            )
                        })
                    }
                </ul>
            </div>
        );
    }

    constructor (props, context) {
        super(props, context);
    }

}

CartList.propTypes = {
    friends: PropTypes.object.isRequired
}

export default CartList