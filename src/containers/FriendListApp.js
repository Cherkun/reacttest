import React, {Component} from 'react'
import styles from './FriendListApp.scss'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as FriendsActions from '../actions/FriendActions'

import PropTypes from 'prop-types'
import {AddFriendInput,FriendList} from "../components/Friends";
import SearchFriendInput from "../components/Friends/SearchFriendInput";
import filter from 'lodash/filter'


class FriendListApp extends Component{

    render(){
        const {friendlist: {friendsById}, dispatch}=this.props
        const actions=bindActionCreators(FriendsActions, dispatch)
        const displayedFriends = filter(friendsById, (friend)=>(friend.name.toLowerCase().indexOf(this.state.filtername.toLowerCase())!==-1));
        console.log(displayedFriends)
        console.log(this.state.filtername)
        return (
            <div className={styles.friendListApp}>
                <h1>The FriendList</h1>
                <SearchFriendInput searchFriend={this.handleFilter}/>
                <AddFriendInput addFriend={actions.addFriend}/>
                <FriendList friends={displayedFriends} actions={actions}/>
            </div>
        )
    }

    constructor (props, context) {
        super(props, context);
        this.state = {
            filtername: '',
        };
        this.handleFilter = this.handleFilter.bind(this)
    }

    handleFilter(filtername){
        this.setState({
            filtername
        });
    }
}

FriendListApp.propTypes = {
    friendsById: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps (state) {
    return {
        friendlist: state.friendlist.items
    }
}


export default connect(mapStateToProps)(FriendListApp)