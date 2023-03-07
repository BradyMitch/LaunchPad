import { Container } from '@mui/material';
import { ReactNode } from 'react';
import React from 'react';

interface IPageLayout {
  children: ReactNode;
  customHeight?: string;
}

const PageLayout = (props: IPageLayout) => {
  const { children, customHeight } = props;
  return (
    <Container
      sx={{
        width: '1096px !important',
        minHeight: customHeight || '86.8vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {children}
    </Container>
  );
};

export default PageLayout;
