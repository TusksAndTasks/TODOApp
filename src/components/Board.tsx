import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import ButtonPrimitive from '../primitives/ButtonPrimitive';

import FormRouter from './FormRouter';

import useAssignmentsState from '../hooks/AssignmentsHooks/useAssignmentsState';
import useAssignmentsCreation from '../hooks/AssignmentsHooks/useAssignmentsCreation';

import { BoardPropertiesEnum } from '../types/types';
import { apiController } from '../utils/api';
import { deleteMarkedRequest, markRequest } from '../utils/apiHelperFunctions';

function Board() {
  const [assignments, assignmentsDispatch, createAssignmentsCallback] = useAssignmentsState();
  const assignmentList = useAssignmentsCreation({
    assignments,
    createAssignmentsCallback,
    assignmentsDispatch,
  });

  useEffect(() => {
    const getAssignments = async () => {
      const assignments = await apiController.getAssignments();
      assignments.forEach((assignment) =>
        createAssignmentsCallback(BoardPropertiesEnum.ADD, assignmentsDispatch)(assignment)
      );
    };
    getAssignments();
  }, []);

  return (
    <StyledBoard>
      <div>
        <ButtonPrimitive
          onClick={useMemo(
            () => () => {
              markRequest(assignments).then((isRequestSuccessful) => {
                if (isRequestSuccessful) {
                  createAssignmentsCallback(BoardPropertiesEnum.MARK, assignmentsDispatch)();
                }
              });
            },
            [assignments]
          )}
        >
          Mark all as done
        </ButtonPrimitive>
        <ButtonPrimitive
          onClick={useMemo(
            () => () => {
              deleteMarkedRequest(assignments).then((isRequestSuccessful) => {
                if (isRequestSuccessful) {
                  createAssignmentsCallback(
                    BoardPropertiesEnum.DELETEMARKED,
                    assignmentsDispatch
                  )();
                }
              });
            },
            [assignments]
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
