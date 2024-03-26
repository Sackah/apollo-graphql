import {
  Component,
  OnInit,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { BookDetailsService } from './book-details.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Author, Book } from '../../shared';

@Component({
  selector: 'apl-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent implements OnInit {
  bookId = input.required<string>();
  private bookDetailsService = inject(BookDetailsService);
  public bookDetails$!: Observable<{
    book: Book & {
      author: Author;
    };
  }>;

  ngOnInit(): void {
    this.bookDetails$ = this.bookDetailsService.getBook(this.bookId());
  }
}
