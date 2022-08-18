import React from 'react';

import { ButtonPrimitive } from '../primitives/ButtonPrimitive';

import RedactableAssigment from './RedactableAssigment';
import FormRouter from './FormRouter';

import { EmptyProperty } from '../types/types';
import { IAssignment, IBoardState } from '../types/interfaces';
import { apiController } from '../utils/api';

export default class Board extends React.Component<EmptyProperty, IBoardState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      assignments: [] as IAssignment[],
      currentId: 100,
    };
  }

  shouldComponentUpdate(nextProp: EmptyProperty, nextState: IBoardState) {
    return !(
      nextState.currentId !== this.state.currentId &&
      nextState.assignments.length === this.state.assignments.length
    );
  }

  async componentDidMount() {
    const assignments = await apiController.getAssignments();

    this.changeState(assignments);
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

  async createAssignment(assignment: IAssignment) {
    const indexedAssignment = { ...assignment, id: this.state.currentId };

    const response = await apiController.createAssignment(indexedAssignment);
    if (response) {
      return [...this.state.assignments, indexedAssignment];
    }
  }

  async updateAssigment(assignment: IAssignment) {
    const response = await apiController.updateAssignment(assignment);
    if (response) {
      return this.state.assignments.map((stateElem) => {
        if (stateElem.id === assignment.id) {
          return assignment;
        } else {
          return stateElem;
        }
      }) as IAssignment[];
    }
  }

  async deleteAssignment(assignments: IAssignment[], id: number) {
    const response = await apiController.deleteAssignment(id);
    if (response) {
      return assignments.filter((stateElem) => {
        if (stateElem.id !== id) {
          return stateElem;
        }
      }) as IAssignment[];
    }
  }

  handleCreateSubmit = async (assignment: IAssignment) => {
    const appendableAssignments = await this.createAssignment(assignment);
    if (appendableAssignments) {
      this.changeState(appendableAssignments);
    }
  };

  handleUpdateSubmit = async (assignment: IAssignment) => {
    const appendableAssignments = await this.updateAssigment(assignment);
    if (appendableAssignments) {
      this.changeState(appendableAssignments);
    }
  };

  handleDeleteUpdate = async (assignment: IAssignment) => {
    const appendableAssignments = await this.deleteAssignment(
      this.state.assignments,
      assignment.id
    );
    if (appendableAssignments) {
      this.changeState(appendableAssignments);
    }
  };

  markAsDone = async () => {
    const markedAssignments = await Promise.all(
      this.state.assignments.map(async (assignment) => {
        const doneAssignment = {
          ...assignment,
          done: true,
        };

        const response = await this.updateAssigment(doneAssignment);
        if (response) {
          return doneAssignment;
        } else {
          throw new Error(`Server error: unable to mark ${doneAssignment.id}-assignment as done`);
        }
      })
    );
    this.changeState(markedAssignments);
  };

  deleteMarked = async () => {
    const doneTasks = this.state.assignments.filter((assignment: IAssignment) => assignment.done);

    const newArr = await doneTasks.reduce(async (previousValue, currentValue) => {
      const arr = await this.deleteAssignment(await previousValue, currentValue.id);
      if (arr) {
        return arr;
      }
      return previousValue;
    }, Promise.resolve(this.state.assignments.slice()));

    this.changeState(newArr);

    // const response = await Promise.all(
    //   doneTasks.map((task) => apiController.deleteAssignment(task.id))
    // );
    //
    // if (response) {
    //   const undoneTasks = this.state.assignments.filter(
    //     (assignment: IAssignment) => !assignment.done
    //   );
    //   this.changeState(undoneTasks);
    // }
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
