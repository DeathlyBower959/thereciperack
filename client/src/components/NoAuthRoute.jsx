import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import AccountContext from '../contexts/AccountContext'

const NoAuthRoute = () => {
    const { userData } = useContext(AccountContext)

    return userData == null || userData == undefined ? (
        <Outlet />
    ) : (
        <Navigate to='/' />

    )
}

export default NoAuthRoute
