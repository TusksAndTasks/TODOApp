import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  apiCreateAssignments,
  apiDeleteAssignments,
  apiDeleteMarked,
  apiMarkAsDone,
  apiUpdateAssignments,
  getTodos,
} from '../middleware/AssignmentsSliceThunks';

import { IAssignment } from '../../types/interfaces';

const initialState: {
  assignments: Array<IAssignment>;
  isLoading: boolean;
} = { assignments: [], isLoading: false };

const assignmentSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    addAssignment: (state, action: PayloadAction<IAssignment>) => {
      state.assignments.push({
        ...action.payload,
        id: action.payload.id > -1 ? action.payload.id : Date.now(),
      });
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
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      action.payload.forEach((assignment) =>
        assignmentSlice.caseReducers.addAssignment(state, {
          payload: assignment,
          type: 'assignments/addAssignment',
        })
      );
      state.isLoading = false;
    });
    builder.addCase(getTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTodos.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(apiCreateAssignments.fulfilled, (state, action) => {
      assignmentSlice.caseReducers.addAssignment(state, {
        payload: action.payload as IAssignment,
        type: 'assignments/addAssignment',
      });
    });
    builder.addCase(apiUpdateAssignments.fulfilled, (state, action) => {
      assignmentSlice.caseReducers.updateAssignment(state, {
        payload: action.payload as IAssignment,
        type: 'assignments/updateAssignment',
      });
    });
    builder.addCase(apiDeleteAssignments.fulfilled, (state, action) => {
      assignmentSlice.caseReducers.deleteAssignment(state, {
        payload: action.payload as IAssignment,
        type: 'assignments/deleteAssignment',
      });
    });
    builder.addCase(apiMarkAsDone.fulfilled, (state) => {
      assignmentSlice.caseReducers.markAssignmentsAsDone(state);
    });
    builder.addCase(apiDeleteMarked.fulfilled, (state) => {
      assignmentSlice.caseReducers.deleteMarkedAssignments(state);
    });
  },
});

export const assignmentReducer = assignmentSlice.reducer;

export {
  getTodos,
  apiCreateAssignments,
  apiUpdateAssignments,
  apiDeleteAssignments,
  apiMarkAsDone,
  apiDeleteMarked,
};
