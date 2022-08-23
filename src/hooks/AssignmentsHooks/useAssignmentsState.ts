import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { GlobalDispatch } from '../../redux/store';

import { IAssignment } from '../../types/interfaces';
import { AsyncThunk } from '@reduxjs/toolkit';

export type createAssignmentsCallbackType = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends AsyncThunk<any, any, Record<string, never>>
>(
  action: T
) => T extends AsyncThunk<IAssignment | undefined, IAssignment, Record<string, never>>
  ? (arg: IAssignment) => void
  : (arg: IAssignment[]) => void;

export default function useAssignmentsState(): createAssignmentsCallbackType {
  const assignmentsDispatch = useDispatch() as GlobalDispatch;

  return useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <T extends AsyncThunk<any, IAssignment | IAssignment[], Record<string, never>>>(action: T) => {
      return (arg: IAssignment | IAssignment[]) => {
        assignmentsDispatch(
          action(
            arg as T extends AsyncThunk<IAssignment | undefined, IAssignment, Record<string, never>>
              ? IAssignment
              : IAssignment[]
          )
        );
      };
    },
    []
  );
}
