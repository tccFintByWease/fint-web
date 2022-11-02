// O usuário não está autenticado
import Landpage from './../../pages/Landpage/index';
import Login from './../../pages/Authentication/Login/index';
import SignUp from './../../pages/Authentication/SignUp/index';
import ForgotPassword from './../../pages/Authentication/ForgotPassword/index';
import Documentation from './../../pages/Documentation/index';

const authRoutes = {
    '/': () => <Landpage />,
    '/login': () => <Login />,
    '/sign-up': () => <SignUp />,
    '/forgot-password': () => <ForgotPassword />,
    '/documentation': () => <Documentation />
}

export { authRoutes };