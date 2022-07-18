import React from 'react';
import { IRedactableAssignmentProps } from '../types/interfaces';

export default function RedactableAssigment({
  assignmentData,
  handleDelete,
}: IRedactableAssignmentProps) {
  const { title, description, done } = assignmentData;
  return (
    <div className="assignment">
      <button onClick={() => handleDelete(assignmentData)}>Delete</button>
      <h2 className={done ? 'done' : 'undone'}>{title}</h2>
      <p className={done ? 'done' : 'undone'}>{description}</p>
      <p>{done ? 'done' : 'undone'}</p>
    </div>
  );
}
