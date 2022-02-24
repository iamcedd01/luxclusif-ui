import cx from 'clsx';
import { FC } from 'react';
// COMPONENTS
import MuiTable from '@mui/material/Table';
import MuiTableBody from '@mui/material/TableBody';
import MuiTableCell from '@mui/material/TableCell';
import MuiTableContainer from '@mui/material/TableContainer';
import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';
import MuiPaper from '@mui/material/Paper';
import MuiStack from '@mui/material/Stack';
import MuiPagination from '@mui/material/Pagination';
import MuiTableFooter from '@mui/material/TableFooter';
import { Text } from 'components/controls';
// UTILS
import { useTranslation } from 'react-i18next';

import s from './Table.scss';

interface Props {
    loading?: boolean;
    className?: string;
    headers?: Array<{
        label: string;
    }>;

    activePage: number;
    totalPages: number;
    totalResult: number;
    currentResult: number;
    handleChangePage: (page: number) => void;
}

const Table: FC<Props> = ({
    headers,
    loading,
    children,
    className,

    // PAGINATION
    activePage = 1,
    totalPages = 1,
    totalResult = 0,
    currentResult = 0,
    handleChangePage,
}) => {
    const { t } = useTranslation();
    const classes = cx(s.root, className);

    return (
        <MuiTableContainer className={classes} component={MuiPaper}>
            <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
                {headers && (
                    <MuiTableHead>
                        <MuiTableRow>
                            {headers.map(({ label, ...header }, i) => (
                                <MuiTableCell key={i} {...header}>
                                    {t(label)}
                                </MuiTableCell>
                            ))}
                        </MuiTableRow>
                    </MuiTableHead>
                )}
                <MuiTableBody>
                    {loading ? (
                        <MuiTableRow>
                            <MuiTableCell colSpan={headers?.length} align="center">
                                Loading...
                            </MuiTableCell>
                        </MuiTableRow>
                    ) : (
                        children
                    )}
                </MuiTableBody>
                <MuiTableFooter>
                    <MuiTableRow>
                        <MuiTableCell colSpan={headers?.length}>
                            <MuiStack className={s.footer}>
                                <div>
                                    <Text>
                                        {t('LBL_PAGE_RESULT', {
                                            totalResult,
                                            currentResult,
                                        })}
                                    </Text>
                                </div>

                                <MuiPagination
                                    showLastButton
                                    shape="rounded"
                                    showFirstButton
                                    variant="outlined"
                                    page={activePage}
                                    count={totalPages}
                                    onChange={(_e, value) => handleChangePage(value)}
                                />
                            </MuiStack>
                        </MuiTableCell>
                    </MuiTableRow>
                </MuiTableFooter>
            </MuiTable>
        </MuiTableContainer>
    );
};

export default Table;
