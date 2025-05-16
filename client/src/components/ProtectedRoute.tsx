import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore"
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    exp: number
}

const ProtectedRoute: React.FC = () => {
    const token = useAuthStore(state => state.token)
    console.log('token', token)

    if (!token) return <Navigate to="/login" />

    try {
        const { exp } = jwtDecode<JwtPayload>(token)
        if(Date.now() >= exp * 1000) {
            useAuthStore.getState().setToken(null)
            return <Navigate to="/login" />
        }
    } catch {
        return <Navigate to="/login" />
    }

    return <Outlet />
}

export default ProtectedRoute