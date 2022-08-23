import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { GlobalDispatch } from '../../redux/store';

import { IAssignment } from '../../types/interfaces';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';

export type createAssignmentsCallbackType = <
  T extends ActionCreatorWithPayload<IAssignment, string> | ActionCreatorWithoutPayload<string>
>(
  action: T
) => T extends ActionCreatorWithoutPayload ? () => void : (arg: IAssignment) => void;

export default function useAssignmentsState(): createAssignmentsCallbackType {
  const assignmentsDispatch = useDispatch() as GlobalDispatch;

  return useCallback(
    <T extends ActionCreatorWithPayload<IAssignment, string> | ActionCreatorWithoutPayload>(
      action: T
    ): T extends ActionCreatorWithoutPayload ? () => void : (arg: IAssignment) => void => {
      return (arg?: IAssignment) => {
        assignmentsDispatch(action(arg as IAssignment));
      };
    },
    []
  );
}
