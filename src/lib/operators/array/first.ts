import { filter, map, pipe, type MonoTypeOperatorFunction } from "rxjs";

export function first<T>(): MonoTypeOperatorFunction<Array<T>> {
  return pipe(
    filter(items => items.length > 0),
    map((items) => {
      const _items = [...items];
      return [_items.shift()] as T[];
    }),
  )
}