import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './AddFriendInput.scss'
import PropTypes from 'prop-types'

class AddFriendInput extends Component {
  render () {
    return (
      <input
        type="text"
        autoFocus="true"
        className={classnames('form-control', styles.addFriendInput)}
        placeholder="Type the name of a friend"
        value={this.state.name}
        onChange={this.handleChange.bind(this)}
        onKeyDown={this.handleSubmit.bind(this)} />
    );
  }

  constructor (props, context) {
    super(props, context);
    this.state = {
      name: this.props.name || '',
    };
  }

  handleChange (e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit (e) {
    const name = e.target.value.trim();
    if (e.which === 13 && name!=='') {
      this.props.addFriend(name);
      this.setState({ name: '' });
    }
  }

}
AddFriendInput.propTypes = {
    addFriend: PropTypes.func.isRequired
}
export default AddFriendInput
