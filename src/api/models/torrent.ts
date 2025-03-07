/**
 * 种子元数据
 */
export interface ITorrent {
  /**
   * 种子记录 ID
   **/
  id: number
  /**
   * 种子识别符
   **/
  identifier: string
  /**
   * 私有种子
   */
  privateTorrent: boolean
  /**
   * 种子大小
   **/
  size: number
}
