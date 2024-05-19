import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MantineProvider theme={theme}>
    <Router>
    <AuthProvider> {/* Wrap App with AuthProvider */}
        <App />
    </AuthProvider>
    </Router>
  </MantineProvider>
);
