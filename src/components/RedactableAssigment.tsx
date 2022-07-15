import React from 'react';
import { IRedactableAssignmentProps } from '../types/interfaces';

export default class RedactableAssigment extends React.Component<IRedactableAssignmentProps> {
  render() {
    const { title, description, done } = this.props.assignmentData;
    return (
      <div className="assignment">
        <button onClick={() => this.props.handleDelete(this.props.assignmentData)}>Delete</button>
        <h2 className={done ? 'done' : 'undone'}>{title}</h2>
        <p className={done ? 'done' : 'undone'}>{description}</p>
        <p>{done ? 'done' : 'undone'}</p>
      </div>
    );
  }
}
