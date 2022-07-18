import React from 'react';
import { ISubmitForm } from '../types/interfaces';
import { StyledInput } from '../styledComponents/styledComponents';

export default function FormSubmit({ submitData, isValid, onSubmit }: ISubmitForm) {
  function handleClick() {
    if (isValid) {
      onSubmit(submitData);
    }
  }

  return <StyledInput type="submit" value="Confirm action" onClick={handleClick} />;
}
