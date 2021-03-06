import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './page/main/main.component';
import { TheHeaderComponent } from './components/the-header/the-header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { RequestTodoModal } from './components/request-todo-modal/request-todo-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TheHeaderComponent,
    TodoCardComponent,
    TodoFormComponent,
    TodoItemComponent,
    TodoListComponent,
    RequestTodoModal,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
