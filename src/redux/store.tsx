import { configureStore } from '@reduxjs/toolkit';

import { assignmentReducer } from './slices/AssignmentsSlice';
import { authorizationReducer } from './slices/AuthorizationSlice';

export const store = configureStore({
  reducer: {
    assignments: assignmentReducer,
    authorization: authorizationReducer,
  },
});

export type GlobalState = ReturnType<typeof store.getState>;
export type GlobalDispatch = typeof store.dispatch;
