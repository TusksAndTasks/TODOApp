import { IAssignment, ITodo } from '../types/interfaces';

class ApiController {
  constructor() {
    this.#baseURL = 'https://jsonplaceholder.typicode.com/todos';
  }

  #baseURL: string;

  async #getTodos() {
    const response = await fetch(this.#baseURL);
    if (response.ok) {
      return await response.json();
    }
  }

  #convertToTODO(assignment: IAssignment) {
    return {
      userId: 'test',
      id: assignment.id,
      title: assignment.title,
      completed: assignment.done,
    };
  }

  async getAssignments() {
    const allTodos = (await this.#getTodos()) as ITodo[];
    const todos = allTodos.slice(0, 10);

    return todos.map((todo) => {
      return {
        done: todo.completed,
        id: todo.id,
        title: todo.title,
        description: 'placeholder',
      };
    });
  }

  async createAssignment(assignment: IAssignment) {
    const todo = this.#convertToTODO(assignment);

    const response = await fetch(this.#baseURL, {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response.ok) {
      return true;
    }
  }

  async updateAssignment(assignment: IAssignment) {
    const todo = this.#convertToTODO(assignment);

    const response = await fetch(`${this.#baseURL}/${assignment.id}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response.ok) {
      return true;
    }
  }

  async deleteAssignment(assignmentId: number) {
    const response = await fetch(`${this.#baseURL}/${assignmentId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return true;
    }
  }
}

export const apiController = new ApiController();
