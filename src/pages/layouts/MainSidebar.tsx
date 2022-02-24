import cx from 'clsx';
import { FC } from 'react';
// COMPONENTS
import MuiDrawer from '@mui/material/Drawer';
import MuiToolbar from '@mui/material/Toolbar';
import MuiDivider from '@mui/material/Divider';

import s from './MainSidebar.scss';

interface Props {
    className?: string;
}

const MainSidebar: FC<Props> = ({ className }) => {
    const classes = cx(s.root, className);

    return (
        <MuiDrawer open className={classes} classes={{ paper: s.paper }}>
            <MuiToolbar>
                <MuiDivider />
                test
            </MuiToolbar>
        </MuiDrawer>
    );
};

export default MainSidebar;
