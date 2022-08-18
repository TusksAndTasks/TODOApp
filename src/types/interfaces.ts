import React, { ReactNode } from 'react';

import { colors } from '../themes/colors';
import { fontSizes } from '../themes/fontSizes';

export interface IAssignment extends IAssignmentData {
  id: number;
}

export interface IAssignmentData extends IDoableTasks {
  title: string;
  description: string;
}

export interface IDoableTasks {
  done: boolean;
}

export interface IFormState {
  assignmentData: IAssignment;
  isValid: boolean;
  error: IValidationError;
}

export interface IValidationError {
  isActive: boolean;
  errorMessage: string;
}

export interface IBoardState {
  assignments: IAssignment[];
  currentId: number;
}

export interface IRedactableAssignmentProps {
  assignmentData: IAssignment;
  handleDelete: (assignment: IAssignment) => void;
}

export interface IRouterState {
  isOpen: boolean;
}

export interface IRouterProps {
  onClick: (arg: IAssignment) => void;
  children?: ReactNode;
  assigment?: IAssignment;
}

export interface IFormProps {
  assigment?: IAssignment;
  onSubmit: (arg: IAssignment) => void;
  toggleForm: () => void;
}

export enum InputTypes {
  text = 'text',
  checkbox = 'checkbox',
  submit = 'submit',
}

export interface IInputProps {
  type: InputTypes;
  value: string | boolean;
  name?: string;
  id?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void | (() => void);
}

export interface ITypographyProps {
  children: React.ReactNode;
  as?: keyof HTMLElementTagNameMap;
  className?: string;
  color?: colors;
  fontSize?: fontSizes;
  additionalProps?: { [key: string]: string };
}

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
