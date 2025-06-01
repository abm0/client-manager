import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { MainLayout } from './layouts/MainLayout';
import { Header } from './components/Header';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import './index.css';
import './i18n/config';
import { CLIENT_PATH, MAIN_PATH } from './shared/constants';
import ClientPage from './pages/ClientPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route 
            path={MAIN_PATH}
            element={
              <MainLayout headerContent={<Header />} />
            }
          >
            <Route index element={<MainPage />} />
          </Route>
          <Route
            path={CLIENT_PATH}
            element={
              <MainLayout headerContent={<Header />} />
            }
          >
            <Route index element={<ClientPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
