import React, { useEffect } from 'react'
import { useLocation } from 'wouter'

interface ProtectedRoutesProps {
    isAuthenticated: boolean
    redirectTo?: string
    children: React.ReactNode
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ isAuthenticated, redirectTo = '/login', children }) => {
    const [, navigate] = useLocation()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(redirectTo)
        }
    }, [isAuthenticated, navigate, redirectTo])

    if (!isAuthenticated) {
        return null
    }

    return <>{children}</>
}

export default ProtectedRoutes
