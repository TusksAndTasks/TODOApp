import React from 'react';
import styled, { css } from 'styled-components';

enum buttonModes {
  PRIMARY = 'PRIMARY',
}

type ButtonPrimitiveProps = {
  className?: string;
  mode?: buttonModes;
  children?: React.ReactNode;
  onClick: () => void;
};

function ButtonPrimitive({
  className,
  mode = buttonModes.PRIMARY,
  children,
  onClick,
}: ButtonPrimitiveProps) {
  return (
    <StyledButton onClick={onClick} className={className} mode={mode}>
      {children}
    </StyledButton>
  );
}

export default React.memo(ButtonPrimitive);

export const clickableElement = css`
  width: 200px;
  font-size: 20px;
  background-color: #b9c6d5;
  border: none;
  border-radius: 15px;
  margin: 20px;
  transition: 0.5s;
  padding: 15px 20px;

  &:hover {
    background-color: #76a7ea;
    color: white;
  }
`;

const buttonStylesMap = {
  [buttonModes.PRIMARY]: clickableElement,
};

const StyledButton = styled.button<{ mode: buttonModes }>`
  ${(props) => buttonStylesMap[props.mode]}
`;
