import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { RequestTodoModalService } from 'src/app/services/request-todo-modal/request-todo-modal.service';
import { TodosService } from 'src/app/services/todos/todos.service';

@Component({
  selector: 'app-request-todo-modal',
  templateUrl: './ruquest-todo-modal.component.html',
  styleUrls: ['./request-todo-modal.component.scss'],
})
export class RequestTodoModal implements OnInit {
  @Input() id: string = '';
  private element: any;

  constructor(
    private requestTodoModalService: RequestTodoModalService,
    private todosService: TodosService,
    private el: ElementRef
  ) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    const backdrop = this.element.querySelector('.backdrop');
    const kindClass = this.requestTodoModalService.getKindClassName(this.id);

    this.element.classList.add(kindClass);
    this.attachElementToBody(this.element);
    backdrop.addEventListener('click', (event: Event) => {
      this.close();
    });
    this.requestTodoModalService.add(this);
  }

  ngOnDestroy(): void {
    this.requestTodoModalService.remove(this.id);
    this.element.remove();
  }

  private attachElementToBody(el: HTMLElement): void {
    document.body.appendChild(el);
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  implementCommand(): void {
    const todoId = this.requestTodoModalService.getTodoId();
    const command = this.id;

    switch (command) {
      case 'checkRequest':
        this.todosService.setComplete(todoId);
        break;
      case 'todoRequest':
        this.todosService.setNotComplete(todoId);
        break;
      case 'editRequest':
        const todoRef = this.requestTodoModalService.getTodoRef();
        todoRef.onEditTodo();
        this.requestTodoModalService.setTodoRef({});
        break;
      case 'deleteRequest':
        this.todosService.deleteTodo(todoId);
        break;
    }

    this.close();
  }
}
