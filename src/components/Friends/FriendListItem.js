import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './FriendListItem.scss'
import PropTypes from 'prop-types'
import FaStar from 'react-icons/lib/fa/star'
import FaStarO from 'react-icons/lib/fa/star-o'
import FaTrash from 'react-icons/lib/fa/trash'


class FriendListItem extends Component {

  render () {
    return (
      <li className={styles.friendListItem}>
        <div className={styles.friendInfos}>
          <div><span>{this.props.name}</span></div>
          <div><small>xx friends in common</small></div>
        </div>
        <div className={styles.friendActions}>
          <button className={`btn btn-default ${styles.btnAction}`} onClick={() => this.props.starFriend(this.props.id)}>
              {this.props.starred?<FaStar />:<FaStarO />}
          </button>
          <button className={`btn btn-default ${styles.btnAction}`} onClick={() => this.props.deleteFriend(this.props.id)}>
              <FaTrash />
          </button>
        </div>
      </li>
    );
  }

}

FriendListItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    starred: PropTypes.bool,
    starFriend: PropTypes.func.isRequired,
    deleteFriend: PropTypes.func.isRequired
}

export default FriendListItem