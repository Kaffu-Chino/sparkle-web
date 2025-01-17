import type { IPagination } from './pagination'

export interface IResponseWithoutData {
  message: string
  success: boolean
  [property: string]: any
}

export interface IResponse<T> extends IResponseWithoutData {
  data: T
}

export interface IPaginationResponse<T> extends IResponseWithoutData {
  data: IPagination<T>
}
