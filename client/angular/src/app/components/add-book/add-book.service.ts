import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AddBookForm, Author, SignalFactory } from '../../shared';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddBookService {
  private GET_AUTHORS = gql`
    query {
      authors {
        name
        id
      }
    }
  `;
  private ADD_BOOK = gql`
    mutation ($name: String!, $genre: String!, $authorId: ID!) {
      addBook(name: $name, genre: $genre, authorId: $authorId) {
        name
        genre
      }
    }
  `;
  private apollo = inject(Apollo);

  public getAuthors(signal = SignalFactory.create<{ authors: Author[] }>()) {
    SignalFactory.pend(signal);

    this.apollo
      .watchQuery<{ authors: Author[] }>({
        query: this.GET_AUTHORS,
        notifyOnNetworkStatusChange: true,
      })
      .valueChanges.pipe(map((response) => response.data))
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

  public addBook(
    details: AddBookForm,
    signal = SignalFactory.create<{
      addBook: { name: string; genre: string };
    }>()
  ) {
    SignalFactory.pend(signal);

    this.apollo
      .mutate<{
        addBook: { name: string; genre: string };
      }>({
        mutation: this.ADD_BOOK,
        variables: details,
        refetchQueries: ['GetBooks'],
      })
      .pipe(map((response) => response.data))
      .subscribe({
        next: (data) => {
          console.log(data);
          SignalFactory.complete(signal, data!);
        },
        error: (err) => {
          SignalFactory.error(signal, err);
        },
      });

    return signal;
  }
}
