import { Injectable, WritableSignal, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ApiSignal, Book, SignalFactory, VehicleResponse } from '../../shared';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

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

  public get() {
    return this.apollo
      .watchQuery<{ books: Book[] }>({
        query: this.GET_BOOKS,
      })
      .valueChanges.pipe(map((data) => data.data.books));
  }

  public getWithSignal(
    signal: WritableSignal<ApiSignal<Book[]>> = SignalFactory.create<Book[]>()
  ) {
    SignalFactory.pend(signal);

    this.apollo
      .watchQuery<{ books: Book[] }>({
        query: this.GET_BOOKS,
      })
      .valueChanges.subscribe(({ data, error }) => {
        console.log(data);
        SignalFactory.complete(signal, data.books);
        SignalFactory.error(signal, error);
      });

    return signal;
  }

  public getVehicles(signal = SignalFactory.create<VehicleResponse>()) {
    SignalFactory.pend(signal);

    this.http.get<VehicleResponse>('https://swapi.dev/api/vehicles').subscribe({
      next: (res) => {
        SignalFactory.complete(signal, res);
      },
      error: (err) => {
        SignalFactory.error(signal, err);
      },
    });

    return signal;
  }
}
