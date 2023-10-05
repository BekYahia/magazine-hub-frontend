import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function PublicRoute({ children } : { children: React.ReactNode }) {
    
    const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthy);
    const location = useLocation()

    //if already logged in, skip login page
    if(isLoggedIn) return <Navigate to={location.state?.from || '/'} />

    return children;
}