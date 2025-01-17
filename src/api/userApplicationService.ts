import { HttpMethod } from '~/enums/httpMethod'
import request from './config'
import type { IResponse, IResponseWithoutData } from './models/responseTypes'
import type { IUserApplication } from './models/userApplication'
import type { IUserApplicationVerbose } from './models/userApplicationVerbose'
import type { IEditUserAppRequest, ICreateUserAppRequest } from './models/userApplicationRequest'

/**
 * 获取用户应用列表
 * @returns
 */
export async function listUserApps() {
  return request<IResponse<IUserApplication[]>>('/api/userapp', HttpMethod.GET)
}

/**
 * 根据 App Id 获取用户应用信息
 * @param appId App ID
 * @returns
 */
export async function userAppInfoByAppId(appId: string) {
  return request<IResponse<IUserApplication>>(`/api/userapp/${appId}`, HttpMethod.GET)
}

/**
 * 重置用户应用密钥
 * @param appId App ID
 * @returns
 */
export async function resetUserAppSecretByAppId(appId: string) {
  return request<IResponse<IUserApplicationVerbose>>(
    `/api/userapp/${appId}/resetAppSecret`,
    HttpMethod.POST
  )
}

/**
 * 编辑用户应用信息
 * @param appId App ID
 * @param alterUserAppReq 用户应用信息
 * @returns
 */
export async function editUserAppByAppId(appId: string, alterUserAppReq: IEditUserAppRequest) {
  return request<IResponse<IUserApplication>>(
    `/api/userapp/${appId}`,
    HttpMethod.PATCH,
    alterUserAppReq
  )
}

/**
 * 创建用户应用
 * @param createUserAppReq 创建用户应用请求信息
 * @returns
 */
export async function createUserApp(createUserAppReq: ICreateUserAppRequest) {
  return request<IResponse<IUserApplicationVerbose>>(
    '/api/userapp',
    HttpMethod.PUT,
    createUserAppReq
  )
}

/**
 * 删除用户应用
 * @param appId App ID
 * @returns
 */
export async function deleteUserAppByAppId(appId: string) {
  return request<IResponseWithoutData>(`/api/userapp/${appId}`, HttpMethod.DELETE)
}
