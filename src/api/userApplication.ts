import { HttpMethod } from '~/enums/httpMethod'
import request from './config'
import type { IResponse, IResponseWithoutData } from './models/responseTypes'
import type { IUserApplication } from './models/userApplication'
import type { IUserApplicationVerbose } from './models/userApplicationVerbose'
import type { IEditUserAppRequest, ICreateUserAppRequest } from './models/userApplicationRequest'

export async function listUserApps() {
  return request<IResponse<IUserApplication[]>>('/api/userapp', HttpMethod.GET)
}

export async function userAppInfoByAppId(appId: string) {
  return request<IResponse<IUserApplication>>(`/api/userapp/${appId}`, HttpMethod.GET)
}

export async function resetUserAppSecretByAppId(appId: string) {
  return request<IResponse<IUserApplicationVerbose>>(
    `/api/userapp/${appId}/resetAppSecret`,
    HttpMethod.POST
  )
}

export async function editUserAppByAppId(appId: string, alterUserAppReq: IEditUserAppRequest) {
  return request<IResponse<IUserApplication>>(
    `/api/userapp/${appId}`,
    HttpMethod.PATCH,
    alterUserAppReq
  )
}

export async function createUserApp(createUserAppReq: ICreateUserAppRequest) {
  return request<IResponse<IUserApplicationVerbose>>(
    '/api/userapp',
    HttpMethod.PUT,
    createUserAppReq
  )
}

export async function deleteUserAppByAppId(appId: string) {
  return request<IResponseWithoutData>(`/api/userapp/${appId}`, HttpMethod.DELETE)
}
