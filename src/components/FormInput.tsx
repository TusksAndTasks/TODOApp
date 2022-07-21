import React from 'react';
import { IInputProps } from '../types/interfaces';
import { StyledPreviewImage } from '../styledComponents/styledComponents';

export function FormInput(props: IInputProps) {
  const { name, value, onChange, id } = props;
  if (typeof value === 'boolean') {
    return <input type="checkbox" name={name} checked={value} onChange={onChange} id={id} />;
  } else if (name === 'file') {
    return (
      <>
        <label htmlFor={id}>
          {value ? <StyledPreviewImage src={value} alt="custom pic" /> : null}
        </label>
        <input type="file" name={name} onChange={onChange} id={id} />
      </>
    );
  } else {
    return <input type="text" name={name} value={value} onChange={onChange} id={id} />;
  }
}
