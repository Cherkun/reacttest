import React, { Component } from 'react'
import styles from './FriendListItem.scss'
import PropTypes from 'prop-types'
import FaStar from 'react-icons/lib/fa/star'
import FaStarO from 'react-icons/lib/fa/star-o'
import FaTrash from 'react-icons/lib/fa/trash'
import CartPlus from 'react-icons/lib/fa/cart-plus'
import ShoppingCart from 'react-icons/lib/fa/shopping-cart'
import {SelectCountInput} from '.'


class FriendListItem extends Component {

    handleChangeCount(count){
        this.setState({
            count
        })
    }

  render () {
    const {id,name,starred,price,onAddToCartClicked} = this.props;
    return (
      <li className={styles.friendListItem}>
        <div className={styles.friendInfos}>
          <div><span>{name}</span></div>
          <div><small>xx friends in common</small></div>
            <SelectCountInput changeCount={this.handleChangeCount}/>
        </div>
        <div className={styles.friendActions}>
          <button className={`btn btn-default ${styles.btnAction}`} onClick={() => this.props.starFriend(id)}>
              {starred?<FaStar />:<FaStarO />}
          </button>
          <button className={`btn btn-default ${styles.btnAction}`} onClick={() => this.props.deleteFriend(id)}>
              <FaTrash />
          </button>
            <button className={`btn btn-default ${styles.btnAction}`}
                onClick={() => onAddToCartClicked(id,name,this.state.count,price)}>
                {!this.props.inCart?<CartPlus />:<ShoppingCart />}
            </button>
        </div>
      </li>
    );
  }

    constructor (props, context) {
        super(props, context);
        this.handleChangeCount=this.handleChangeCount.bind(this)
        this.state={
            count: 1
        }
    }

}

FriendListItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    starred: PropTypes.bool,
    inCart: PropTypes.bool,
    starFriend: PropTypes.func.isRequired,
    deleteFriend: PropTypes.func.isRequired,
    onAddToCartClicked: PropTypes.func.isRequired
}

export default FriendListItem