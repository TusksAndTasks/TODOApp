import { IAssignment } from '../../types/interfaces';
import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  assignments: Array<IAssignment>;
} = { assignments: [] };

const assignmentSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      state.assignments.push({ ...action.payload, id: Date.now() });
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((stateElem) => {
        if (stateElem.id === action.payload.id) {
          return action.payload;
        } else {
          return stateElem;
        }
      });
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (stateElem) => stateElem.id !== action.payload.id
      );
    },
    markAssignmentsAsDone: (state) => {
      state.assignments = state.assignments.map((stateElem) => {
        return { ...stateElem, done: true };
      });
    },
    deleteMarkedAssignments: (state) => {
      state.assignments = state.assignments.filter((stateElem) => !stateElem.done);
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
