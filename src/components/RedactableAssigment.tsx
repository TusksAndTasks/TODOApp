import React from 'react';

import { ButtonPrimitive } from '../primitives/ButtonPrimitive';
import { Typography } from '../primitives/Typography';

import { colors } from '../themes/colors';

import { IRedactableAssignmentProps } from '../types/interfaces';

export default class RedactableAssigment extends React.Component<IRedactableAssignmentProps> {
  shouldComponentUpdate(nextProps: Readonly<IRedactableAssignmentProps>): boolean {
    return nextProps.assignmentData.done !== this.props.assignmentData.done;
  }

  render() {
    const { title, description, done } = this.props.assignmentData;
    return (
      <div className="assignment">
        <ButtonPrimitive
          className="button-like"
          onClick={() => this.props.handleDelete(this.props.assignmentData)}
        >
          Delete
        </ButtonPrimitive>
        <Typography as="h2" color={done ? colors.BLUE : colors.PURPLE}>
          {title}
        </Typography>
        <Typography as="p" color={done ? colors.BLUE : colors.PURPLE}>
          {description}
        </Typography>
        <Typography as="p">{done ? 'done' : 'undone'}</Typography>
      </div>
    );
  }
}
