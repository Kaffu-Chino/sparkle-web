/**
 * 分页数据
 */
export interface IPagination<T> {
  /**
   * 当前页码
   */
  page: number
  /**
   * 每页数量
   */
  size: number
  /**
   * 总数
   */
  total: number
  /**
   * 数据
   */
  results: T[]
}
