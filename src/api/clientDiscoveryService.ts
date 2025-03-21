import { HttpMethod } from '~/enums/httpMethod'
import request from './config'
import type { IPaginationRequest } from './models/paginationRequest'
import type { IClientDiscovery } from './models/clientDiscovery'
import type { IPaginationResponse } from './models/responseTypes'
import type { IComplexClientDiscoveryQueryRequest } from './models/clientDiscoveryRequest'

/**
 * 查询客户端发现记录
 * @param paginationReq 分页请求
 * @returns
 **/
export async function listClientDiscovery(paginationReq: IPaginationRequest) {
  return request<IPaginationResponse<IClientDiscovery>>(
    '/api/clientdiscovery',
    HttpMethod.GET,
    paginationReq
  )
}

/**
 * 复杂查询客户端发现记录
 * @param complexClientDiscoveryQueryReq 复杂客户端发现记录查询请求
 * @param paginationRequest 分页请求
 * @returns
 */
export async function complexClientDiscoveryQuery(
  complexClientDiscoveryQueryReq: IComplexClientDiscoveryQueryRequest,
  paginationReq: IPaginationRequest
) {
  return request<IPaginationResponse<IClientDiscovery>>(
    '/api/clientdiscovery/query',
    HttpMethod.POST,
    {
      ...complexClientDiscoveryQueryReq,
      ...paginationReq
    }
  )
}
