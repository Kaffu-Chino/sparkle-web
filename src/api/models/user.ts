/**
 * 用户元数据
 */
export interface IUser {
  /**
   * 用户ID
   */
  id: number
  /**
   * 头像 URL
   */
  avatar: string
  /**
   * 最后在线时间
   */
  lastSeenAt: string
  /**
   * 昵称
   */
  nickname: string
  /**
   * 注册时间
   */
  registerAt: string

  banned: boolean | null | undefined
}
