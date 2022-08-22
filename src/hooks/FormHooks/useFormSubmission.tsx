import React, { useCallback, useState } from 'react';

import { IAssignment, IAssignmentData } from '../../types/interfaces';

type useFormSubmissionProps = {
  inputsState: IAssignmentData;
  isValid: boolean;
  id: number;
  toggleForm: () => void;
  onSubmit: (arg: IAssignment) => void;
};

type useFormSubmissionReturns = [
  boolean,
  () => void,
  (e: React.FormEvent<HTMLFormElement>) => void
];

export default function useFormSubmission({
  inputsState,
  isValid,
  id,
  toggleForm,
  onSubmit,
}: useFormSubmissionProps): useFormSubmissionReturns {
  const [errorIsActive, setErrorIsActive] = useState(false);

  const handleClickOnSubmit = useCallback(() => {
    if (isValid) {
      onSubmit({ ...inputsState, id: id });
    }
  }, [isValid, inputsState]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrorIsActive(!isValid);
      if (isValid) {
        toggleForm();
      }
    },
    [isValid]
  );

  return [errorIsActive, handleClickOnSubmit, handleSubmit];
}
