import { filter, map, pipe, type MonoTypeOperatorFunction } from "rxjs";

export type filterFn = (item: unknown) => boolean;

export function filterArray<T>(comparison: filterFn): MonoTypeOperatorFunction<Array<T>> {
  return pipe(
    filter(items => items.length > 0),
    map((items) => {
      return items.filter(comparison);
    }),
  )
}