import React, {Component} from 'react';
import PropTypes from 'prop-types'

import styles from './FriendList.scss'
import FriendListItem from './FriendListItem';
import classNames from 'classnames'
import ReactPaginate from 'react-paginate';
import {addToCart} from "../../actions/FriendActions";
import { connect } from 'react-redux'

class FriendList extends Component {
    handlePageClick(data){
        let selected = parseInt(data.selected)+1;
        if(selected!==this.props.page)
        this.props.pageClick('/contacts/'+this.props.filter+'/' + selected)
    }

    render() {
        console.log(this.props.friends)
        return (
            <div>
                <ul className={classNames(styles.friendList, {
                    'loader': this.props.isFetching,
                    'animate-bottom': !this.props.isFetching
                })}>
                    {
                        Object.keys(this.props.friends).map((i) => {
                            return (
                                <FriendListItem
                                    key={this.props.friends[i].id}
                                    id={this.props.friends[i].id}
                                    name={this.props.friends[i].name}
                                    starred={this.props.friends[i].starred}
                                    inCart={this.props.friends[i].inCart}
                                    price={this.props.friends[i].price}
                                    onAddToCartClicked={this.props.addToCart}
                                    {...this.props.actions} />
                            )
                        })
                    }
                </ul>
                <ReactPaginate pageCount={this.props.pageCount}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               onPageChange={this.handlePageClick}
                               initialPage={this.props.page-1}
                               hrefBuilder={(page) => '/contacts/'+this.props.filter+'/' + page }
                               containerClassName={'pagination'}
                               pageClassName={'page-item'}
                               pageLinkClassName={'page-link'}
                               previousClassName={'page-item'}
                               nextClassName={'page-item'}
                               previousLinkClassName={'page-link'}
                               nextLinkClassName={'page-link'}
                               activeClassName={'active'}
                />

            </div>
        );
    }

    constructor (props, context) {
        super(props, context);
        this.handlePageClick = this.handlePageClick.bind(this)
    }

}

FriendList.propTypes = {
    friends: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
    isFetching: PropTypes.string.isRequired,
    pageClick: PropTypes.func.isRequired,
    perPage: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    addToCart: PropTypes.func.isRequired,
    checkInCart: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
})

export default connect(
    mapStateToProps,
    { addToCart }
)(FriendList)