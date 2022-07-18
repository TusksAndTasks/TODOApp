import React, { useEffect, useReducer, useState } from 'react';
import { IAssignment, IBoardAction } from '../types/interfaces';
import { BoardPropertiesEnum } from '../types/types';
import RedactableAssigment from '../components/RedactableAssigment';
import FormRouter from './FormRouter';

export default function Board() {
  const [currentId, setCurrentId] = useState(0);

  function boardStateReducer(state: IAssignment[], action: IBoardAction): IAssignment[] {
    switch (action.type) {
      case BoardPropertiesEnum.ADD:
        return [...state, { ...(action.payload as IAssignment), id: currentId }];
      case BoardPropertiesEnum.UPDATE:
        return state.map((stateElem) => {
          if (stateElem.id === (action.payload as IAssignment).id) {
            return action.payload as IAssignment;
          } else {
            return stateElem;
          }
        });
      case BoardPropertiesEnum.DELETE:
        return state.filter((stateElem) => stateElem.id !== (action.payload as IAssignment).id);
      case BoardPropertiesEnum.MARK:
        return state.map((stateELem) => ({ ...stateELem, done: true }));
      case BoardPropertiesEnum.DELETEMARKED:
        return state.filter((stateELem) => !stateELem.done);
      default:
        return [...state];
    }
  }

  const [assignments, assignmentsDispatch] = useReducer(boardStateReducer, []);

  useEffect(() => generateId(), [assignments]);

  function generateId() {
    setCurrentId((prevState) => prevState + 1);
  }

  function handleCreateSubmit(assignment: IAssignment) {
    assignmentsDispatch({ type: BoardPropertiesEnum.ADD, payload: assignment });
  }

  function handleUpdateSubmit(assignment: IAssignment) {
    assignmentsDispatch({ type: BoardPropertiesEnum.UPDATE, payload: assignment });
  }

  function handleDeleteUpdate(assignment: IAssignment) {
    assignmentsDispatch({ type: BoardPropertiesEnum.DELETE, payload: assignment });
  }

  function markAsDone() {
    assignmentsDispatch({ type: BoardPropertiesEnum.MARK });
  }

  function deleteMarked() {
    assignmentsDispatch({ type: BoardPropertiesEnum.DELETEMARKED });
  }

  function generateAssignments() {
    return assignments.map((assignment) => {
      return (
        <FormRouter onClick={handleUpdateSubmit} assigment={assignment} key={assignment.id}>
          <RedactableAssigment assignmentData={assignment} handleDelete={handleDeleteUpdate} />
        </FormRouter>
      );
    });
  }

  const assignmentList = generateAssignments();

  return (
    <main>
      <div>
        <button onClick={() => markAsDone()}>Mark all as done</button>
        <button onClick={() => deleteMarked()}>Delete all completed tasks</button>
      </div>
      <section className="assignment-table">{assignmentList}</section>
      <FormRouter onClick={handleCreateSubmit} />
    </main>
  );
}
