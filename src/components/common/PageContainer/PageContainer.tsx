import { FC } from 'react';
// COMPONENTS
import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';
import MuiContainer from '@mui/material/Container';
import { Text } from 'components/controls';

interface Props {
    title?: string;
}

const PageContainer: FC<Props> = ({ title, children }) => {
    return (
        <MuiBox>
            <MuiContainer maxWidth={false}>
                <MuiBox padding={1} />
                {title && (
                    <MuiGrid container>
                        <Text variant="h5" text={title} />
                    </MuiGrid>
                )}
                <MuiBox padding={1} />
                <MuiGrid container>{children}</MuiGrid>
            </MuiContainer>
        </MuiBox>
    );
};

export default PageContainer;
