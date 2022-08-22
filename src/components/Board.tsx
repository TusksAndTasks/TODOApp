import React, { useMemo } from 'react';
import styled from 'styled-components';

import ButtonPrimitive from '../primitives/ButtonPrimitive';

import FormRouter from './FormRouter';

import useAssignmentsState from '../hooks/AssignmentsHooks/useAssignmentsState';
import useAssignmentsCreation from '../hooks/AssignmentsHooks/useAssignmentsCreation';

import { BoardPropertiesEnum } from '../types/types';

function Board() {
  const [assignments, assignmentsDispatch, createAssignmentsCallback] = useAssignmentsState();
  const assignmentList = useAssignmentsCreation({
    assignments,
    createAssignmentsCallback,
    assignmentsDispatch,
  });

  return (
    <StyledBoard>
      <div>
        <ButtonPrimitive
          onClick={useMemo(
            () => createAssignmentsCallback(BoardPropertiesEnum.MARK, assignmentsDispatch),
            []
          )}
        >
          Mark all as done
        </ButtonPrimitive>
        <ButtonPrimitive
          onClick={useMemo(
            () => createAssignmentsCallback(BoardPropertiesEnum.DELETEMARKED, assignmentsDispatch),
            []
          )}
        >
          Delete all completed tasks
        </ButtonPrimitive>
      </div>
      <AssignmentTable>{assignmentList}</AssignmentTable>
      <FormRouter
        onClick={useMemo(
          () => createAssignmentsCallback(BoardPropertiesEnum.ADD, assignmentsDispatch),
          []
        )}
      />
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
