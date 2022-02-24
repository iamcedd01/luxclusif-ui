import cx from 'clsx';
import { FC, useCallback, useMemo } from 'react';
// ICONS
import CloseIcon from '@mui/icons-material/Close';
// UTILS
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

import s from './ImageUploader.scss';

interface Props {
    files: any;
    setFiles: any;
    className?: string;
}

const ImageUploader: FC<Props> = ({ files, setFiles, className }) => {
    const { t } = useTranslation();
    const classes = cx(s.root, className);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles([
                ...files,
                ...acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                ),
            ]);
        },
    });

    const handleRemove = useCallback(
        (index: number) => {
            let newFiles = [];
            if (files.length > 0) {
                newFiles = files.filter((_, i: number) => i !== index);
            }
            setFiles(newFiles);
        },
        [files, setFiles]
    );

    const thumbs = useMemo(
        () =>
            files.map((file, i) => (
                <div className={s.thumb} key={i}>
                    <div className={s.inner}>
                        <img className={s.img} src={file.preview} alt="" />
                    </div>
                    <div className={s.close}>
                        <CloseIcon fontSize="inherit" onClick={() => handleRemove(i)} />
                    </div>
                </div>
            )),
        [files]
    );

    // useEffect(() => {
    //     // Make sure to revoke the data uris to avoid memory leaks
    //     files.forEach(file => URL.revokeObjectURL(file.preview));
    // }, [files]);

    return (
        <div className={classes}>
            <div {...getRootProps({ className: s.dropzone })}>
                <input {...getInputProps()} />
                <p>{t('LBL_DRAG_N_DROP')}</p>
            </div>
            <aside className={s.container}>{thumbs}</aside>
        </div>
    );
};

export default ImageUploader;
