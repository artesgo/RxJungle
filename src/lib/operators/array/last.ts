import { filter, map, pipe, type MonoTypeOperatorFunction } from "rxjs";

export function arrayLast<T>(): MonoTypeOperatorFunction<Array<T>> {
  return pipe(
    filter(items => items.length > 0),
    map((items) => {
      const _items = [...items];
      return [_items.pop()] as T[];
    }),
  )
}