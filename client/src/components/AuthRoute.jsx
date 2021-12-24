import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import AccountContext from '../contexts/AccountContext'

const AuthRoute = () => {
    const { userData} = useContext(AccountContext)

    return userData == null || userData == undefined ? (
        <Navigate to='/login' />
    ) : (
        <Outlet />
    )
}

export default AuthRoute
