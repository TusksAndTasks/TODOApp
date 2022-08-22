import React from 'react';
import styled from 'styled-components';
import Typography, { TypographyMode } from '../primitives/Typography';
import { colors } from '../themes/colors';

function PageNotFound() {
  return (
    <StyledNotFoundPage>
      <Typography as="h2" mode={TypographyMode.HEADING} color={colors.BLACK}>
        Ooops... Page not found!
      </Typography>
    </StyledNotFoundPage>
  );
}

export default React.memo(PageNotFound);

export const StyledNotFoundPage = styled.div`
  width: 100%;
  height: 89.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3d1d1;
`;
