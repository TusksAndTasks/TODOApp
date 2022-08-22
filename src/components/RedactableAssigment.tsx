import React from 'react';

import ButtonPrimitive from '../primitives/ButtonPrimitive';
import Typography from '../primitives/Typography';

import { IAssignment } from '../types/interfaces';
import { colors } from '../themes/colors';
import { completionStatus } from './FormRouter';

export interface IRedactableAssignmentProps {
  assignmentData: IAssignment;
  handleDelete: (assignment: IAssignment) => void;
}

function RedactableAssigment({ assignmentData, handleDelete }: IRedactableAssignmentProps) {
  const { title, done } = assignmentData;
  return (
    <div>
      <ButtonPrimitive onClick={() => handleDelete(assignmentData)}>Delete</ButtonPrimitive>
      <Typography as="h2" color={done ? colors.BLUE : colors.PURPLE}>
        {title}
      </Typography>
      <p>{done ? completionStatus.DONE : completionStatus.UNDONE}</p>
    </div>
  );
}

export default React.memo(RedactableAssigment);
