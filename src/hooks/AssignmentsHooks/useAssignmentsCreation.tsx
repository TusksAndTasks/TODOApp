import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import FormRouter from '../../components/FormRouter';
import RedactableAssigment from '../../components/RedactableAssigment';

import { createAssignmentsCallbackType } from './useAssignmentsState';
import { deleteAssignment, updateAssignment } from '../../redux/slices/AssignmentsSlice';
import { GlobalState } from '../../redux/store';

export default function useAssignmentsCreation(
  createAssignmentsCallback: createAssignmentsCallbackType
) {
  const assignments = useSelector((state: GlobalState) => state.assignments.assignments);
  const updateAssignmentCallback = useMemo(() => createAssignmentsCallback(updateAssignment), []);
  const deleteAssignmentCallback = useMemo(() => createAssignmentsCallback(deleteAssignment), []);

  function generateAssignments() {
    return assignments.map((assignment) => {
      return (
        <FormRouter onClick={updateAssignmentCallback} assignment={assignment} key={assignment.id}>
          <StyledLink to={`assignment/${assignment.id}`} state={assignment}>
            <RedactableAssigment
              assignmentData={assignment}
              handleDelete={deleteAssignmentCallback}
            />
          </StyledLink>
        </FormRouter>
      );
    });
  }

  return useMemo(() => generateAssignments(), [assignments]);
}

export const StyledLink = styled(React.memo(Link))`
  text-decoration: inherit;
  color: inherit;

  &:hover {
    cursor: pointer;
  }
`;
