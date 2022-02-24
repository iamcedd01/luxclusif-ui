import { FC } from 'react';
// COMPONENTS
import { Label } from 'components/controls';
import MuiFormHelperText from '@mui/material/FormHelperText';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
// UTILS
import cx from 'clsx';
import { useValueAndKey } from 'utils/hooks';
import { useTranslation } from 'react-i18next';

import s from './Input.scss';

type Props = MuiTextFieldProps & {
    name?: string;
    label?: string;
    className?: string;
    errorMessage?: string;
};

const Input: FC<Props> = ({ name, label, className, errorMessage, placeholder, ...rest }) => {
    const { t } = useTranslation();
    const controlName = useValueAndKey(name, 'cs-input');
    const controlClasses = cx(s.root, controlName, className);

    return (
        <div data-cy={controlName} className={controlClasses}>
            {label && <Label text={label} />}
            <MuiTextField fullWidth name={name} data-cy="input" placeholder={t(placeholder || '')} {...rest} />
            {errorMessage && (
                <MuiFormHelperText error data-cy="error">
                    {t(errorMessage)}
                </MuiFormHelperText>
            )}
        </div>
    );
};

export default Input;

Input.defaultProps = {
    size: 'small',
    variant: 'outlined',
};
