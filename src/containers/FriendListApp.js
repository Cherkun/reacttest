import React, {Component} from 'react'
import styles from './FriendListApp.scss'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as FriendsActions from '../actions/FriendActions'
import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types'
import {FriendList} from "../components/Friends/index";
import {AddFriendInput,SearchFriendInput} from "../components/Friends/index";
import filter from 'lodash/filter'
import {fetchFriends} from '../actions/FriendActions';


class FriendListApp extends Component{

    componentDidMount() {
        const { dispatch, filter, page, cart } = this.props
        let offset = Math.ceil((page-1) * this.state.perPage);
        dispatch(fetchFriends(filter,this.state.perPage,offset,cart))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.filter !== this.props.filter||nextProps.page !== this.props.page) {
            const { dispatch, filter, page,cart } = nextProps
            let offset = Math.ceil((page-1) * this.state.perPage);
            dispatch(fetchFriends(filter,this.state.perPage,offset,cart))
        }
    }

    render(){
        const {friendlist: {friendsById}, isFetching, addToCart, meta: {pageCount}, dispatch}=this.props
        const actions=bindActionCreators(FriendsActions, dispatch)
        const displayedFriends = filter(friendsById, (friend)=>(friend.name.toLowerCase().indexOf(this.state.filtername.toLowerCase())!==-1));
        console.log(this.props.filter)
        return (
            <div className={styles.friendListApp}>
                <SearchFriendInput searchFriend={this.handleFilter}/>
                <AddFriendInput addFriend={actions.addFriend} filter={this.props.filter}/>
                <FriendList friends={displayedFriends} actions={actions} pageCount={pageCount} perPage={this.state.perPage} page={this.props.page} filter={this.props.filter} isFetching={isFetching} pageClick={this.handlePageClick}/>
            </div>
        )
    }

    constructor (props, context) {
        super(props, context);
        this.state = {
            filtername: '',
            perPage: 2,
            offset: 0
        };
        this.handleFilter = this.handleFilter.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
    }

    handleFilter(filtername){
        this.setState({
            filtername
        });
    }

    handlePageClick(path){
        this.props.history.push(path);
    }
}

FriendListApp.propTypes = {
    friendsById: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}


function mapStateToProps (state, ownParams) {
    return {
        friendlist: state.friends.friendlist.items,
        meta: state.friends.friendlist.meta,
        filter: ownParams.match.params.filter || 'all',
        isFetching: state.friends.friendlist.isFetching,
        page: ownParams.match.params.page || 1,
        cart: state.cart
    }
}



export default withRouter(connect(mapStateToProps)(FriendListApp))