import Landpage from '../pages/Landpage/index';
import Login from '../pages/Login/index';
import SignUp from '../pages/SignUp/index';
import ResetPassword from '../pages/ResetPassword/index';
import ForgotPassword from '../pages/ForgotPassword/index';
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