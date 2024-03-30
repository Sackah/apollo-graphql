import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  WritableSignal,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { BookDetailsService } from './book-details.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ApiSignal, Author, Book } from '../../shared';

@Component({
  selector: 'apl-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent implements OnInit, OnChanges {
  @Input({ required: true }) bookId!: string;
  private bookDetailsService = inject(BookDetailsService);
  book!: WritableSignal<
    ApiSignal<
      Book & {
        author: Author;
      },
      {}
    >
  >;

  ngOnInit() {
    this.book = this.bookDetailsService.getBookWithSignalFactory(this.bookId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bookId']) {
      this.bookDetailsService.getBookWithSignalFactory(this.bookId, this.book);
    }
  }
}
