import React from 'react';
import styled, { css } from 'styled-components';

import InputPrimitive from '../primitives/InputPrimitive';
import ValidationMessagePrimitive from '../primitives/ValidationMessagePrimitive';

import useInputChange from '../hooks/FormHooks/useInputChange';
import useInputCreation from '../hooks/FormHooks/useInputCreation';
import useFormValidation from '../hooks/FormHooks/useFormValidation';
import useFormSubmission from '../hooks/FormHooks/useFormSubmission';

import { formMode } from './FormRouter';
import { IAssignment, IAssignmentData, InputTypes } from '../types/interfaces';

export interface IFormProps {
  assignment?: IAssignment;
  onSubmit: (arg: IAssignment) => void;
  toggleForm: () => void;
}

function Form({ assignment, onSubmit, toggleForm }: IFormProps) {
  let title = '';
  let description = '';
  let done = false;
  let id = -1;
  let author = '';

  if (assignment) {
    ({ title, id, done, description, author } = assignment);
  }

  const initialInputsState: IAssignmentData = {
    title: title,
    description: description,
    done: done,
    author: author,
  };

  const [inputsState, handleInput] = useInputChange(initialInputsState);
  const inputs = useInputCreation({ inputsState, handleInput, id });
  const [errorMessage, isValid] = useFormValidation(inputsState);
  const [errorIsActive, handleClickOnSubmit, handleSubmit] = useFormSubmission({
    inputsState,
    toggleForm,
    onSubmit,
    isValid,
    id,
  });

  return (
    <StyledForm mode={assignment ? 'update' : 'create'} onSubmit={handleSubmit}>
      {inputs}
      {errorIsActive && errorMessage ? (
        <ValidationMessagePrimitive>{errorMessage}</ValidationMessagePrimitive>
      ) : null}
      <InputPrimitive
        type={InputTypes.submit}
        value="Confirm action"
        className="button-like"
        onChange={handleClickOnSubmit}
      />
    </StyledForm>
  );
}

export default React.memo(Form);

export const FormLike = css`
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 10px;
`;

export const StyledForm = styled.form<{ mode: string }>`
  width: 100%;
  ${FormLike};
  border: ${(props) => (props.mode === formMode.CREATE ? 'none' : '1px solid red')};
  background-color: aliceblue;
  border-radius: 0 0 25px 25px;
`;
