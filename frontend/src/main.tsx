import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { MainLayout } from './layouts/MainLayout';
import { Header } from './components/Header';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import './index.css';
import { AUTH_PATH, CLIENT_PATH, MAIN_PATH, REGISTER_PATH } from './shared/paths';
import ClientPage from './pages/ClientPage';
import { AuthLayout } from './layouts/AuthLayout';
import { AuthPage } from './pages/AuthPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './components/auth/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { duration: 5000 } }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path={AUTH_PATH} element={<AuthLayout headerContent={<Header />} />}>
                <Route index element={<AuthPage />} />
                <Route path={REGISTER_PATH} element={null} />
              </Route>
              <Route 
                path={MAIN_PATH}
                element={
                  <ProtectedRoute>
                    <MainLayout headerContent={<Header />} />
                  </ProtectedRoute>
                }
              >
                <Route index element={<MainPage />} />
                <Route
                  path={CLIENT_PATH}
                  element={<MainLayout headerContent={<Header />} />}
                >
                  <Route index element={<ClientPage />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
