import type { ITorrent } from './torrent'

/**
 * 快照记录
 */
export interface ISnapshot {
  /**
   * ID
   */
  id: number
  /**
   * UserApp App ID
   */
  appId: string
  /**
   * 提交 ID
   */
  submitId: string
  /**
   * Peer IP 地址
   */
  peerIp: string
  /**
   * Peer 端口号
   */
  peerPort: number
  /**
   * Peer ID
   */
  peerId: string
  /**
   * Peer 客户端名称
   */
  peerClientName: string
  /**
   * 种子元数据
   */
  torrent: ITorrent
  /**
   * 从 Peer 下载的数据量
   */
  fromPeerTraffic: number
  /**
   * 从 Peer 下载的速率
   */
  fromPeerTrafficSpeed: number
  /**
   * 向 Peer 上传的数据量
   */
  toPeerTraffic: number
  /**
   * 向 Peer 上传的速率
   */
  toPeerTrafficSpeed: number
  /**
   * Peer 汇报进度
   */
  peerProgress: number
  /**
   * 下载器进度
   */
  downloaderProgress: number
  /**
   * 标志位
   */
  flags: string
}
