import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RequestTodoModalService } from 'src/app/services/request-todo-modal/request-todo-modal.service';
import { take, first, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo = '';
  @Input() id = NaN;
  @Input() isComplete = false;
  @Output() deleteTodo = new EventEmitter<number>();
  @Output() editTodo = new EventEmitter<Object>();
  @Output() setTodoComplete = new EventEmitter<number>();
  @Output() setTodoNotComplete = new EventEmitter<number>();

  todoForm = new FormGroup({
    todo: new FormControl(''),
  });

  editorToggle: boolean = false;

  constructor(private requestTodoModalService: RequestTodoModalService) {}

  ngOnInit(): void {
    this.todoForm.setValue({
      todo: this.todo,
    });
  }

  openModal(modalId: string) {
    this.requestTodoModalService
      .open(modalId)
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
        this.requestTodoModalService.close(modalId);
      });
  }

  todoIsComplete(id: number): void {
    this.setTodoComplete.emit(id);
  }

  todoIsNotComplete(id: number): void {
    this.setTodoNotComplete.emit(id);
  }

  delete(id: number): void {
    this.deleteTodo.emit(id);
  }

  ctrlToggleEditor(): void {
    this.editorToggle = !this.editorToggle;
  }

  onEditTodo(): void {
    const todo = {
      id: this.id,
      content: this.todoForm.value.todo,
    };

    this.editTodo.emit(todo);
    this.editorToggle = false;
  }
}
