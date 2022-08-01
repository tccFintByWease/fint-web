import Landpage from '../pages/Landpage/index';
import Login from '../pages/Login/index';
import Cadastro from '../pages/Login/Cadastro/index';
import NovaSenha from '../pages/Login/NovaSenha/index';
import RecuperarSenha from '../pages/Login/RecuperarSenha/index';

const routes = {
    '/': () => <Landpage />,
    '/login': () => <Login />,
    '/cadastro': () => <Cadastro />,
    '/nova-senha': () => <NovaSenha />,
    '/recuperar-senha': () => <RecuperarSenha />,
}

export { routes };