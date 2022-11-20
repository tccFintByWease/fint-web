/* libraries */
import React from 'react';
/* routes */
import Routes from './store/routes/index';
/* contexts */
import { AuthProvider } from './contexts/auth';
import { getTheme } from './services/theme-services';

function App() {
    getTheme();

    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}

export default App;