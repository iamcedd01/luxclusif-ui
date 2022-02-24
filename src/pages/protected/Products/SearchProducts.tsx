import { FC, useCallback, useEffect, useState } from 'react';
// COMPONENTS
import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';
import MuiTableRow from '@mui/material/TableRow';
import { PageContainer } from 'components/common';
import MuiTableCell from '@mui/material/TableCell';
import { Button, Input, Table } from 'components/controls';
// UTILS
import axiosClient from 'utils/api';
import useDebounce from 'hooks/useDebounce';
import { useNavigate } from 'react-router-dom';

import s from './SearchProducts.scss';

const headers = [
    { label: 'LBL_NAME', width: '20%' },
    { label: 'LBL_BRAND' },
    { label: 'LBL_CATEGORY' },
    { label: 'LBL_PRICE' },
    { label: 'LBL_SKU', width: '13%' },
];

const SearchProducts: FC = () => {
    const navigate = useNavigate();

    // STATES
    const [products, setProducts] = useState([]);
    const [searching, setSearching] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    // PAGINATION STATES
    const perPage = 10;
    const [activePage, setActivePage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalResult, setTotalResult] = useState<number>(0);
    const [currentResult, setCurrentResult] = useState<number>(0);

    const debouncedSearch = useDebounce(searchValue, 500);

    // FUNCTIONS
    const handleSearch = useCallback(async () => {
        setSearching(true);
        const params = {
            page: activePage,
            search: searchValue,
        };
        await axiosClient.get('/products', { params }).then(({ data }) => {
            const { products: _products, total_count } = data;
            const { length } = _products;

            const count = total_count / perPage;
            const result = activePage * perPage + Math.ceil(length - perPage);

            setProducts(_products);
            setCurrentResult(result);
            setTotalResult(total_count);
            setTotalPages(Math.ceil(count));
        });
    }, [activePage, searchValue]);

    useEffect(() => {
        setActivePage(1);
        setSearching(true);
    }, [debouncedSearch]);

    useEffect(() => {
        handleSearch();
    }, [activePage, handleSearch, searching]);

    return (
        <PageContainer title="LBL_PRODUCT_LISTING">
            <MuiGrid container spacing={2}>
                <MuiGrid item lg={3}>
                    <Input
                        name="search"
                        value={searchValue}
                        placeholder="LBL_SEARCH_PRODUCTS"
                        onChange={e => setSearchValue(e.target.value)}
                    />
                </MuiGrid>
                <MuiGrid item lg={9} className={s.actions}>
                    <Button text="BTN_CREATE_PRODUCT" onClick={() => navigate('create')} />
                </MuiGrid>
            </MuiGrid>
            <MuiBox padding={1} />
            <MuiGrid container spacing={2}>
                <MuiGrid item lg={12}>
                    <Table
                        headers={headers}
                        totalPages={totalPages}
                        activePage={activePage}
                        totalResult={totalResult}
                        currentResult={currentResult}
                        handleChangePage={setActivePage}
                    >
                        {products.map(product => (
                            <MuiTableRow key={product.id}>
                                <MuiTableCell>
                                    <MuiLink onClick={() => navigate(`/${product._id}/edit`)}>{product.name}</MuiLink>
                                </MuiTableCell>
                                <MuiTableCell>{product.brand}</MuiTableCell>
                                <MuiTableCell>{product.category}</MuiTableCell>
                                <MuiTableCell>{product.price}</MuiTableCell>
                                <MuiTableCell>{product.sku}</MuiTableCell>
                            </MuiTableRow>
                        ))}
                    </Table>
                </MuiGrid>
            </MuiGrid>
        </PageContainer>
    );
};

export default SearchProducts;
