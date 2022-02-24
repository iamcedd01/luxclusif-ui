import cx from 'clsx';
import { FC, useCallback, useState } from 'react';
// COMPONENTS
import MuiBox from '@mui/material/Box';
import MuiPaper from '@mui/material/Paper';
import MuiDivider from '@mui/material/Divider';
import { Button, Input, Text } from 'components/controls';
// UTILS
import { useNavigate } from 'react-router';

import s from './Login.scss';

interface Props {
    className?: string;
}

const Login: FC<Props> = ({ className }) => {
    const navigate = useNavigate();
    const classes = cx(s.root, className);

    // STATES
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [errors, setErrors] = useState(
        {} || {
            email: '',
            password: '',
        }
    );

    // FUNCTIONS
    const handleValidate = useCallback(() => {
        let isValid = true;
        let errors = {};

        if (!email) {
            isValid = false;
            errors = { ...errors, email: 'ERROR_EMAIL_EMPTY' };
        }

        if (!password) {
            isValid = false;
            errors = { ...errors, password: 'ERROR_PASSWORD_EMPTY' };
        } else if (password !== '1234567') {
            isValid = false;
            errors = { ...errors, password: 'ERROR_PASSWORD_NOT_MATCH' };
        }

        setErrors(errors);
        return isValid;
    }, [email, password]);

    const handleLogin = useCallback(() => {
        const isValid = handleValidate();
        if (!isValid) return;

        localStorage.setItem('logged_in', JSON.stringify(true));
        navigate('/');
    }, [handleValidate]);

    return (
        <MuiBox className={classes}>
            <MuiPaper className={s.wrapper}>
                <MuiBox padding={2}>
                    <Text className={s.title} text="LBL_WELCOME" />
                    <MuiDivider className={s.divider} />
                    <Input
                        name="email"
                        value={email}
                        error={!!errors.email}
                        errorMessage={errors.email}
                        label="LBL_USERNAME_OR_EMAIL"
                        onChange={e => setEmail(e.target.value)}
                        placeholder="PLACEHOLDER_ENTER_USERNAME_OR_EMAIL"
                    />
                    <Input
                        name="password"
                        value={password}
                        type="password"
                        label="LBL_PASSWORD"
                        error={!!errors.password}
                        errorMessage={errors.password}
                        placeholder="PLACEHOLDER_ENTER_PASSWORD"
                        onChange={e => setPassword(e.target.value)}
                    />

                    <MuiBox className={s.action}>
                        <Button name="login" text="BTN_LOGIN" onClick={handleLogin} />
                    </MuiBox>
                </MuiBox>
            </MuiPaper>
        </MuiBox>
    );
};

export default Login;
