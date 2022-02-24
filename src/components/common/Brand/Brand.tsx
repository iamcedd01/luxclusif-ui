import cx from 'clsx';
import { FC } from 'react';
// COMPONENTS
import Link from '@mui/material/Link';
import { Image } from 'components/controls';

import s from './Brand.scss';

interface Props {
    className?: string;
}

const Brand: FC<Props> = ({ className }) => {
    const classes = cx(s.root, className);

    return (
        <Link href="/" className={classes}>
            <Image src="/images/logo.png" alt="Luxclusif" className={s.image} />
        </Link>
    );
};

export default Brand;
