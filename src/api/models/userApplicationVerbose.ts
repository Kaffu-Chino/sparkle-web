import type { IUserApplication } from './userApplication'

export interface IUserApplicationVerbose extends IUserApplication {
  /**
   * AppSecret
   */
  appSecret: string
}
