import React from 'react';
import { IRedactableAssignmentProps } from '../types/interfaces';
import { AssignmentTitle, StyledButton } from '../styledComponents/styledComponents';

export default function RedactableAssigment({
  assignmentData,
  handleDelete,
}: IRedactableAssignmentProps) {
  const { title, done } = assignmentData;
  return (
    <div>
      <StyledButton
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleDelete(assignmentData);
        }}
      >
        Delete
      </StyledButton>
      <AssignmentTitle status={done ? 'done' : 'undone'}>{title}</AssignmentTitle>
      <p>{done ? 'done' : 'undone'}</p>
    </div>
  );
}
