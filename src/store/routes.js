import Landpage from '../pages/Landpage/index';
import Authentication from '../pages/Authentication/index';
import Documentation from '../pages/Documentation/index';

const routes = {
    '/': () => <Landpage />,
    '/autenticacao': () => <Authentication />,
    '/documentacao': () => <Documentation />,
}

export { routes };