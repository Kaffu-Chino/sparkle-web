import type { IUser } from './user'

/**
 * 客户端发现
 */
export interface IClientDiscovery {
  /**
   * 客户端名称
   */
  clientName: string
  /**
   * 发现于
   */
  foundAt: number
  /**
   * 发现用户
   */
  foundBy: IUser
  /**
   * 长整型Hash
   */
  hash: number
  /**
   * 最后发现时间
   */
  lastSeenAt: number
  /**
   * 最后发现用户
   */
  lastSeenBy: IUser
  /**
   * PeerID
   */
  peerId: string
}
