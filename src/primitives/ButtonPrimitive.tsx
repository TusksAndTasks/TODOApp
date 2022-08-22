import React from 'react';
import styled, { css } from 'styled-components';

export enum buttonModes {
  PRIMARY = 'PRIMARY',
  AUTH = 'AUTH',
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

const authButton = css`
  font-size: 12px;
  padding: 4px;
  background-color: white;
  color: black;
  border-radius: 25px;
  width: 120px;
  transition: 1s;
  margin: 2px;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: black;
  }
`;

const buttonStylesMap = {
  [buttonModes.PRIMARY]: clickableElement,
  [buttonModes.AUTH]: authButton,
};

const StyledButton = styled.button<{ mode: buttonModes }>`
  ${(props) => buttonStylesMap[props.mode]}
`;
