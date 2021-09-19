import { Injectable } from '@angular/core';
import { TODOS } from './mock-todos';
import { Todo } from './todos.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  /*
    기본적으로 Todo 배열은 Service에서 관리한다. 일단, 컴포넌트를 데이터를 직접 가져오거나
    직접저장하지 않는 것이 좋다. 컴포넌트는 오로지 데이터를 표시하는 것에만 집중하는 것이 좋다.
  */
  private _todos: Todo[] = TODOS;

  constructor() {}

  getTodos(): Todo[] {
    return this._todos;
  }

  addTodo(todo: Todo) {
    this._todos.push(todo);
  }

  editTodo(id: number, content: string) {
    const index = this._todos.findIndex((todo) => todo.id === id);
    this._todos[index].content = content;
  }

  deleteTodo(id: number) {
    const index = this._todos.findIndex((todo) => todo.id === id);
    this._todos.splice(index, 1);
  }

  /*
    생성한 To do의 할 일이 모두 끝났는지 확인한다.
  */
  setComplete(id: number) {
    const index = this._todos.findIndex((todo) => todo.id === id);
    this._todos[index].isComplete = true;
  }

  setNotComplete(id: number) {
    const todos = TODOS;
    const index = todos.findIndex((todo) => todo.id === id);
    todos[index].isComplete = false;
  }
}
