import { FC } from 'react';
// COMPONENTS
import MuiFormLabel, { FormLabelProps as MuiFormLabelProps } from '@mui/material/FormLabel';
// UTILS
import cx from 'clsx';
import { useValueAndKey } from 'utils/hooks';
import { useTranslation } from 'react-i18next';

interface Props extends MuiFormLabelProps {
    text?: string;
    name?: string;
    className?: string;
}

const Label: FC<Props> = ({ name, text, className, children, ...rest }) => {
    const { t } = useTranslation();
    const controlName = useValueAndKey(name, 'cs-label');
    const classes = cx(controlName, className);

    return (
        <MuiFormLabel data-cy={controlName} className={classes} {...rest}>
            {text ? t(text) : children}
        </MuiFormLabel>
    );
};

export default Label;
