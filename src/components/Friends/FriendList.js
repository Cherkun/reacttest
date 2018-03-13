import React, { Component } from 'react';
import PropTypes from 'prop-types'

import styles from './FriendList.scss'
import FriendListItem from './FriendListItem';

class FriendList extends Component {
  render () {
      console.log(this.props.friends)
      return (
      <ul className={styles.friendList}>
        {
          Object.keys(this.props.friends).map((i) => {
              return (
              <FriendListItem
              key={this.props.friends[i].id}
              id={this.props.friends[i].id}
              name={this.props.friends[i].name}
              starred={this.props.friends[i].starred}
              {...this.props.actions} />
              )
        })
        }
      </ul>
    );
  }

}

FriendList.propTypes = {
    friends: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
}

export default FriendList