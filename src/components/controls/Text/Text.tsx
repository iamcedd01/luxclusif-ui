import { FC } from 'react';
// COMPONENTS
import MuiTypography, { TypographyProps } from '@mui/material/Typography';
// UTILS
import cx from 'clsx';
import { useValueAndKey } from 'utils/hooks';
import { useTranslation } from 'react-i18next';

interface Props extends TypographyProps {
    text?: string;
    name?: string;
    className?: string;
}

const Text: FC<Props> = ({ name, text, className, children, ...rest }) => {
    const { t } = useTranslation();
    const controlName = useValueAndKey(name, 'cs-text');
    const classes = cx(controlName, className);

    return (
        <MuiTypography data-cy={controlName} className={classes} {...rest}>
            {text ? t(text) : children}
        </MuiTypography>
    );
};

export default Text;
