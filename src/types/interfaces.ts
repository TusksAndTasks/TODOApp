import React, { ReactNode } from 'react';
import { AssignmentPropertiesEnum } from './types';

export interface IAssignment extends IAssignmentData {
  id: number;
}

export interface IAssignmentData extends IDoableTasks {
  description: string;
  author: string;
  file: string;
}

export interface IAssignmentLite extends IDoableTasks {
  id: number;
}

export interface IDoableTasks {
  title: string;
  done: boolean;
}

export interface IRedactableAssignmentProps {
  assignmentData: IAssignmentLite;
  handleDelete: (assignment: IAssignmentLite) => void;
}

export interface IRouterProps {
  onClick: (arg: IAssignment) => void;
  children?: ReactNode;
  assignment?: IAssignment;
}

export interface IFormProps {
  assignment?: IAssignment;
  onSubmit: (arg: IAssignment) => void;
  toggleForm: () => void;
}

export interface IInputProps {
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

export interface IFormAction {
  type: AssignmentPropertiesEnum;
  payload: string | boolean | FileList | null;
}

export interface ILocation {
  pathname: string;
  state: IAssignment;
}
