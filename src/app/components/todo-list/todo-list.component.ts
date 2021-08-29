import { Component, OnInit } from '@angular/core';
import { Todo } from '../../services/todos/todos.model';
import { TodosService } from '../../services/todos/todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.todos = this.todosService.getTodos();
  }

  todoIsComplete(id: number) {
    this.todosService.setComplete(id);
  }

  todoIsNotComplete(id: number) {
    this.todosService.setNotComplete(id);
  }

  editItem(todo: any): void {
    const id = todo.id;
    const content = todo.content;
    this.todos = this.todosService.editTodo(id, content);
  }

  deleteItem(id: number): void {
    this.todos = this.todosService.deleteTodo(id);
  }
}
