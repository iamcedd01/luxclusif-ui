import { FC, useCallback, useState, ChangeEvent } from 'react';
// COMPONENTS
import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';
import MuiPaper from '@mui/material/Paper';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PageContainer, ImageUploader } from 'components/common';
import { Button, Input, Label, Modal, Text } from 'components/controls';
import { ProductFooter, ProductOption } from 'components/common/Products';
// UTILS
import axiosClient from 'utils/api';
import { useNavigate } from 'react-router-dom';
// MODELS
import { IProductOption } from 'types/models/Product';

const CreateProduct: FC = () => {
    const navigate = useNavigate();

    // STATES
    const [name, setName] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [medias, setMedias] = useState([]);

    // PRICING STATES
    const [price, setPrice] = useState<number>(0);
    const [compareAtPrice, setCompareAtPrice] = useState<number>();

    // INVENTORY STATES
    const [sku, setSku] = useState<string>('');

    // OPTION STATES
    const [options, setOptions] = useState<Array<IProductOption>>([{ name: '', values: [''] }]);

    const [errors, setErrors] = useState({});

    // MODAL STATES
    const [successModal, setSuccessModal] = useState(false);

    // FUNCTIONS
    const handleAddOption = () => {
        const option: IProductOption = {
            name: '',
            values: [''],
        };
        setOptions(prevState => [...prevState, option]);
    };

    const handleChangeOptionName = useCallback(
        (value: string, index: number) => {
            const _options = options.map((option, i) => {
                if (i === index) {
                    return { ...option, name: value };
                }
                return option;
            });
            setOptions(_options);
        },
        [options]
    );

    const handleChangeOptionValue = useCallback(
        (value: string, index: number, itemIndex: number) => {
            const newOptions = options.map((option, i) => {
                if (i === index) {
                    const values = option.values?.map((val, _i) => {
                        if (_i === itemIndex) {
                            return value;
                        }
                        return val;
                    }) || [''];

                    if (itemIndex === values.length - 1 && value) {
                        return { ...option, values: [...values, ''] };
                    }

                    return { ...option, values };
                }
                return option;
            });
            setOptions(newOptions);
        },
        [options]
    );

    const handleRemoveOption = useCallback((index: number) => {
        setOptions(prevState => prevState.filter((_, i) => i !== index));
    }, []);

    const handleRemoveOptionValue = useCallback(
        (index: number, itemIndex: number) => {
            const newOptions = options.map((option, i) => {
                if (i === index) {
                    const values = option.values.filter((_, _i) => _i !== itemIndex);
                    return { ...option, values };
                }
                return option;
            });

            setOptions(newOptions);
        },
        [options]
    );

    const handleChangePrice = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const val = Number(value);
        if (isNaN(val)) return;

        if (name === 'price') {
            setPrice(val);
        } else if (name === 'comparePrice') {
            setCompareAtPrice(val);
        }
    }, []);

    const handleValidate = useCallback(() => {
        let isValid = true;
        let errors = {};

        if (!sku) {
            isValid = false;
            errors = { ...errors, sku: 'SKU is required' };
        }

        if (!name) {
            isValid = false;
            errors = { ...errors, name: 'Product Name is required' };
        }

        if (!brand) {
            isValid = false;
            errors = { ...errors, brand: 'Product Brand is required' };
        }

        if (!category) {
            isValid = false;
            errors = { ...errors, category: 'Product Category is required' };
        }

        if (price.toString() === '') {
            isValid = false;
            errors = { ...errors, price: 'Price is required' };
        }

        setErrors(errors);
        return isValid;
    }, [brand, category, name, price, sku]);

    const handleSave = useCallback(async () => {
        const valid = handleValidate();
        if (!valid) return;

        await axiosClient
            .post('/products', {
                sku,
                name,
                brand,
                price,
                category,
                options,
                description,
                media: medias,
            })
            .then(() => setSuccessModal(true))
            .catch(err => {
                const { data } = err.response;
                setErrors(data.errors);
            });
        // navigate('/');
    }, [brand, category, description, handleValidate, medias, name, options, price, sku]);

    return (
        <PageContainer title="LBL_CREATE_PRODUCT">
            <MuiGrid container spacing={2}>
                <MuiGrid item lg={6} sm={12}>
                    <MuiBox component={MuiPaper} padding={2} marginBottom={2}>
                        <Text
                            fontWeight="bold"
                            textTransform="uppercase"
                            className="font-semibold"
                            text="LBL_BASIC_INFORMATION"
                        />
                        <Input
                            name="name"
                            value={name}
                            label="LBL_NAME"
                            error={!!errors.name}
                            errorMessage={errors.name}
                            onChange={e => setName(e.target.value)}
                            placeholder="PLACEHOLDER_ENTER_PRODUCT_NAME"
                        />
                        <Label text="LBL_DESCRIPTION" />
                        <CKEditor
                            data={description}
                            editor={ClassicEditor}
                            onChange={(_event: any, editor: { getData: () => any }) => {
                                const data = editor.getData();
                                setDescription(data);
                            }}
                        />
                    </MuiBox>
                    <MuiBox component={MuiPaper} padding={2} marginBottom={2}>
                        <Text
                            fontWeight="bold"
                            textTransform="uppercase"
                            className="font-semibold"
                            text="LBL_OTHER_INFORMATION"
                        />
                        <MuiGrid container spacing={2}>
                            <MuiGrid item lg={6}>
                                <Input
                                    value={brand}
                                    label="LBL_BRAND"
                                    error={!!errors.brand}
                                    errorMessage={errors.brand}
                                    placeholder="PLACEHOLDER_ENTER_BRAND"
                                    onChange={e => setBrand(e.target.value)}
                                />
                            </MuiGrid>
                            <MuiGrid item lg={6}>
                                <Input
                                    value={category}
                                    label="LBL_CATEGORY"
                                    error={!!errors.category}
                                    errorMessage={errors.category}
                                    placeholder="PLACEHOLDER_ENTER_CATEGORY"
                                    onChange={e => setCategory(e.target.value)}
                                />
                            </MuiGrid>
                        </MuiGrid>
                    </MuiBox>
                    <MuiBox component={MuiPaper} padding={2} marginBottom={2}>
                        <Text text="LBL_MEDIA" fontWeight="bold" textTransform="uppercase" className="font-semibold" />
                        <ImageUploader files={medias} setFiles={setMedias} />
                    </MuiBox>
                    <MuiBox component={MuiPaper} padding={2} marginBottom={2}>
                        <MuiBox display="flex" justifyContent="space-between" alignItems="center">
                            <Text
                                fontWeight="bold"
                                text="LBL_OPTIONS"
                                textTransform="uppercase"
                                className="font-semibold"
                            />
                            {options.length < 2 && (
                                <Button size="small" text="BTN_ADD_OPTION" onClick={handleAddOption} variant="text" />
                            )}
                        </MuiBox>
                        {options.length > 0 && <MuiBox margin={1} />}
                        {options.map((option, i) => (
                            <ProductOption
                                key={i}
                                {...option}
                                handleChangeName={(value: string) => handleChangeOptionName(value, i)}
                                handleChangeValue={(value: string, index: number) =>
                                    handleChangeOptionValue(value, i, index)
                                }
                                handleRemoveOption={() => handleRemoveOption(i)}
                                handleRemoveOptionValue={index => handleRemoveOptionValue(i, index)}
                            />
                        ))}
                    </MuiBox>
                </MuiGrid>
                <MuiGrid item lg={6} sm={12}>
                    <MuiBox component={MuiPaper} padding={2} marginBottom={2}>
                        <Text
                            fontWeight="bold"
                            textTransform="uppercase"
                            className="font-semibold"
                            text="LBL_PRICING_INFORMATION"
                        />
                        <MuiGrid container spacing={2}>
                            <MuiGrid item lg={6}>
                                <Input
                                    name="price"
                                    value={price}
                                    label="LBL_PRICE"
                                    placeholder="0.00"
                                    error={!!errors.price}
                                    errorMessage={errors.price}
                                    onChange={handleChangePrice}
                                />
                            </MuiGrid>
                            <MuiGrid item lg={6}>
                                <Input
                                    placeholder="0.00"
                                    name="comparePrice"
                                    value={compareAtPrice}
                                    onChange={handleChangePrice}
                                    label="LBL_COMPARE_AT_PRICE"
                                    error={!!errors.compareAtPrice}
                                    errorMessage={errors.compareAtPrice}
                                />
                            </MuiGrid>
                        </MuiGrid>
                    </MuiBox>
                    <MuiBox component={MuiPaper} padding={2} marginBottom={2}>
                        <Text
                            fontWeight="bold"
                            textTransform="uppercase"
                            className="font-semibold"
                            text="LBL_INVENTORY"
                        />
                        <MuiGrid container spacing={2}>
                            <MuiGrid item lg={6}>
                                <Input
                                    name="sku"
                                    value={sku}
                                    label="LBL_SKU"
                                    error={!!errors.sku}
                                    errorMessage={errors.sku}
                                    placeholder="PLACEHOLDER_ENTER_SKU"
                                    onChange={e => setSku(e.target.value)}
                                />
                            </MuiGrid>
                        </MuiGrid>
                    </MuiBox>
                </MuiGrid>
            </MuiGrid>
            <ProductFooter submitLabel="BTN_SAVE" handleBack={() => navigate('/')} handleSubmit={handleSave} />

            {successModal && (
                <Modal
                    open={successModal}
                    title="LBL_SUCCESS"
                    message="LBL_PRODUCT_ADDED_MESSAGE"
                    handleClose={() => setSuccessModal(false)}
                    actions={
                        <Button
                            text="BTN_OK"
                            onClick={() => {
                                setSuccessModal(false);
                                navigate('/');
                            }}
                        />
                    }
                />
            )}
        </PageContainer>
    );
};

export default CreateProduct;
