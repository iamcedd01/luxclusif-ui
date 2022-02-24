import cx from 'clsx';
import { FC, forwardRef, ReactNode } from 'react';
// COMPONENTS
import MuiSlide from '@mui/material/Slide';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogContentText from '@mui/material/DialogContentText';
import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import { TransitionProps as MuiTransitionProps } from '@mui/material/transitions';
import { useTranslation } from 'react-i18next';

interface Props extends MuiDialogProps {
    title?: string;
    message?: string;
    className?: string;
    actions?: ReactNode;
    handleClose: () => void;
}

const Transition = forwardRef(function Transition(
    props: MuiTransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <MuiSlide direction="up" ref={ref} {...props} />;
});

const Modal: FC<Props> = ({ open, title, actions, message, className, handleClose, ...props }) => {
    const { t } = useTranslation();
    const classes = cx(className);

    return (
        <MuiDialog
            open={open}
            keepMounted
            className={classes}
            onClose={handleClose}
            TransitionComponent={Transition}
            aria-describedby="alert-dialog-slide-description"
            {...props}
        >
            {title && <MuiDialogTitle>{t(title)}</MuiDialogTitle>}
            {message && (
                <MuiDialogContent>
                    <MuiDialogContentText id="alert-dialog-slide-description">{t(message)}</MuiDialogContentText>
                </MuiDialogContent>
            )}
            {actions && <MuiDialogActions>{actions}</MuiDialogActions>}
        </MuiDialog>
    );
};

export default Modal;
