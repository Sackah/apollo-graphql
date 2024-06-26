import { Component, OnInit, inject, signal } from '@angular/core';
import { BookListService } from './book-list.service';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from '../book-details/book-details.component';

@Component({
  selector: 'apl-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
  imports: [CommonModule, BookDetailsComponent],
})
export class BookListComponent {
  private bookListService = inject(BookListService);
  books = this.bookListService.getWithSignalFactory();
  selectedBook = signal<string>('');

  select(id: string) {
    this.selectedBook.set(id);
  }
}
