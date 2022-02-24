import cx from 'clsx';
import { FC, useMemo, useState } from 'react';
// COMPONENTS
import MuiBox from '@mui/material/Box';
import MuiChip from '@mui/material/Chip';
import MuiDivider from '@mui/material/Divider';
import { Button, Input, Label, Text } from 'components/controls';
// ICONS
import DeleteIcon from '@mui/icons-material/Delete';
// MODELS
import { IProductOption } from 'types/models/Product';

import s from './ProductOption.scss';

export interface Props extends IProductOption {
    isEdit?: boolean;
    className?: string;
    handleRemoveOption: () => void;
    handleChangeName: (value: string) => void;
    handleRemoveOptionValue: (index: number) => void;
    handleChangeValue: (value: string, index: number) => void;
}

const ProductOption: FC<Props> = ({
    name,
    values,
    className,
    isEdit = true,
    handleChangeName,
    handleChangeValue,
    handleRemoveOption,
    handleRemoveOptionValue,
}) => {
    const classes = cx(s.root, className);

    // STATES
    const [isEditable, setIsEditable] = useState<boolean>(isEdit);

    const showEdit = useMemo(() => {
        return !!name && values.filter(value => !!value).length > 0;
    }, [name, values]);

    return (
        <MuiBox className={classes}>
            <MuiDivider />
            {isEditable ? (
                <MuiBox padding={1} className={s.wrapper}>
                    <MuiBox className={s.content}>
                        <Input
                            value={name}
                            label="LBL_OPTION_NAME"
                            placeholder="PLACEHOLDER_ENTER_OPTION_NAME"
                            onChange={e => handleChangeName(e.target.value)}
                        />
                        <Label text="LBL_OPTION_VALUES" />
                        {values?.map((value, i) => {
                            return (
                                <MuiBox key={i} className={s.value}>
                                    <Input
                                        key={i}
                                        value={value}
                                        className={s.input}
                                        placeholder="PLACEHOLDER_ENTER_OPTION_VALUE"
                                        onChange={e => handleChangeValue(e.target.value, i)}
                                    />
                                    {i < values.length - 1 && (
                                        <DeleteIcon
                                            classes={{ root: s.remove }}
                                            onClick={() => handleRemoveOptionValue(i)}
                                        />
                                    )}
                                </MuiBox>
                            );
                        })}
                        {isEditable && showEdit && (
                            <Button text="BTN_DONE" size="small" onClick={() => setIsEditable(false)} />
                        )}
                    </MuiBox>
                    <DeleteIcon classes={{ root: s.remove }} onClick={handleRemoveOption} />
                </MuiBox>
            ) : (
                <MuiBox padding={1} className={s.viewWrapper}>
                    <MuiBox className={s.content}>
                        <Text text={name} fontWeight="bold" />
                        <div className={s.values}>
                            {values
                                .filter(value => !!value)
                                .map((value, i) => (
                                    <MuiChip key={i} size="small" label={value} classes={{ root: s.value }} />
                                ))}
                        </div>
                    </MuiBox>
                    <Button text="BTN_EDIT" size="small" onClick={() => setIsEditable(true)} />
                </MuiBox>
            )}
        </MuiBox>
    );
};

export default ProductOption;
