import type { IUserApplication } from './userApplication'

/**
 * 用户应用完整元数据
 */
export interface IUserApplicationVerbose extends IUserApplication {
  /**
   * AppSecret
   */
  appSecret: string
}
