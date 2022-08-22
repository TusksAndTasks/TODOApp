export interface IAssignment extends IAssignmentData {
  id: number;
}

export interface IAssignmentData extends IDoableTasks {
  title: string;
  description: string;
  author: string;
}

export interface IDoableTasks {
  done: boolean;
}

export enum InputTypes {
  text = 'text',
  checkbox = 'checkbox',
  submit = 'submit',
}
