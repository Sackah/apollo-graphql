import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Author, Book } from '../../shared';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookDetailsService {
  private apollo = inject(Apollo);
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

  getBook(id: string) {
    return this.apollo
      .watchQuery<{ book: Book & { author: Author } }>({
        query: this.GET_BOOK,
        variables: { id },
      })
      .valueChanges.pipe(map((data) => data.data));
  }
}
