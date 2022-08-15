import Landpage from '../pages/Landpage/index';
import Authentication from '../pages/Authentication/index';

const routes = {
    '/': () => <Landpage />,
    '/autenticacao': () => <Authentication />,
}

export { routes };