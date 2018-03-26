import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './Inputs.scss'
import PropTypes from 'prop-types'

class SearchFriendInput extends Component {
  render () {
    return (
      <input
        type="text"
        autoFocus="true"
        className={classnames('form-control', styles.addFriendInput)}
        placeholder="Filter"
        value={this.state.name}
        onChange={this.handleChange} />
    );
  }

  constructor (props, context) {
    super(props, context);
    this.state = {
      name: '',
    };
    this.handleChange=this.handleChange.bind(this)
  }

  handleChange(e){
    this.setState({ name: e.target.value });
    this.props.searchFriend(e.target.value);
  }

}
SearchFriendInput.propTypes = {
    searchFriend: PropTypes.func.isRequired
}
export default SearchFriendInput
