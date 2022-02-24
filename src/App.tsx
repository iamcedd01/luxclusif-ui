import { FC } from 'react';
// STYLES
import 'styles/index.scss';
// UTILS
import 'utils/i18n';
import { RouteObject } from 'react-router';
import { useRoutes } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
// LAYOUTS
import MainLayout from 'pages/layouts/MainLayout';
//PAGES
import Login from 'pages/general/Login/Login';
import EditProduct from 'pages/protected/Products/EditProduct';
import CreateProduct from 'pages/protected/Products/CreateProduct';
import SearchProducts from 'pages/protected/Products/SearchProducts';
// CONFIG
import theme from 'config/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

const routes: Array<RouteObject> = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '',
        element: <MainLayout />,
        children: [
            { path: '', element: <SearchProducts /> },
            { path: 'create', element: <CreateProduct /> },
            { path: ':id', element: <EditProduct />, children: [{ path: 'edit', element: <EditProduct /> }] },
        ],
    },
];

const App: FC = () => {
    const routing = useRoutes(routes);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {routing}
            <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
    );
};

export default App;
