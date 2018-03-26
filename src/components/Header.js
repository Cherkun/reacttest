import React from 'react'
import FilterLink from '../containers/FilterLink'
import * as VisibilityFilters from '../constants/VisibilityFilters'

const Header = () => (
    <header className="navbar navbar-expand-lg navbar-light fixed-top flex-column flex-md-row">
        <a className="navbar-brand" href="#">The FriendList</a>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <FilterLink filter={VisibilityFilters.ALL}>
                    all
                </FilterLink>
                <FilterLink filter={VisibilityFilters.FRIENDS}>
                    friends
                </FilterLink>
                <FilterLink filter={VisibilityFilters.WORK}>
                    work
                </FilterLink>
                <FilterLink filter={VisibilityFilters.STUDY}>
                    study
                </FilterLink>
                <FilterLink filter={VisibilityFilters.STARRED}>
                    stared
                </FilterLink>
            </div>
        </div>
    </header>
)

export default Header