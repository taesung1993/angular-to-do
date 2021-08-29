import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestTodoModalService {
  private modals: any[] = [];
  private todoRef: any;
  todoId: number = NaN;
  editTodoContent: string = '';

  add(modal: object) {
    this.modals.push(modal);
  }

  remove(id: string) {
    this.modals = this.modals.filter((modal) => modal.id !== id);
  }

  open(id: string, todoId: number): void {
    this.todoId = todoId;
    const modal = this.modals.find((x) => x.id === id);
    modal.open();
  }

  setEditTodoContent(content: string): void {
    this.editTodoContent = content;
  }

  setTodoRef(el: object): void {
    this.todoRef = el;
  }

  getTodoRef(): any {
    return this.todoRef;
  }

  getTodoId(): number {
    return this.todoId;
  }

  getEditTodoContent(): string {
    return this.editTodoContent;
  }

  close(id: string): void {
    const modal = this.modals.find((x) => x.id === id);
    modal.close();
  }

  getKindClassName(id: string): string {
    if (id === 'checkRequest') {
      return 'check';
    } else if (id === 'todoRequest') {
      return 'restore';
    } else if (id === 'editRequest') {
      return 'edit';
    } else if (id === 'deleteRequest') {
      console.log(id);
      return 'delete';
    }
    return '';
  }
}
