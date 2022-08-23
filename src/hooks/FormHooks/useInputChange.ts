import React, { useCallback, useReducer } from 'react';

import { IAssignmentData } from '../../types/interfaces';

export interface IInputAction {
  type: AssignmentPropertiesEnum;
  payload: string | boolean | FileList | null;
}

export enum AssignmentPropertiesEnum {
  TITLE = 'titleChange',
  DESCRIPTION = 'descriptionChange',
  DONE = 'doneChange',
  AUTHOR = 'authorChange',
  FILE = 'fileChange',
}

export default function useInputChange(
  initialInputsState: IAssignmentData
): [IAssignmentData, (e: React.ChangeEvent<HTMLInputElement>) => void] {
  function inputReducer(state: IAssignmentData, action: IInputAction): IAssignmentData {
    switch (action.type) {
      case AssignmentPropertiesEnum.TITLE:
        return { ...state, title: action.payload as string };
      case AssignmentPropertiesEnum.DONE:
        return { ...state, done: action.payload as boolean };
      case AssignmentPropertiesEnum.DESCRIPTION:
        return { ...state, description: action.payload as string };
      case AssignmentPropertiesEnum.AUTHOR:
        return { ...state, author: action.payload as string };
      case AssignmentPropertiesEnum.FILE:
        return { ...state, file: action.payload as string };
      default:
        return { ...state };
    }
  }

  const [inputsState, inputsDispatch] = useReducer(inputReducer, initialInputsState);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name } = e.target;
    let value = e.target[valueTypeMap[name as keyof IAssignmentData]];
    if (name === 'file') {
      value = value ? URL.createObjectURL((value as FileList)[0]) : '';
    }
    inputsDispatch({ type: `${name}Change` as AssignmentPropertiesEnum, payload: value });
  }, []);

  return [inputsState, handleInput];
}

const valueTypeMap: Record<keyof IAssignmentData, 'value' | 'checked' | 'files'> = {
  title: 'value',
  description: 'value',
  done: 'checked',
  author: 'value',
  file: 'files',
};
