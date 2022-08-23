import { useEffect, useState } from 'react';

import { IAssignmentData } from '../../types/interfaces';

export default function useFormValidation(inputsState: IAssignmentData): [string, boolean] {
  const [errorMessage, setErrorMessage] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const keys = Object.keys(inputsState) as Array<keyof IAssignmentData>;
    let validationResult = true;
    let validationErrorMessage = 'Make sure this fields are filled:';
    keys.forEach((prop) => {
      if (typeof inputsState[prop] === 'string' && inputsState[prop] === '' && prop !== 'file') {
        validationErrorMessage = validationErrorMessage + ` ${prop}-field`;
        validationResult = false;
      }
    });
    validationErrorMessage = validationResult ? '' : validationErrorMessage;
    if (errorMessage !== validationErrorMessage) {
      setErrorMessage(validationErrorMessage);
    }
    if (isValid !== validationResult) {
      setIsValid(validationResult);
    }
  }, [inputsState, errorMessage]);

  return [errorMessage, isValid];
}
