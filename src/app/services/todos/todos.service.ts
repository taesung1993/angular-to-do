import { Injectable } from '@angular/core';
import { TODOS } from './mock-todos';
import { Todo } from './todos.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor() {}

  getTodos(): Todo[] {
    return TODOS;
  }

  deleteTodo(id: number) {
    const todos = TODOS;
    return todos.filter((todo) => todo.id !== id);
  }
}
