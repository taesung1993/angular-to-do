import { Component, OnInit } from '@angular/core';
import { Todo } from '../../services/todos/todos.model';
import { TodosService } from '../../services/todos/todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  // public todos: Todo[] = [];
  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.todosService.getTodos();
  }

  get todos(): Todo[] {
    return this.todosService.todos;
  }
}
