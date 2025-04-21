export type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

export type PartialNested<T> = {
  [K in keyof T]?: T[K] extends object ? PartialNested<T[K]> : Nullable<T[K]>;
};
export interface IPaginationReturn<T> {
  items: T[];
  totalCount: number;
}
