// O usuário já está autenticado
import Home from './../../pages/Dashboard/Home/index';
import Documentation from './../../pages/Documentation/index';
import Expenses from './../../pages/Dashboard/Expenses/index';
import TransitionList from './../../pages/Dashboard/Expenses/TransitionList/index';
import TransitionItem from './../../pages/Dashboard/Expenses/TransitionItem/index';

const appRoutes = {
    '/': () => <Home />,
    '/documentation': () => <Documentation />,
    '/expenses': () => <Expenses />,
    '/expenses/list': () => <TransitionList />,
    '/expenses/:transitionType-:id': ({transitionType, id}) => <TransitionItem transitionType={transitionType} transitionId={id} />
}

export { appRoutes };