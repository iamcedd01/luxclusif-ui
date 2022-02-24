import { FC } from 'react';
// COMPONENTS
import MuiGrid from '@mui/material/Grid';
import { PageContainer } from 'components/common';

interface Props {
    className?: string;
}

const Dashboard: FC<Props> = () => {
    return (
        <PageContainer>
            <MuiGrid container spacing={2} />
        </PageContainer>
    );
};

export default Dashboard;
