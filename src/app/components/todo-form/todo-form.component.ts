import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Todo } from 'src/app/services/todos/todos.model';
import { TodosService } from 'src/app/services/todos/todos.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  todoForm = new FormGroup({
    todo: new FormControl(''),
  });
  todos: Todo[] = [];
  todo: Todo = {
    id: NaN,
    content: '',
  };

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.todos = this.todosService.getTodos();
  }

  onSubmit(): void {
    const newId = this.todos.length + 1;
    const content = this.todoForm.value.todo;

    this.todo = {
      id: newId,
      content,
    };

    this.todosService.addTodo(this.todo);

    this.todoForm.patchValue({
      todo: '',
    });
  }
}
