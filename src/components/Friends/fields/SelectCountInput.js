import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './Inputs.scss'
import PropTypes from 'prop-types'

class SelectCountInput extends Component {
  render () {
    return (
        <div>
            <button value={"-1"} onClick={this.buttonClick}>-</button>
      <input
        type="text"
        className={classnames(styles.countInput)}
        value={this.state.count}
        onChange={this.handleChange.bind(this)} />
            <button value={"1"} onClick={this.buttonClick}>+</button>
        </div>
    );
  }

  constructor (props, context) {
    super(props, context);
      this.handleChange = this.handleChange.bind(this);
      this.buttonClick = this.buttonClick.bind(this);
    this.state = {
      count: this.props.count||1,
    };
  }

  buttonClick(e){
      const val=parseInt(e.target.value);
      const count = this.state.count+val;
      if(count>0) {
          this.setState({count: count});
          this.props.changeCount(count);
      }
  }

  handleChange (e) {
    const count = e.target.value.trim();
    this.setState({ count: count });
    this.props.changeCount(count);
  }

}
SelectCountInput.propTypes = {
    changeCount: PropTypes.func.isRequired,
    count: PropTypes.number
}
export default SelectCountInput
