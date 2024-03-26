import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';

@Component({
  selector: 'apl-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, BookListComponent],
})
export class AppComponent {}
