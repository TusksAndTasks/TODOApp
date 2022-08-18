import React from 'react';

import { IInputProps, InputTypes } from '../types/interfaces';

export class InputPrimitive extends React.PureComponent<IInputProps> {
  getEventValue(callback: (event: React.ChangeEvent<HTMLInputElement>) => void | (() => void)) {
    return (e: React.ChangeEvent<HTMLInputElement>) => callback(e);
  }

  render() {
    const { type, name, value, onChange, id, className } = this.props;
    return React.createElement('input', {
      type,
      name,
      [InputMap[type].valueKey]: value,
      [InputMap[type].handlerKey]: this.getEventValue(onChange),
      id,
      className,
    });
  }
}

const InputMap = {
  [InputTypes.text]: {
    valueKey: 'value',
    handlerKey: 'onInput',
  },
  [InputTypes.checkbox]: {
    valueKey: 'checked',
    handlerKey: 'onChange',
  },
  [InputTypes.submit]: {
    valueKey: 'value',
    handlerKey: 'onClick',
  },
};
