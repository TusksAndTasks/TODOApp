import React from 'react';
import styled from 'styled-components';

import { colors } from '../themes/colors';

function HeaderPrimitive({ children }: { children: React.ReactNode }) {
  return <StyledHeading>{children}</StyledHeading>;
}

export default React.memo(HeaderPrimitive);

const StyledHeading = styled.header`
  background-color: ${colors.BLUE};
  text-align: center;
`;
