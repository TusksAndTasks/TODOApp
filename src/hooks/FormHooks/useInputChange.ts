import React, { useCallback, useReducer } from 'react';

import { IAssignmentData } from '../../types/interfaces';

export interface IInputAction {
  type: AssignmentPropertiesEnum;
  payload: string | boolean;
}

export enum AssignmentPropertiesEnum {
  TITLE = 'titleChange',
  DESCRIPTION = 'descriptionChange',
  DONE = 'doneChange',
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
      default:
        return { ...state };
    }
  }

  const [inputsState, inputsDispatch] = useReducer(inputReducer, initialInputsState);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
    inputsDispatch({ type: `${name}Change` as AssignmentPropertiesEnum, payload: value });
  }, []);

  return [inputsState, handleInput];
}
