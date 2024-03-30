import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Author, Book } from '../../shared';
import { SignalFactory } from '../../shared';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookDetailsService {
  private GET_BOOK = gql`
    query ($id: ID!) {
      book(id: $id) {
        id
        name
        genre
        author {
          id
          name
          age
          books {
            name
          }
        }
      }
    }
  `;
  private apollo = inject(Apollo);

  getBook(id: string) {
    return this.apollo.watchQuery<{ book: Book & { author: Author } }>({
      query: this.GET_BOOK,
      variables: { id },
    }).valueChanges;
  }

  getBookWithSignalFactory(
    id: string,
    signal = SignalFactory.create<Book & { author: Author }>()
  ) {
    SignalFactory.pend(signal);
    this.getBook(id)
      .pipe(map((response) => response.data.book))
      .subscribe({
        next: (data) => {
          SignalFactory.complete(signal, data);
        },
        error: (err) => {
          SignalFactory.error(signal, err);
        },
      });

    return signal;
  }
}
