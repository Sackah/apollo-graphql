import { Injectable, WritableSignal, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ApiSignal, Book, SignalFactory, VehicleResponse } from '../../shared';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApolloQueryResult } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class BookListService {
  private GET_BOOKS = gql`
    query {
      books {
        name
        id
      }
    }
  `;
  private apollo = inject(Apollo);
  private http = inject(HttpClient);
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
