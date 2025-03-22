import { HttpMethod } from '~/enums/httpMethod'
import type { IPaginationRequest } from './models/paginationRequest'
import type { ISnapshot } from './models/snapshot'
import type { IPaginationResponse } from './models/responseTypes'
import request from './config'
import type { IComplexSnapshotQueryRequest } from './models/snapshotRequest'

/**
 * 查询快照
 * @param paginationReq 分页请求
 * @returns
 **/
export async function listSnapshot(paginationReq: IPaginationRequest) {
  return request<IPaginationResponse<ISnapshot>>('/api/snapshot', HttpMethod.GET, paginationReq)
}

/**
 * 复杂查询快照
 * @param complexSnapshotQueryReq 复杂快照查询请求
 * @param paginationRequest 分页请求
 * @returns
 */
export async function complexSnapshotQuery(
  complexSnapshotQueryReq: IComplexSnapshotQueryRequest,
  paginationReq: IPaginationRequest
) {
  return request<IPaginationResponse<ISnapshot>>('/api/snapshot/query', HttpMethod.POST, {
    ...complexSnapshotQueryReq,
    ...paginationReq
  })
}
