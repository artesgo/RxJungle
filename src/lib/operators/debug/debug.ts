import { pipe, tap, type MonoTypeOperatorFunction } from "rxjs";

export function debug<T>(message: string): MonoTypeOperatorFunction<T> {
  return pipe(
    tap((stream: T) => console.log(message, stream)),
  )
}