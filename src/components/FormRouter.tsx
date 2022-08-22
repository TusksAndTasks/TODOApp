import React, { ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';

import ButtonPrimitive from '../primitives/ButtonPrimitive';

import Form, { FormLike } from './Form';

import { IAssignment } from '../types/interfaces';

export enum formMode {
  UPDATE = 'UPDATE',
  CREATE = 'CREATE',
}

export enum completionStatus {
  'DONE' = 'done',
  'UNDONE' = 'undone',
}

export interface IRouterProps {
  onClick: (arg: IAssignment) => void;
  children?: ReactNode;
  assignment?: IAssignment;
}

function FormRouter({ assignment, onClick, children }: IRouterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const mode = assignment ? formMode.UPDATE : formMode.CREATE;
  const status = assignment?.done ? completionStatus.DONE : completionStatus.UNDONE;

  function toggleForm() {
    setIsOpen(!isOpen);
  }

  return isOpen ? (
    <FormContainer mode={mode}>
      <ButtonPrimitive onClick={toggleForm}>Close</ButtonPrimitive>
      <Form onSubmit={onClick} assignment={assignment} toggleForm={toggleForm} />
    </FormContainer>
  ) : (
    <FormDataContainer mode={mode} status={status}>
      {children}
      <ButtonPrimitive onClick={toggleForm}>
        {children ? 'Refactor task' : 'Create task'}
      </ButtonPrimitive>
    </FormDataContainer>
  );
}

export default React.memo(FormRouter);

const conditionalFormStyle = css<{ mode: string }>`
  width: ${(props) => (props.mode === formMode.CREATE ? '500px' : '300px')};
`;

export const FormContainer = styled.div<{ mode: string }>`
  ${FormLike};
  border: black solid 2px;
  ${conditionalFormStyle};
  background-color: ${(props) => (props.mode === formMode.CREATE ? 'aliceblue' : 'white')};
  border-radius: 25px;
  & label {
    font-family: 'Roboto Slab', serif;
  }

  & input[type='text'] {
    width: 60%;
  }
`;

export const FormDataContainer = styled.div<{ mode: string; status: string }>`
  ${FormLike};
  border: gray solid 2px;
  background-color: ${(props) =>
    props.mode === formMode.CREATE ? '#ffd0d0' : props.status === 'done' ? '#d6f9e0' : '#e9e4be'};
  ${conditionalFormStyle};
  text-align: center;
  border-radius: 25px;
`;
