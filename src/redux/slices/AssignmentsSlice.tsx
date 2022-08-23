import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAssignment } from '../../types/interfaces';

const initialState: {
  assignments: Array<IAssignment>;
} = { assignments: [] };

const assignmentSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    addAssignment: (state, action: PayloadAction<IAssignment>) => {
      state.assignments.push({ ...action.payload, id: Date.now() });
    },
    updateAssignment: (state, action: PayloadAction<IAssignment>) => {
      state.assignments = state.assignments.map((stateElem) => {
        if (stateElem.id === action.payload.id) {
          return action.payload;
        }
        return stateElem;
      });
    },
    deleteAssignment: (state, action: PayloadAction<IAssignment>) => {
      state.assignments = state.assignments.filter(
        (stateElem) => stateElem.id !== action.payload.id
      );
    },
    markAssignmentsAsDone: (state) => {
      if (state.assignments.find((stateElem) => !stateElem.done)) {
        state.assignments = state.assignments.map((stateElem) => {
          return { ...stateElem, done: true };
        });
      }
    },
    deleteMarkedAssignments: (state) => {
      if (state.assignments.find((stateElem) => stateElem.done)) {
        state.assignments = state.assignments.filter((stateElem) => !stateElem.done);
      }
    },
  },
});

export const assignmentReducer = assignmentSlice.reducer;
export const {
  addAssignment,
  updateAssignment,
  deleteAssignment,
  markAssignmentsAsDone,
  deleteMarkedAssignments,
} = assignmentSlice.actions;
