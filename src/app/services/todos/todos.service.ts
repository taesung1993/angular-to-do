import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { take, map, catchError } from 'rxjs/operators';
import { Todo } from './todos.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  /*
    기본적으로 Todo 배열은 Service에서 관리한다. 일단, 컴포넌트를 데이터를 직접 가져오거나
    직접저장하지 않는 것이 좋다. 컴포넌트는 오로지 데이터를 표시하는 것에만 집중하는 것이 좋다.
  */
  public todos: Todo[] = [];

  constructor(private http: HttpClient) {}

  public getTodos(): void {
    const API_URL =
      'https://angular-todo-9e292-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json';
    this.http
      .get(API_URL)
      .pipe(
        take(1),
        map((data: any) => {
          const todos = [];

          for (const key of Object.keys(data)) {
            const { content, isComplete } = data[key];
            const todo = {
              id: key,
              content,
              isComplete,
            };
            todos.push(todo);
          }
          return todos;
        }),
        catchError((error: any) => {
          console.log('error', error);
          return of([]);
        })
      )
      .subscribe((result) => {
        this.todos = result;
      });
  }

  addTodo(todo: any) {
    this.todos.push(todo);
  }

  postTodo(todo: any) {
    const API_URL =
      'https://angular-todo-9e292-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json';

    return this.http.post(API_URL, todo).pipe(
      map((response: { name: string } | any) => {
        const id = response.name;
        return id;
      })
    );
  }

  editTodo(id: string, content: string) {
    const API_URL = `https://angular-todo-9e292-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${id}.json`;
    return this.http
      .patch(API_URL, { content })
      .pipe(map((result: { content: string } | any) => result.content));
  }

  deleteTodo(id: string) {
    const API_URL = `https://angular-todo-9e292-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${id}.json`;
    return this.http.delete(API_URL);
  }

  /*
    생성한 To do의 할 일이 모두 끝났는지 확인한다.
  */
  setComplete(id: string): Observable<boolean> {
    const API_URL = `https://angular-todo-9e292-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${id}.json`;
    return this.http
      .patch(API_URL, {
        isComplete: true,
      })
      .pipe(map((result: { isComplete: boolean } | any) => result.isComplete));
  }

  setNotComplete(id: string) {
    const API_URL = `https://angular-todo-9e292-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${id}.json`;
    return this.http
      .patch(API_URL, {
        isComplete: false,
      })
      .pipe(map((result: { isComplete: boolean } | any) => result.isComplete));
  }
}
