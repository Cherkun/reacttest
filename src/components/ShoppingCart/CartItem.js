import React, { Component } from 'react'
import styles from './CartItem.scss'
import PropTypes from 'prop-types'
import {SelectCountInput} from '../Friends/'
import {addToCart} from "../../actions/FriendActions";
import { connect } from 'react-redux'


class CartItem extends Component {

    handleChangeCount(count){
        const { dispatch, id, name, price } = this.props;
        dispatch(addToCart(id, name, count-this.state.count, price));
        this.setState({
            count
        });
    }

  render () {
    const {name} = this.props;
    return (
      <li className={styles.cartItem}>
        <div className={styles.cartInfos}>
          <div><span>{name}</span></div>
          <div><small>xx friends in common</small></div>
            <SelectCountInput changeCount={this.handleChangeCount} count={this.state.count}/>
        </div>
      </li>
    );
  }

    constructor (props, context) {
        super(props, context);
        this.handleChangeCount=this.handleChangeCount.bind(this)
        this.state={
            count: this.props.count
        }

    }

}

CartItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(CartItem)