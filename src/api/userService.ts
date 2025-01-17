import { HttpMethod } from '~/enums/httpMethod'
import request from './config'
import type { IResponse, IResponseWithoutData } from './models/responseTypes'
import type { IUser } from './models/user'

/**
 * 用户登出
 * @returns
 */
export async function userLogout() {
  return request<IResponseWithoutData>('/api/user/logout', HttpMethod.GET)
}

/**
 * 获取当前用户信息
 * @returns
 */
export async function userMe() {
  return request<IResponse<IUser>>('/api/user/me', HttpMethod.GET)
}

/**
 * 根据用户id获取用户信息
 * @param id 用户id
 * @returns
 */
export async function userInfoById(id: string) {
  return request<IResponse<IUser>>(`/api/user/${id}`, HttpMethod.GET)
}
