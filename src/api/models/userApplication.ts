import type { IUser } from './user'

/**
 * UserApplication
 */
export interface IUserApplication {
  /**
   * 记录ID
   */
  id: number
  /**
   * AppId
   */
  appId: string
  /**
   * 备注
   */
  comment: string
  /**
   * 创建时间
   */
  createdAt: number
  /**
   * 所属用户
   */
  user: IUser
}
