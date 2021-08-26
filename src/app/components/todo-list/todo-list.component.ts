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

  editItem(todo: Todo): void {
    // const { todoId: id, editingTodo: todo } = editObject;
    const id = todo.id;
    const content = todo.content;
    this.todos = this.todosService.editTodo(id, content);
  }

  deleteItem(id: number): void {
    this.todos = this.todosService.deleteTodo(id);
  }
}
