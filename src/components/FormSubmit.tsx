import React from 'react';
import { ISubmitForm } from '../types/interfaces';

export default function FormSubmit({ submitData, isValid, onSubmit }: ISubmitForm) {
  function handleClick() {
    if (isValid) {
      onSubmit(submitData);
    }
  }

  return <input type="submit" value="Confirm action" onClick={handleClick} />;
}
