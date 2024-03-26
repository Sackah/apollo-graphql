import { WritableSignal, signal } from "@angular/core";
import { ApiSignal } from "./types";

export class SignalFactory {
    static create<T>() {
        return signal<ApiSignal<T>>({
            loading: false,
            error: null,
            data: null,
        });
    }

    static pend<T extends object>(
        signal: WritableSignal<ApiSignal<T>>,
    ){
        signal.set({
            loading: true,
            error: null,
            data: null,
        });
    }

    static complete<T extends object>(
        signal: WritableSignal<ApiSignal<T>>,
        data: T,
    ){
        signal.set({
            loading: false,
            error: null,
            data,
        });
    }

    static error<T extends object>(
        signal: WritableSignal<ApiSignal<T>>,
        error: any,
    ){
        signal.set({
            loading: false,
            error,
            data: null,
        });
    }
}