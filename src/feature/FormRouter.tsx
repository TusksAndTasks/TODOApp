import React, { useState } from 'react';
import { IRouterProps } from '../types/interfaces';
import Form from '../components/Form';
import {
  StyledButton,
  FormContainer,
  FormDataContainer,
} from '../styledComponents/styledComponents';

export default function FormRouter({ assignment, onClick, children }: IRouterProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleForm() {
    setIsOpen(!isOpen);
  }

  return isOpen ? (
    <FormContainer mode={assignment ? 'update' : 'create'}>
      <StyledButton onClick={() => toggleForm()}>Close</StyledButton>
      <Form onSubmit={onClick} assignment={assignment} toggleForm={toggleForm} />
    </FormContainer>
  ) : (
    <FormDataContainer
      mode={assignment ? 'update' : 'create'}
      status={assignment?.done ? 'done' : 'undone'}
    >
      {children}
      <StyledButton onClick={() => toggleForm()}>
        {children ? 'Refactor task' : 'Create task'}
      </StyledButton>
    </FormDataContainer>
  );
}
