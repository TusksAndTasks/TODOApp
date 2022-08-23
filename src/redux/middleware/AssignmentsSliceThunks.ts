import { createAsyncThunk } from '@reduxjs/toolkit';

import { IAssignment } from '../../types/interfaces';

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const baseURL = 'https://jsonplaceholder.typicode.com/todos';

const convertToAssignments = (allTodos: ITodo[]) => {
  const todos = allTodos.slice(0, 10);

  return todos.map((todo) => {
    return {
      id: todo.id,
      title: todo.title,
      description: 'placeholder',
      done: todo.completed,
      author: 'placeholder',
      file: '',
    };
  });
};

const convertToTODO = (assignment: IAssignment) => {
  return {
    userId: 'test',
    id: assignment.id,
    title: assignment.title,
    completed: assignment.done,
  };
};

export const getTodos = createAsyncThunk('assignments/getTodos', async () => {
  const response = await fetch(baseURL);
  if (response.ok) {
    const todos = await response.json();
    return convertToAssignments(todos);
  }
  throw new Error('Something is wrong');
});

export const apiCreateAssignments = createAsyncThunk(
  'assignments/apiCreateAssignments',
  async (assignment: IAssignment, { rejectWithValue }) => {
    const todo = convertToTODO(assignment);

    const response = await fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response.ok) {
      return assignment;
    }
    rejectWithValue(response.status);
  }
);

export const apiUpdateAssignments = createAsyncThunk(
  'assignments/apiUpdateAssignments',
  async (assignment: IAssignment, { rejectWithValue }) => {
    const todo = convertToTODO(assignment);
    //Тут пришлось вставить слайс потому что джсон-плейсхолдер не работает корректно с id, которые больше, чем то, что у него представлено в списке TODO.
    const response = await fetch(`${baseURL}/${assignment.id.toString().slice(0, 1)}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response.ok) {
      return assignment;
    }
    rejectWithValue(response.status);
  }
);

export const apiDeleteAssignments = createAsyncThunk(
  'assignments/apiDeleteAssignments',
  async (assignment: IAssignment, { rejectWithValue }) => {
    const response = await fetch(`${baseURL}/${assignment.id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return assignment;
    }
    rejectWithValue(response.status);
  }
);

export const apiMarkAsDone = createAsyncThunk(
  'assignments/apiMarkAsDone',
  async (assignments: IAssignment[], { rejectWithValue }) => {
    const markElems = assignments.filter((assignment) => !assignment.done);
    const response = await Promise.all(
      markElems.map(async (assignment) => {
        const todo = convertToTODO(assignment);
        await fetch(`${baseURL}/${assignment.id}`, {
          method: 'PUT',
          body: JSON.stringify(todo),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
      })
    );
    if (response.find((res) => res === undefined)) {
      rejectWithValue(response);
    }
  }
);

export const apiDeleteMarked = createAsyncThunk(
  'assignments/deleteMarked',
  async (assignments: IAssignment[], { rejectWithValue }) => {
    const markElems = assignments.filter((assignment) => assignment.done);
    const response = await Promise.all(
      markElems.map(async (assignment) => {
        await fetch(`${baseURL}/${assignment.id}`, {
          method: 'DELETE',
        });
      })
    );
    if (response.find((res) => res === undefined)) {
      rejectWithValue(response);
    }
  }
);
