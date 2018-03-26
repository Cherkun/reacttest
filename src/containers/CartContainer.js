import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTotalCount } from '../reducers'
import Cart from '../components/Cart'

const CartContainer = ({ total_count, total }) => (
  <Cart
      total={total}
      total_count={total_count} />
)

CartContainer.propTypes = {
    total_count: PropTypes.number,
    total: PropTypes.number
}



const mapStateToProps = (state) => ({
  total_count: getTotalCount(state),
  total: state.cart.total
})

export default connect(
  mapStateToProps
)(CartContainer)
