import { WritableSignal, signal } from '@angular/core';
import { ApiSignal } from './types';
import { FormGroup } from '@angular/forms';

export class SignalFactory {
  static create<T>() {
    return signal<ApiSignal<T>>({
      loading: false,
      error: null,
      data: null,
    });
  }

  static pend<T extends object>(signal: WritableSignal<ApiSignal<T>>) {
    signal.set({
      loading: true,
      error: null,
      data: null,
    });
  }

  static complete<T extends object>(
    signal: WritableSignal<ApiSignal<T>>,
    data: T
  ) {
    signal.set({
      loading: false,
      error: null,
      data,
    });
  }

  static error<T extends object>(
    signal: WritableSignal<ApiSignal<T>>,
    error: any
  ) {
    signal.set({
      loading: false,
      error,
      data: null,
    });
  }
}

export class FormValidator {
  private field: string = '';

  constructor(private form: FormGroup) {}

  public errors(field: string) {
    this.field = field;
    return this._errors;
  }

  private get _errors() {
    const control = this.form.get(this.field);
    if (control?.invalid && (control.dirty || control.touched)) {
      if (control.hasError('required')) {
        return 'This field is required';
      } else if (control.hasError('minlength')) {
        return `${this.field.replace(/^\w/, (c) =>
          c.toUpperCase()
        )} must be at least 3 characters long`;
      }
    }
    return '';
  }
}
