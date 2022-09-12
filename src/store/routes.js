import Landpage from '../pages/Landpage/index';
import Login from '../pages/Authentication/Login/index';
import SignUp from '../pages/Authentication/SignUp/index';
import ResetPassword from '../pages/Authentication/ResetPassword/index';
import ForgotPassword from '../pages/Authentication/ForgotPassword/index';
import Documentation from '../pages/Documentation/index';

const routes = {
    '/': () => <Landpage />,
    '/login': () => <Login />,
    '/sign-up': () => <SignUp />,
    '/reset-password': () => <ResetPassword />,
    '/forgot-password': () => <ForgotPassword />,
    '/documentacao': () => <Documentation />,
}

export { routes };