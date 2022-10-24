import { Navigate } from 'react-router-dom';
import {AuthConsumer as useAuth} from './index';

export const ProtectedRoute = ({children}) => {

    const {authed} = useAuth();
    
    return authed ? children : <Navigate to={'/login'} />
}