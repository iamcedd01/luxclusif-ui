import cx from 'clsx';
import { FC } from 'react';
// COMPONENTS
import { Brand } from 'components/common';
import MuiToolbar from '@mui/material/Toolbar';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import s from './MainNavbar.scss';

interface Props extends MuiAppBarProps {
    className?: string;
}

const MainNavbar: FC<Props> = ({ className }) => {
    const classes = cx(s.root, className);

    return (
        <MuiAppBar position="absolute" className={classes}>
            <MuiToolbar>
                <Brand />
            </MuiToolbar>
        </MuiAppBar>
    );
};

export default MainNavbar;
