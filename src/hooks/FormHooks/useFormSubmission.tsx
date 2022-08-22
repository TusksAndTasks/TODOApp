import React, { useCallback, useState } from 'react';

import { IAssignment, IAssignmentData } from '../../types/interfaces';
import { apiController } from '../../utils/api';

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
    const apiControllerMethod = apiController.getCorrectMethod(id);
    if (isValid) {
      apiControllerMethod({ ...inputsState, id: id })
        .catch((err) => {
          throw err;
        })
        .then((res) => {
          if (res) {
            onSubmit({ ...inputsState, id: id });
          }
        });
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
