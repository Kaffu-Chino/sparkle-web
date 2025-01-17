import { HttpMethod } from '~/enums/httpMethod'
import request from './config'
import type { IPaginationResponse } from './models/responseTypes'
import type { IBanHistory } from './models/banHistory'
import type { IPaginationRequest } from './models/paginationRequest'
import type { IComplexBanHistoryQueryRequest } from './models/banHistoryRequest'

/**
 * 查询客户端发现记录
 * @param paginationReq 分页请求
 * @returns
 **/
export async function listBanHistory(paginationReq: IPaginationRequest) {
  return request<IPaginationResponse<IBanHistory[]>>(
    '/api/banhistory',
    HttpMethod.GET,
    paginationReq
  )
}

/**
 * 复杂查询客户端发现记录
 * @param complexBanHistoryQueryReq 复杂封禁历史查询请求
 * @param paginationRequest 分页请求
 * @returns
 */
export async function complexBanHistoryQuery(
  complexBanHistoryQueryReq: IComplexBanHistoryQueryRequest,
  paginationReq: IPaginationRequest
) {
  return request<IPaginationResponse<IBanHistory[]>>('/api/banhistory/query', HttpMethod.POST, {
    ...complexBanHistoryQueryReq,
    ...paginationReq
  })
}
