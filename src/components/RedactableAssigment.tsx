import React from 'react';
import { IRedactableAssignmentProps } from '../types/interfaces';
import {
  AssignmentTitle,
  AssignmentDescription,
  StyledButton,
} from '../styledComponents/styledComponents';

export default function RedactableAssigment({
  assignmentData,
  handleDelete,
}: IRedactableAssignmentProps) {
  const { title, description, done } = assignmentData;
  return (
    <div>
      <StyledButton onClick={() => handleDelete(assignmentData)}>Delete</StyledButton>
      <AssignmentTitle status={done ? 'done' : 'undone'}>{title}</AssignmentTitle>
      <AssignmentDescription status={done ? 'done' : 'undone'}>{description}</AssignmentDescription>
      <p>{done ? 'done' : 'undone'}</p>
    </div>
  );
}
