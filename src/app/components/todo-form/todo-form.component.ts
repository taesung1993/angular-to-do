import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

interface Todos {
  id: number;
  todo: string;
}

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  todoForm = new FormGroup({
    todo: new FormControl(''),
  });
  todos: Todos[] = [];

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.todoForm.patchValue({
      todo: '',
    });
  }
}
