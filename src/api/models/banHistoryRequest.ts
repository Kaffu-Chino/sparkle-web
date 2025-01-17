import type { NumberCompareMethod, StringCompareMethod } from '~/enums/compareMethod'

/**
 * 复杂封禁历史查询请求
 */
export interface IComplexBanHistoryQueryRequest {
  // 时间信息
  /**
   * 开始时间
   */
  timeFrom: number
  /**
   * 结束时间
   */
  timeTo: number

  // peer基本信息
  /**
   * Peer ID，不使用查询条件时请勿传递此参数
   */
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
  /**
   * peer IP，不使用查询条件时请勿传递此参数
   */
  peerIp?: string
  /**
   * peer IP 比较方法，不使用查询条件时请勿传递此参数
   */
  peerIpCompareMethod?: StringCompareMethod
  /**
   * peer 端口，不使用查询条件时请勿传递此参数
   */
  peerPort?: number
  /**
   * peer 端口比较方法，不使用查询条件时请勿传递此参数
   */
  peerPortCompareMethod?: NumberCompareMethod

  // 种子信息
  /**
   * 种子标识符，不使用查询条件时请勿传递此参数
   */
  torrentIdentifier?: string
  /**
   * 种子标识符比较方法，不使用查询条件时请勿传递此参数
   */
  torrentIdentifierCompareMethod?: StringCompareMethod
  /**
   * 种子大小，不使用查询条件时请勿传递此参数
   */
  torrentSize?: number
  /**
   * 种子大小比较方法，不使用查询条件时请勿传递此参数
   */
  torrentSizeCompareMethod?: NumberCompareMethod

  // 流量信息
  /**
   * 来自 Peer 的流量，不使用查询条件时请勿传递此参数
   */
  fromPeerTraffic?: number
  /**
   * 来自 Peer 的流量比较方法，不使用查询条件时请勿传递此参数
   */
  fromPeerTrafficCompareMethod?: NumberCompareMethod
  /**
   * 来自 Peer 的流量速度，不使用查询条件时请勿传递此参数
   */
  fromPeerTrafficSpeed?: number
  /**
   * 来自 Peer 的流量速度比较方法，不使用查询条件时请勿传递此参数
   */
  fromPeerTrafficSpeedCompareMethod?: NumberCompareMethod
  /**
   * 到 Peer 的流量，不使用查询条件时请勿传递此参数
   */
  toPeerTraffic?: number
  /**
   * 到 Peer 的流量比较方法，不使用查询条件时请勿传递此参数
   */
  toPeerTrafficCompareMethod?: NumberCompareMethod
  /**
   * 到 Peer 流量的速度，不使用查询条件时请勿传递此参数
   */
  toPeerTrafficSpeed?: number
  /**
   * 到 Peer 流量的速度比较方法，不使用查询条件时请勿传递此参数
   */
  toPeerTrafficSpeedCompareMethod?: NumberCompareMethod
  /**
   * Peer 进度，不使用查询条件时请勿传递此参数
   */
  peerProgress?: number
  /**
   * Peer 进度比较方法，不使用查询条件时请勿传递此参数
   */
  peerProgressCompareMethod?: NumberCompareMethod
  /**
   * 下载器进度，不使用查询条件时请勿传递此参数
   */
  downloaderProgress?: number
  /**
   * 下载器进度比较方法，不使用查询条件时请勿传递此参数
   */
  downloaderProgressCompareMethod?: NumberCompareMethod

  // 封禁信息
  /**
   * 是否为 BTN 封禁，不使用查询条件时请勿传递此参数
   */
  btnBan?: boolean
  /**
   * 封禁模块名称，不使用查询条件时请勿传递此参数
   */
  module?: string
  /**
   * 封禁模块名称比较方法，不使用查询条件时请勿传递此参数
   */
  moduleCompareMethod?: StringCompareMethod
  /**
   * 命中封禁规则，不使用查询条件时请勿传递此参数
   **/
  rule?: string
  /**
   * 命中封禁规则比较方法，不使用查询条件时请勿传递此参数
   */
  ruleCompareMethod?: StringCompareMethod

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
  [property: string]: any
}
