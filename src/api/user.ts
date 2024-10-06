import { HttpMethod } from '~/enums/httpMethod'
import request from './config'
import type { IResponse, IResponseWithoutData } from './models/responseTypes'
import type { IUser } from './models/user'

export async function userLogout() {
  return request<IResponseWithoutData>('/api/user/logout', HttpMethod.GET)
}

export async function userMe() {
  return request<IResponse<IUser>>('/api/user/me', HttpMethod.GET)
}

export async function userInfoById(id: string) {
  return request<IResponse<IUser>>(`/api/user/${id}`, HttpMethod.GET)
}
