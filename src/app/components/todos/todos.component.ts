import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../models';

@Component({
  selector: 'app-todos',
  standalone: false,
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {

    private fb = inject(FormBuilder);
    protected form!: FormGroup;
    protected todos: Todo[] = [];

    ngOnInit(): void {
      this.form = this.createForm();
    }

    private createForm(): FormGroup {
      return this.fb.group({
        description: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
        priority: this.fb.control<string>('Low', [Validators.required]),
        due: this.fb.control<string>('', [Validators.required])
      });
    }

    protected processForm(): void {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }

      const newTodo: Todo = this.form.value;
      this.todos.push(newTodo);
      console.info('>>> New Todo Added: ', newTodo);

      this.form.reset({
        description: '',
        priority: 'Low',
        due: ''
      });
    }

    protected removeTodo(index : number):void{
      this.todos.splice(index,1);
    }
}