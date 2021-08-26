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

  addTodo(todo: Todo) {
    const todos = TODOS;
    todos.push(todo);
    return todos;
  }

  deleteTodo(id: number) {
    const todos = TODOS;
    return todos.filter((todo) => todo.id !== id);
  }

  editTodo(id: number, content: string) {
    const todos = TODOS;
    const index = todos.findIndex((todo) => todo.id === id);
    todos[index].content = content;
    return todos;
  }
}
