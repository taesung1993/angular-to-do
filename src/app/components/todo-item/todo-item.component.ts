import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestTodoModalService } from 'src/app/services/request-todo-modal/request-todo-modal.service';
import { take } from 'rxjs/operators';
import { TodosService } from 'src/app/services/todos/todos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: string;
  @Input() id!: number;
  @Input() isComplete!: boolean;
  public subscription!: Subscription | undefined;
  public todoForm!: FormGroup;

  editorToggle: boolean = false;

  constructor(
    private requestTodoModalService: RequestTodoModalService,
    private todoService: TodosService
  ) {}

  ngOnInit(): void {
    this.todoForm = new FormGroup({
      todo: new FormControl('', [Validators.required]),
    });
  }

  openModal(modalId: string) {
    this.requestTodoModalService
      .open(modalId)
      .pipe(take(1))
      .subscribe((response) => {
        const command = response;
        switch (command) {
          case 'checkRequest':
            this.todoService.setComplete(this.id);
            break;
          case 'todoRequest':
            this.todoService.setNotComplete(this.id);
            break;
          case 'editRequest':
            const content = this.todoForm.value.todo;
            this.todoService.editTodo(this.id, content);
            this.ctrlToggleEditor();
            break;
          case 'deleteRequest':
            this.todoService.deleteTodo(this.id);
            break;
        }
        this.requestTodoModalService.close(modalId);
      });
  }

  ctrlToggleEditor(): void {
    this.editorToggle = !this.editorToggle;

    if (this.editorToggle) {
      this.todoForm.setValue({ todo: this.todo }, { emitEvent: false });
    } else {
      this.todoForm = new FormGroup({
        todo: new FormControl('', [Validators.required]),
      });
    }
  }
}
