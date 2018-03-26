import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import * as style from './Cart.scss'

const Cart = ({total, total_count}) => {
    const hasProducts = total_count > 0
    const nodes = hasProducts ? (
        <em>Всего {total_count} товаров</em>
    ) : (
        <em>Please add some products to cart.</em>
    )

    return (
        <div className={style.smallCart}>
            <h3>Корзина</h3>
            <div>{nodes}</div>
            <Link to="/cart">В корзину</Link>
            <p>На сумму: &#36;{total}</p>
        </div>
    )
}

Cart.propTypes = {
    total_count: PropTypes.number,
    total: PropTypes.number
}

export default Cart
