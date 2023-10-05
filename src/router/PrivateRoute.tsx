import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function PrivateRoute({ children } : { children: React.ReactNode }) {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthy);

    if (!isLoggedIn) return <Navigate to="/login" />
    
    return children;
}