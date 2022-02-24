import cx from 'clsx';
import { FC } from 'react';
// COMPONENTS
import MuiGrid from '@mui/material/Grid';
import { Button } from 'components/controls';

import s from './ProductFooter.scss';

interface Props {
    className?: string;
    backLabel?: string;
    showBack?: boolean;
    showSubmit?: boolean;
    submitLabel?: string;
    handleBack?: () => void;
    handleSubmit?: () => void;
}

const ProductFooter: FC<Props> = ({
    className,
    handleBack,
    submitLabel,
    handleSubmit,
    showBack = true,
    showSubmit = true,
    backLabel = 'BTN_BACK',
}) => {
    const classes = cx(s.root, className);

    return (
        <MuiGrid container className={classes}>
            <MuiGrid item lg={12} display="flex" justifyContent="flex-end">
                {!!handleBack && showBack && (
                    <Button variant="outlined" className={s.action} text={backLabel} onClick={handleBack} />
                )}
                {!!handleSubmit && showSubmit && (
                    <Button className={s.action} text={submitLabel} onClick={handleSubmit} />
                )}
            </MuiGrid>
        </MuiGrid>
    );
};

export default ProductFooter;
