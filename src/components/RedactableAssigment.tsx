import React, { useCallback } from 'react';

import ButtonPrimitive from '../primitives/ButtonPrimitive';
import Typography from '../primitives/Typography';

import { colors } from '../themes/colors';
import { completionStatus } from './FormRouter';

import { IAssignment } from '../types/interfaces';

export interface IRedactableAssignmentProps {
  assignmentData: IAssignment;
  handleDelete: (assignment: IAssignment) => void;
}

function RedactableAssigment({ assignmentData, handleDelete }: IRedactableAssignmentProps) {
  const { title, done } = assignmentData;

  const deleteAssignment = useCallback(() => handleDelete(assignmentData), [assignmentData]);

  return (
    <div>
      <ButtonPrimitive onClick={deleteAssignment}>Delete</ButtonPrimitive>
      <Typography as="h2" color={done ? colors.BLUE : colors.PURPLE}>
        {title}
      </Typography>
      <p>{done ? completionStatus.DONE : completionStatus.UNDONE}</p>
    </div>
  );
}

export default React.memo(RedactableAssigment);
