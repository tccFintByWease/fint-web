import { authRoutes } from './auth.routes';
import { appRoutes } from './app.routes';
import { useAuth } from './../../contexts/auth';
import { useRoutes } from 'hookrouter';

function Routes() {
    const { signed } = useAuth();
    const routes = signed ? appRoutes : authRoutes;

    return useRoutes(routes);
}

export default Routes;