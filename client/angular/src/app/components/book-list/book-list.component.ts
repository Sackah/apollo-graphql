import { Component, inject, signal } from '@angular/core';
import { BookListService } from './book-list.service';
import { Book, SignalFactory, VehicleResponse } from '../../shared';
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
  private addBookService = inject(BookListService);
  // vehicleSignal = this.addBookService.getVehicles();
  books = this.addBookService.get();
  selectedBook = signal<string | null>(null);

  select(id: string) {
    this.selectedBook.set(id);
  }
}
