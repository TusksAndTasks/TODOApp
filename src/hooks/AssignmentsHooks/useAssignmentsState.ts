import React, { useCallback, useEffect, useReducer, useState } from 'react';

import { IAssignment } from '../../types/interfaces';
import { BoardPropertiesEnum, SingleChangeActionTypes } from '../../types/types';
import { IBoardAction } from './useAssignmentsCreation';
import { apiController } from '../../utils/api';

export type createAssignmentsCallbackType = <T extends BoardPropertiesEnum>(
  type: T,
  dispatch: React.Dispatch<IBoardAction>
) => T extends SingleChangeActionTypes ? (arg: IAssignment) => void : () => void;

type useAssignmentsReturns = [
  IAssignment[],
  React.Dispatch<IBoardAction>,
  createAssignmentsCallbackType
];

export default function useAssignmentsState(): useAssignmentsReturns {
  const [currentId, setCurrentId] = useState(10);

  function boardStateReducer(state: IAssignment[], action: IBoardAction): IAssignment[] {
    switch (action.type) {
      case BoardPropertiesEnum.ADD: {
        const id =
          (action.payload?.id as number) > -1 ? (action.payload as IAssignment).id : currentId;
        return [...state, { ...(action.payload as IAssignment), id }];
      }
      case BoardPropertiesEnum.UPDATE:
        return state.map((stateElem) => {
          if (stateElem.id === (action.payload as IAssignment).id) {
            return action.payload as IAssignment;
          }
          return stateElem;
        });
      case BoardPropertiesEnum.DELETE:
        return state.filter((stateElem) => stateElem.id !== (action.payload as IAssignment).id);
      case BoardPropertiesEnum.MARK:
        if (state.find((stateElem) => !stateElem.done)) {
          return state.map((stateElem) =>
            stateElem.done ? stateElem : { ...stateElem, done: true }
          );
        }
        return state;
      case BoardPropertiesEnum.DELETEMARKED:
        if (state.find((stateElem) => stateElem.done)) {
          return state.filter((stateELem) => !stateELem.done);
        }
        return state;
      default:
        return [...state];
    }
  }

  const [assignments, assignmentsDispatch] = useReducer(boardStateReducer, []);

  const createAssignmentsCallback = useCallback(
    <T extends BoardPropertiesEnum>(
      type: T,
      dispatch: React.Dispatch<IBoardAction>
    ): T extends SingleChangeActionTypes ? (arg: IAssignment) => void : () => void => {
      return (assignment?: IAssignment) => {
        const action = { type, payload: assignment };
        dispatch(action);
      };
    },
    []
  );

  function generateId() {
    setCurrentId((prevState) => prevState + 1);
  }

  useEffect(() => generateId(), [assignments]);

  return [assignments, assignmentsDispatch, createAssignmentsCallback];
}
