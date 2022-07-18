import React from 'react';
import { IInputProps } from '../types/interfaces';

export function FormInput(props: IInputProps) {
  const { name, value, onChange, id } = props;
  if (typeof value === 'boolean') {
    return <input type="checkbox" name={name} checked={value} onChange={onChange} id={id} />;
  } else {
    return <input type="text" name={name} value={value} onChange={onChange} id={id} />;
  }
}
