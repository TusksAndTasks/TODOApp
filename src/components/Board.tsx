import React from 'react';

import { ButtonPrimitive } from '../primitives/ButtonPrimitive';

import RedactableAssigment from './RedactableAssigment';
import FormRouter from './FormRouter';

import { EmptyProperty } from '../types/types';
import { IAssignment, IBoardState } from '../types/interfaces';

export default class Board extends React.Component<EmptyProperty, IBoardState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      assignments: [] as IAssignment[],
      currentId: 0,
    };
  }

  shouldComponentUpdate(nextProp: EmptyProperty, nextState: IBoardState) {
    return !(
      nextState.currentId !== this.state.currentId &&
      nextState.assignments.length === this.state.assignments.length
    );
  }

  componentDidUpdate() {
    this.generateId();
  }

  generateId = () => {
    this.setState((state) => ({ ...state, currentId: state.currentId + 1 }));
  };

  changeState(appendableAssignments: IAssignment[]) {
    this.setState((state) => {
      return { ...state, assignments: [...appendableAssignments] };
    });
  }

  createAssignment(assignment: IAssignment) {
    return [...this.state.assignments, { ...assignment, id: this.state.currentId }];
  }

  updateAssigment(assignment: IAssignment) {
    return this.state.assignments.map((stateElem) => {
      if (stateElem.id === assignment.id) {
        return assignment;
      } else {
        return stateElem;
      }
    }) as IAssignment[];
  }

  deleteAssignment(assignments: IAssignment[], id: number) {
    return assignments.filter((stateElem) => {
      if (stateElem.id !== id) {
        return stateElem;
      }
    }) as IAssignment[];
  }

  handleCreateSubmit = (assignment: IAssignment) => {
    const appendableAssignments = this.createAssignment(assignment);
    this.changeState(appendableAssignments);
  };

  handleUpdateSubmit = (assignment: IAssignment) => {
    const appendableAssignments = this.updateAssigment(assignment);
    this.changeState(appendableAssignments);
  };

  handleDeleteUpdate = (assignment: IAssignment) => {
    const appendableAssignments = this.deleteAssignment(this.state.assignments, assignment.id);
    this.changeState(appendableAssignments);
  };

  markAsDone = () => {
    const markedAssignments = this.state.assignments.map((assignment) => ({
      ...assignment,
      done: true,
    }));
    this.changeState(markedAssignments);
  };

  deleteMarked = () => {
    const doneTasks = this.state.assignments.filter((assignment: IAssignment) => !assignment.done);
    this.changeState(doneTasks);
  };

  generateAssignments = () => {
    return this.state.assignments.map((assignment) => {
      return (
        <FormRouter onClick={this.handleUpdateSubmit} assigment={assignment} key={assignment.id}>
          <RedactableAssigment assignmentData={assignment} handleDelete={this.handleDeleteUpdate} />
        </FormRouter>
      );
    });
  };

  render() {
    const assignmentList = this.generateAssignments();
    return (
      <main>
        <div>
          <ButtonPrimitive className="button-like" onClick={this.markAsDone}>
            Mark all as done
          </ButtonPrimitive>
          <ButtonPrimitive className="button-like" onClick={this.deleteMarked}>
            Delete all completed tasks
          </ButtonPrimitive>
        </div>
        <section className="assignment-table">{assignmentList}</section>
        <FormRouter onClick={this.handleCreateSubmit} />
      </main>
    );
  }
}
