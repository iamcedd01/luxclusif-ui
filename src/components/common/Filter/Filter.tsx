import cx from 'clsx';
import { FC, useState } from 'react';
// COMPONENTS
import MuiBox from '@mui/material/Box';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import MuiPaper from '@mui/material/Paper';
import { Button } from 'components/controls';
import MuiPopover, { PopoverProps as MuiPopoverProps } from '@mui/material/Popover';

import s from './Filter.scss';

interface Props extends MuiPopoverProps {
    className?: string;
}

const Filter: FC<Props> = ({ className, ...props }) => {
    const classes = cx(s.root, className);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button text="BTN_FILTER" aria-describedby={id} onClick={handleClick} />
            <MuiPopover
                {...props}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                className={classes}
            >
                <MuiPaper>
                    <MuiBox padding={1} paddingX={2}>
                        <MuiTabs aria-label="basic tabs example"></MuiTabs>
                    </MuiBox>
                </MuiPaper>
            </MuiPopover>
        </div>
    );
};

export default Filter;
