import { Component, OnInit } from '@angular/core';
import { Todo } from '../../services/todos/todos.model';
import { TodosService } from '../../services/todos/todos.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.todos = this.todosService.getTodos();
    console.log('To do list', this.todos);
  }
}
