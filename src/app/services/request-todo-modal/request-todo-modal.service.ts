import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestTodoModalService {
  private modals: any[] = [];
  public command$: Subject<string> = new Subject();

  public add(modal: object): void {
    this.modals.push(modal);
  }

  public remove(id: string): void {
    this.modals = this.modals.filter((modal) => modal.id !== id);
  }

  public open(id: string): Subject<string> {
    const modal = this.modals.find((x) => x.id === id);
    modal.open();
    return this.command$;
  }

  public close(id: string): void {
    const modal = this.modals.find((x) => x.id === id);
    modal.close();
  }

  public getKindClassName(id: string): string {
    if (id === 'checkRequest') {
      return 'check';
    } else if (id === 'todoRequest') {
      return 'restore';
    } else if (id === 'editRequest') {
      return 'edit';
    } else if (id === 'deleteRequest') {
      return 'delete';
    }
    return '';
  }
}
