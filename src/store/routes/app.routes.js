// O usuário já está autenticado
import Home from './../../pages/Dashboard/Home/index';
import Documentation from './../../pages/Documentation/index';
import Expenses from './../../pages/Dashboard/Expenses/index';

const appRoutes = {
    '/': () => <Home />,
    '/documentation': () => <Documentation />,
    '/expenses': () => <Expenses />
}

export { appRoutes };