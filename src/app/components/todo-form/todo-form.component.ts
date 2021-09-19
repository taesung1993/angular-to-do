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
    content: new FormControl(''),
    isComplete: new FormControl(false),
  });

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const todo = this.todoForm.getRawValue();
    this.todosService.postTodo(todo).subscribe((id) => {
      const newTodo: Todo = {
        id,
        ...todo,
      };
      this.todosService.addTodo(newTodo);
      this.todoForm.patchValue({
        content: '',
        isComplete: false,
      });
    });
  }
}
