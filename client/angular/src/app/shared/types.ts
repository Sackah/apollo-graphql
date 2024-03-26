export interface AppolloQuery {
  __typename: string;
}

export interface Book extends AppolloQuery {
  name: string;
  id: string;
  genre: string;
  authorId: string;
}

export interface Author {
  name: string;
  id: string;
  books: Book[];
}

export interface AddBookForm {
  name: string;
  genre: string;
  authorId: string;
}

export interface ApiSignal<T, U = {}> {
  loading: boolean;
  error: U | null;
  data: T | null;
}

export interface VehicleResponse {
  count: number;
  next: string;
  previous: string;
  results: Vehicle[];
}

export interface Vehicle {
  cargo_capacity: number;
  crew: number;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  passengers: number;
  vehicle_class: string;
  films: string[];
  price?: number;
}

export interface Film {
  title: string;
}
