type LessThan<N extends number, A extends any[] = []> = N extends A["length"]
  ? A[number]
  : LessThan<N, [...A, A["length"]]>;

type NumericRange<F extends number, T extends number> = Exclude<
  T | LessThan<T>,
  LessThan<F>
>;

export type Days = NumericRange<1, 31>;

export enum Month {
  January = "0",
  February = "1",
  March = "2",
  April = "3",
  May = "4",
  June = "5",
  July = "6",
  August = "7",
  September = "8",
  October = "9",
  November = "10",
  December = "11",
}

export type DayNames = "Su" | "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa";
