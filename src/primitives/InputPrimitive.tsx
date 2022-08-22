import React from 'react';
import styled from 'styled-components';

import { clickableElement } from './ButtonPrimitive';

import { InputTypes } from '../types/interfaces';

enum InputModes {
  STANDARD = 'STANDARD',
  BUTTONLIKE = 'BUTTONLIKE',
}

export interface IInputProps {
  type: InputTypes;
  value: string | boolean;
  name?: string;
  id?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void | (() => void);
}

const InputPrimitive = ({ type, name, value, id, className, onChange }: IInputProps) => {
  function standardizeCallback<Arg extends void | React.ChangeEvent<HTMLInputElement>>(
    callback: (argument: Arg) => void
  ) {
    return (argument: Arg) => callback(argument);
  }
  return React.createElement('input', {
    type,
    name,
    [InputMap[type].valueKey]: value,
    [InputMap[type].handlerKey]: standardizeCallback(onChange),
    id,
    className,
  });
};

export default React.memo(styled(InputPrimitive)`
  ${(props) => inputStylesMap[InputMap[props.type].mode]}
`);

const inputStylesMap = {
  [InputModes.STANDARD]: '',
  [InputModes.BUTTONLIKE]: clickableElement,
};

const InputMap = {
  [InputTypes.text]: {
    valueKey: 'value',
    handlerKey: 'onInput',
    mode: InputModes.STANDARD,
  },
  [InputTypes.checkbox]: {
    valueKey: 'checked',
    handlerKey: 'onChange',
    mode: InputModes.STANDARD,
  },
  [InputTypes.submit]: {
    valueKey: 'value',
    handlerKey: 'onClick',
    mode: InputModes.BUTTONLIKE,
  },
};
