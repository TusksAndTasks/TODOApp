import React, { useEffect, useReducer, useState } from 'react';
import { IAssignmentData, IFormAction, IFormProps } from '../types/interfaces';
import { FormInput } from './FormInput';
import FormSubmit from './FormSubmit';
import InputLabel from './InputLabel';
import ValidationMessage from './ValidationMessage';
import { AssignmentPropertiesEnum } from '../types/types';
import { StyledForm } from '../styledComponents/styledComponents';

export default function Form({ assignment, onSubmit, toggleForm }: IFormProps) {
  let title = '';
  let description = '';
  let done = false;
  let id = -1;
  let author = '';
  let file = '';

  if (assignment) {
    ({ title, id, done, description, author, file } = assignment);
  }

  function inputReducer(state: IAssignmentData, action: IFormAction): IAssignmentData {
    switch (action.type) {
      case AssignmentPropertiesEnum.TITLE:
        return { ...state, title: action.payload as string };
      case AssignmentPropertiesEnum.DONE:
        return { ...state, done: action.payload as boolean };
      case AssignmentPropertiesEnum.DESCRIPTION:
        return { ...state, description: action.payload as string };
      case AssignmentPropertiesEnum.AUTHOR:
        return { ...state, author: action.payload as string };
      case AssignmentPropertiesEnum.FILE:
        return {
          ...state,
          file: action.payload ? URL.createObjectURL((action.payload as FileList)[0]) : '',
        };
      default:
        return { ...state };
    }
  }

  const initialInputsState: IAssignmentData = {
    title: title,
    description: description,
    done: done,
    author: author,
    file: file,
  };

  const [inputsState, inputsDispatch] = useReducer(inputReducer, initialInputsState);
  const [isValid, setIsValid] = useState(false);
  const [errorIsActive, setErrorIsActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleInput(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, type } = e.target;
    const value =
      type === 'checkbox' ? e.target.checked : type === 'file' ? e.target.files : e.target.value;
    inputsDispatch({ type: `${name}Change` as AssignmentPropertiesEnum, payload: value });
  }

  function generateInputs() {
    const keys = Object.keys(inputsState) as Array<keyof IAssignmentData>;
    const inputId = id > -1 ? `${id}-upd` : `${id}-create`;
    return keys.map((key) => {
      return (
        <React.Fragment key={key}>
          {generateLabel(inputId, key)}
          <FormInput name={key} value={inputsState[key]} onChange={handleInput} id={inputId} />
        </React.Fragment>
      );
    });
  }

  function generateLabel(id: string, key: string) {
    return <InputLabel id={id} name={key} />;
  }

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

  const inputs = generateInputs() as JSX.Element[];
  return (
    <StyledForm
      mode={assignment ? 'update' : 'create'}
      onSubmit={(e) => {
        e.preventDefault();
        if (!isValid) {
          setErrorIsActive(true);
        } else {
          setErrorIsActive(false);
          toggleForm();
        }
      }}
    >
      {inputs}
      {errorIsActive && errorMessage ? <ValidationMessage message={errorMessage} /> : null}
      <FormSubmit onSubmit={onSubmit} submitData={{ ...inputsState, id: id }} isValid={isValid} />
    </StyledForm>
  );
}
