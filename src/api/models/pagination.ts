export interface IPagination<T> {
  page: number
  size: number
  total: number
  results: T[]
}
