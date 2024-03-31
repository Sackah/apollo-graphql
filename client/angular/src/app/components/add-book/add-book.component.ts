import { Component, OnInit, WritableSignal, inject } from '@angular/core';
import { AddBookService } from './add-book.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddBookForm, ApiSignal, FormValidator } from '../../shared';
import { CommonModule } from '@angular/common';
import { BooleanPipe } from '../../pipes/boolean.pipe';

@Component({
  selector: 'apl-add-book',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BooleanPipe],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent {
  private addBookService = inject(AddBookService);
  authors = this.addBookService.getAuthors();
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    genre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    authorId: new FormControl('', [Validators.required]),
  });
  addBookSignal:
    | WritableSignal<
        ApiSignal<
          {
            addBook: {
              name: string;
              genre: string;
            };
          },
          {}
        >
      >
    | undefined = undefined;
  validator = new FormValidator(this.form);

  handleSubmit() {
    if (this.form.valid) {
      this.addBookSignal = this.addBookService.addBook(
        this.form.value as AddBookForm
      );
    }
  }
}
