/* libraries */
import React from 'react';
/* routes */
import Routes from './store/routes/index';
/* contexts */
import { AuthProvider } from './contexts/auth';

function App() {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}

export default App;