import React from 'react';
import styled from 'styled-components';
import Typography, { TypographyMode } from '../primitives/Typography';
import { colors } from '../themes/colors';

function AuthorizedPage() {
  return (
    <StyledAuthPage>
      <Typography as="h2" mode={TypographyMode.HEADING} color={colors.BLACK}>
        You are authorized
      </Typography>
    </StyledAuthPage>
  );
}

export default React.memo(AuthorizedPage);

const StyledAuthPage = styled.div`
  width: 100%;
  height: 89.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d5f1d5;
`;
