import React from 'react';
import { IInputProps } from '../types/interfaces';

export class FormInput extends React.PureComponent<IInputProps> {
  render() {
    let input;
    const { name, value, onChange, id } = this.props;
    if (typeof value === 'boolean') {
      input = <input type="checkbox" name={name} checked={value} onChange={onChange} id={id} />;
    } else {
      input = <input type="text" name={name} value={value} onChange={onChange} id={id} />;
    }
    return input;
  }
}
