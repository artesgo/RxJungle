import { filter, map, pipe, type MonoTypeOperatorFunction } from "rxjs";

export type filterFn<T> = (item: T) => boolean;

export function arrayFilter<T>(comparison: filterFn<T>): MonoTypeOperatorFunction<Array<T>> {
  return pipe(
    filter(items => items.length > 0),
    map((items) => {
      return items.filter(comparison);
    }),
  )
}