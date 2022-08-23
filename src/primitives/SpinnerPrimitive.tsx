import React from 'react';
import styled, { keyframes } from 'styled-components';

import { colors } from '../themes/colors';

export enum SpinnerSize {
  LARGE = 'LARGE',
}

function SpinnerPrimitive({ size }: { size: SpinnerSize }) {
  return <Spinner size={size} />;
}

export default React.memo(SpinnerPrimitive);

const SpinnerStylesMap = {
  [SpinnerSize.LARGE]: 'width: 50px;  height: 50px;',
};

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div<{ size: SpinnerSize }>`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid ${colors.AQUAMARINE};
  border-right: 2px solid ${colors.AQUAMARINE};
  border-bottom: 2px solid ${colors.AQUAMARINE};
  border-left: 4px solid ${colors.BLUE};
  background: transparent;
  ${(props) => SpinnerStylesMap[props.size]}
  border-radius: 50%;
`;
