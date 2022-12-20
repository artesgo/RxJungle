import { filter, map, pipe, type MonoTypeOperatorFunction } from "rxjs";

export type mapFn<T> = (item: T) => T;

export function arrayMap<T>(mapping: mapFn<T>): MonoTypeOperatorFunction<Array<T>> {
  return pipe(
    filter(items => items.length > 0),
    map((items) => {
      return items.map(mapping);
    }),
  )
}