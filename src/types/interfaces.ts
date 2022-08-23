export interface IAssignment extends IAssignmentData {
  id: number;
}

export interface IAssignmentData extends IDoableTasks {
  description: string;
  author: string;
  file: string;
}

export interface IDoableTasks {
  title: string;
  done: boolean;
}

export enum InputTypes {
  TEXT = 'TEXT',
  CHECKBOX = 'CHECKBOX',
  SUBMIT = 'SUBMIT',
  FILE = 'FILE',
}
