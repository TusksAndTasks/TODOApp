import { IAssignment, IAssignmentLite } from '../types/interfaces';
import RedactableAssigment from '../components/RedactableAssigment';
import FormRouter from './FormRouter';
import {
  StyledBoard,
  AssignmentTable,
  StyledButton,
  StyledLink,
} from '../styledComponents/styledComponents';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalDispatch, GlobalState } from '../reedux/store';
import {
  addAssignment,
  deleteAssignment,
  deleteMarkedAssignments,
  markAssignmentsAsDone,
  updateAssignment,
} from '../reedux/slices/AssignmentsSlice';

export default function Board() {
  const assignmentsDispatch = useDispatch() as GlobalDispatch;
  const assignments = useSelector((state: GlobalState) => state.assignments.assignments);

  function handleCreateSubmit(assignment: IAssignment) {
    assignmentsDispatch(addAssignment(assignment));
  }

  function handleUpdateSubmit(assignment: IAssignment) {
    assignmentsDispatch(updateAssignment(assignment));
  }

  function handleDeleteUpdate(assignment: IAssignmentLite) {
    assignmentsDispatch(deleteAssignment(assignment));
  }

  function markAsDone() {
    assignmentsDispatch(markAssignmentsAsDone());
  }

  function deleteMarked() {
    assignmentsDispatch(deleteMarkedAssignments());
  }

  function generateAssignments() {
    return assignments.map((assignment) => {
      return (
        <FormRouter onClick={handleUpdateSubmit} assignment={assignment} key={assignment.id}>
          <StyledLink
            to={{
              pathname: `assignment/${assignment.id}`,
            }}
            state={assignment}
          >
            <RedactableAssigment
              assignmentData={{ title: assignment.title, done: assignment.done, id: assignment.id }}
              handleDelete={handleDeleteUpdate}
            />
          </StyledLink>
        </FormRouter>
      );
    });
  }

  const assignmentList = generateAssignments();

  return (
    <StyledBoard>
      <div>
        <StyledButton onClick={() => markAsDone()}>Mark all as done</StyledButton>
        <StyledButton onClick={() => deleteMarked()}>Delete all completed tasks</StyledButton>
      </div>
      <AssignmentTable>{assignmentList}</AssignmentTable>
      <FormRouter onClick={handleCreateSubmit} />
    </StyledBoard>
  );
}
