import cx from 'clsx';
import { FC, ImgHTMLAttributes } from 'react';

import s from './Image.scss';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
}

const Image: FC<Props> = ({ src, alt, className, ...props }) => {
    const classes = cx(s.root, className);

    return (
        <div className={classes}>
            <img src={src} alt={alt} {...props} />
        </div>
    );
};

export default Image;
