import React, { ReactNode } from 'react';
import { AssignmentPropertiesEnum, BoardPropertiesEnum } from './types';

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
  assignment?: IAssignment;
  onSubmit: (arg: IAssignment) => void;
  toggleForm: () => void;
  // onSubmit: (arg: IAssignment) => void;
}

export interface IInputProps {
  // type: string;
  id: string;
  name: string;
  value: string | boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ISubmitForm {
  onSubmit: (arg: IAssignment) => void;
  submitData: IAssignment;
  isValid: boolean;
}

export interface IAction {
  type: AssignmentPropertiesEnum;
  payload: string | boolean;
}

export interface IBoardAction {
  type: BoardPropertiesEnum;
  payload?: IAssignment;
}
