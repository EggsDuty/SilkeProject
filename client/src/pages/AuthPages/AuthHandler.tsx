import { Navigate } from 'react-router-dom';


function AuthHandler() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const mode = params.get('mode');

    console.log(queryString);
    console.log(mode);

    switch (mode) {
        case "resetPassword":
            return <Navigate to={`/reset-password${queryString}`} replace={true} />
        case "verifyEmail":
            return <Navigate to={`/verify-email${queryString}`} replace={true} />
        default:
            return <Navigate to="/home" replace={true} />
    }
}

export default AuthHandler;