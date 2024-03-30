import { Component, WritableSignal, inject } from '@angular/core';
import { AddBookService } from './add-book.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddBookForm, ApiSignal } from '../../shared';

@Component({
  selector: 'apl-add-book',
  standalone: true,
  imports: [ReactiveFormsModule],
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

  handleSubmit() {
    if (this.form.valid) {
      this.addBookSignal = this.addBookService.addBook(
        this.form.value as AddBookForm
      );
    }
  }
}
