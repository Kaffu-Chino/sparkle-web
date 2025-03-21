import type { StringCompareMethod } from '~/enums/compareMethod'

/**
 * 复杂客户端发现查询请求
 */
export interface IComplexClientDiscoveryQueryRequest {
  // 时间信息
  /**
   * 发现时间区间开始时间，不使用查询条件时请勿传递此参数
   */
  foundAtTimeFrom?: number
  /**
   * 发现时间区间结束时间，不使用查询条件时请勿传递此参数
   */
  foundAtTimeTo?: number
  /**
   * 最后发现时间区间开始时间，不使用查询条件时请勿传递此参数
   */
  lastSeenAtTimeFrom?: number
  /**
   * 最后发现时间区间结束时间，不使用查询条件时请勿传递此参数
   */
  lastSeenAtTimeTo?: number

  // 客户端基本信息
  peerId?: string
  /**
   * peer ID 比较方法，不使用查询条件时请勿传递此参数
   */
  peerIdCompareMethod?: StringCompareMethod
  /**
   * peer 客户端名称，不使用查询条件时请勿传递此参数
   */
  peerClientName?: string
  /**
   * peer 客户端名称比较方法，不使用查询条件时请勿传递此参数
   */
  peerClientNameCompareMethod?: StringCompareMethod

  // 查询设置
  /**
   * 是否使用 OR 条件连接，不使用查询条件时请勿传递此参数
   */
  orConnector?: boolean
  /**
   * 有序排序字段，不使用查询条件时请勿传递此参数
   */
  sortBy?: string[]
  /**
   * 排序方式，不使用查询条件时请勿传递此参数
   */
  sortOrder?: string
}

/**
 * 复杂客户端发现查询表单
 */
export interface IComplexClientDiscoveryQueryForm extends IComplexClientDiscoveryQueryRequest {
  /**
   * 发现时间范围
   */
  foundAtTimeRange: null | Array<Date>
  /**
   * 最后发现时间范围
   */
  lastSeenAtTimeRange: null | Array<Date>
}
