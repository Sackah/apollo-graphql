import { Injectable, WritableSignal, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Book, SignalFactory } from '../../shared';
import { map } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class BookListService {
  private GET_BOOKS = gql`
    query GetBooks {
      books {
        name
        id
      }
    }
  `;
  private apollo = inject(Apollo);
  private query = this.apollo.watchQuery<{ books: Book[] }>({
    query: this.GET_BOOKS,
    notifyOnNetworkStatusChange: true,
  });

  public get() {
    return this.query.valueChanges;
  }

  public getWithSignalFactory(signal = SignalFactory.create<Book[]>()) {
    SignalFactory.pend(signal);
    this.get()
      .pipe(map((response) => response.data.books))
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

  public refetch() {
    this.query.refetch();
  }
}
