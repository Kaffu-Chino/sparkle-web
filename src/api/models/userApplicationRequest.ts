/**
 * 创建用户应用请求信息
 */
export interface ICreateUserAppRequest {
  comment: string
}

/**
 * 编辑用户应用请求信息
 */
export interface IEditUserAppRequest extends ICreateUserAppRequest {}
