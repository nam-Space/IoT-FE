import React, { useContext, useEffect } from 'react'
import { UserContext } from './UserContext'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (_.isEmpty(user)) {
            navigate('/login');
        }
    }, [user])


    return (
        <>{children}</>
    )
}

export default ProtectedRoute