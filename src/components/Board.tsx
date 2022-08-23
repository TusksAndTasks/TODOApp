import React, { useMemo } from 'react';
import styled from 'styled-components';

import ButtonPrimitive from '../primitives/ButtonPrimitive';

import FormRouter from './FormRouter';

import useAssignmentsState from '../hooks/AssignmentsHooks/useAssignmentsState';
import useAssignmentsCreation from '../hooks/AssignmentsHooks/useAssignmentsCreation';

import {
  apiCreateAssignments,
  apiDeleteMarked,
  apiMarkAsDone,
} from '../redux/slices/AssignmentsSlice';
import { useSelector } from 'react-redux';
import { GlobalState } from '../redux/store';
import SpinnerPrimitive, { SpinnerSize } from '../primitives/SpinnerPrimitive';

function Board() {
  const createAssignmentsCallback = useAssignmentsState();
  const assignmentList = useAssignmentsCreation(createAssignmentsCallback);
  const { assignments, isLoading } = useSelector((state: GlobalState) => state.assignments);

  return (
    <StyledBoard>
      <div>
        <ButtonPrimitive
          onClick={useMemo(
            () => () => {
              createAssignmentsCallback(apiMarkAsDone)(assignments.slice());
            },
            [assignments, isLoading]
          )}
        >
          Mark all as done
        </ButtonPrimitive>
        <ButtonPrimitive
          onClick={useMemo(
            () => () => createAssignmentsCallback(apiDeleteMarked)(assignments),
            [assignments, createAssignmentsCallback]
          )}
        >
          Delete all completed tasks
        </ButtonPrimitive>
      </div>
      <AssignmentTable>
        {isLoading ? <SpinnerPrimitive size={SpinnerSize.LARGE} /> : assignmentList}
      </AssignmentTable>
      <FormRouter onClick={useMemo(() => createAssignmentsCallback(apiCreateAssignments), [])} />
    </StyledBoard>
  );
}

export default React.memo(Board);

export const StyledBoard = styled.main`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const AssignmentTable = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
`;
