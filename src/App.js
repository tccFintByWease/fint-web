import { useRoutes } from 'hookrouter';
import { routes } from './store/routes';

function App() {
    return useRoutes(routes);
}

export default App;