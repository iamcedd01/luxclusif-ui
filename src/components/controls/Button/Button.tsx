import { FC } from 'react';
// COMPONENTS
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
// UTILS
import cx from 'clsx';
import { useValueAndKey } from 'utils/hooks';
import { useTranslation } from 'react-i18next';

type Props = MuiButtonProps & {
    text?: string;
    name?: string;
    className?: string;
};

const Button: FC<Props> = ({ name, text, className, children, ...rest }) => {
    const { t } = useTranslation();
    const controlName = useValueAndKey(name, 'cs-button');
    const controlClasses = cx(controlName, className);

    return (
        <MuiButton data-cy={controlName} className={controlClasses} {...rest}>
            {text ? t(text) : children}
        </MuiButton>
    );
};

export default Button;

Button.defaultProps = {
    size: 'medium',
    color: 'primary',
    variant: 'contained',
    text: 'BTN_PLACEHOLDER',
};
