import React, { useMemo } from 'react';

import FormRouter from '../../components/FormRouter';
import RedactableAssigment from '../../components/RedactableAssigment';

import { IAssignment } from '../../types/interfaces';
import { BoardPropertiesEnum } from '../../types/types';
import { createAssignmentsCallbackType } from './useAssignmentsState';

export type IBoardAction = {
  type: BoardPropertiesEnum;
  payload?: IAssignment;
};

type UseAssignmentsCreationProps = {
  assignments: IAssignment[];
  assignmentsDispatch: React.Dispatch<IBoardAction>;
  createAssignmentsCallback: createAssignmentsCallbackType;
};

export default function useAssignmentsCreation({
  assignments,
  assignmentsDispatch,
  createAssignmentsCallback,
}: UseAssignmentsCreationProps) {
  const createAssignment = useMemo(
    () => createAssignmentsCallback(BoardPropertiesEnum.UPDATE, assignmentsDispatch),
    []
  );

  const deleteAssignment = useMemo(
    () => createAssignmentsCallback(BoardPropertiesEnum.DELETE, assignmentsDispatch),
    []
  );

  function generateAssignments() {
    return assignments.map((assignment) => {
      return (
        <FormRouter onClick={createAssignment} assignment={assignment} key={assignment.id}>
          <RedactableAssigment assignmentData={assignment} handleDelete={deleteAssignment} />
        </FormRouter>
      );
    });
  }

  return useMemo(() => generateAssignments(), [assignments]);
}
