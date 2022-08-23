import React, { ReactHTML } from 'react';
import styled from 'styled-components';

import Typography, { TypographyMode } from './Typography';

import { colors } from '../themes/colors';

function ValidationMessagePrimitive({ children }: { children: React.ReactNode }) {
  return (
    <StyledMessage as="p" mode={TypographyMode.PARAGRAPH} color={colors.WHITE}>
      {children}
    </StyledMessage>
  );
}

export default React.memo(ValidationMessagePrimitive);

const StyledMessage = styled(Typography)<{
  children: React.ReactNode;
  as?: keyof ReactHTML;
  mode?: TypographyMode;
  color?: colors;
}>`
  text-align: center;
  background-color: ${colors.PURPLE};
  padding: 10px;
`;
