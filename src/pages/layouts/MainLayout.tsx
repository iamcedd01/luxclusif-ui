import { FC, useEffect } from 'react';
// COMPONENTS
import MuiBox from '@mui/material/Box';
// UTILS
import { Outlet, useNavigate } from 'react-router';

import s from './MainLayout.scss';
import MainNavbar from './MainNavbar';

const MainLayout: FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('logged_in');
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <MuiBox className={s.root}>
            <MainNavbar />
            <main className={s.content}>
                <div className={s.spacer} />
                <Outlet />
            </main>
        </MuiBox>
    );
};

export default MainLayout;
