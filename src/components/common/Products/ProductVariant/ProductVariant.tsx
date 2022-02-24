import cx from 'clsx';
import { FC } from 'react';
// COMPONENTS
import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';
import MuiDivider from '@mui/material/Divider';
import { Button, Input, Text } from 'components/controls';
// MODELS
import { IProductVariant } from 'types/models/Product';

import s from './ProductVariant.scss';

interface Props extends IProductVariant {
    className?: string;
    handleChangeVariant: (name: string, value: string | number) => void;
}

const ProductVariant: FC<Props> = ({ active, name, price, sku, quantity, className, handleChangeVariant }) => {
    const classes = cx(s.root, className);

    // FUNCTIONS
    const handleChange = e => {
        const { name, value } = e.target;
        handleChangeVariant(name, value);
    };

    return (
        <MuiBox className={classes}>
            <MuiDivider />
            <MuiBox paddingTop={1} paddingBottom={1}>
                <MuiBox>
                    <MuiBox className={s.header}>
                        <Text text={name} />
                        <Button text="BTN_REMOVE" size="small" variant="text" />
                    </MuiBox>
                    <MuiGrid container spacing={2}>
                        <MuiGrid item lg={4}>
                            <Input
                                name="price"
                                value={price}
                                label="LBL_PRICE"
                                placeholder="0.00"
                                disabled={!active}
                                onChange={handleChange}
                            />
                        </MuiGrid>
                        <MuiGrid item lg={4}>
                            <Input
                                name="sku"
                                value={sku}
                                label="LBL_SKU"
                                disabled={!active}
                                onChange={handleChange}
                                placeholder="PLACEHOLDER_ENTER_SKU"
                            />
                        </MuiGrid>
                        <MuiGrid item lg={4}>
                            <Input
                                name="quantity"
                                placeholder="0"
                                value={quantity}
                                disabled={!active}
                                label="LBL_QUANTITY"
                                onChange={handleChange}
                            />
                        </MuiGrid>
                    </MuiGrid>
                </MuiBox>
            </MuiBox>
        </MuiBox>
    );
};

export default ProductVariant;
