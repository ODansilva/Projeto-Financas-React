import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ islogin, children }) => {
    if(islogin) {
        return children;
    }
    return <Navigate to="/" replace/>;
}
export default  ProtectedRoute;