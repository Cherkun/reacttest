import React from 'react'
import { NavLink } from 'react-router-dom'

const FilterLink = ({ filter, children }) => (
    <NavLink
        to={filter === 'all' ? '/' : `/contacts/${ filter }`}
        className='nav-item nav-link'
        activeClassName='active'
    >
        {children}
    </NavLink>
)

export default FilterLink