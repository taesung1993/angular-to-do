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
  }

  deleteTodo(id: number) {
    const todos = TODOS;
    const index = todos.findIndex((todo) => todo.id === id);
    todos.splice(index, 1);
  }

  setComplete(id: number) {
    const todos = TODOS;
    const index = todos.findIndex((todo) => todo.id === id);
    todos[index].isComplete = true;
  }

  setNotComplete(id: number) {
    const todos = TODOS;
    const index = todos.findIndex((todo) => todo.id === id);
    todos[index].isComplete = false;
  }

  editTodo(id: number, content: string) {
    const todos = TODOS;
    const index = todos.findIndex((todo) => todo.id === id);
    todos[index].content = content;
  }
}
