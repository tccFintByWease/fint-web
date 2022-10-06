import Landpage from '../pages/Landpage/index';
import Login from '../pages/Authentication/Login/index';
import SignUp from '../pages/Authentication/SignUp/index';
import ForgotPassword from '../pages/Authentication/ForgotPassword/index';
import Documentation from '../pages/Documentation/index';
import Dashboard from '../pages/Dashboard/index';

const routes = {
    '/': () => <Landpage />,
    '/login': () => <Login />,
    '/sign-up': () => <SignUp />,
    '/forgot-password': () => <ForgotPassword />,
    '/documentacao': () => <Documentation />,
    '/dashboard': () => <Dashboard />,
}

export { routes };