import { path } from '@/path/path'
import axiosToken from '@/util/axiosToken'

/* 查询预约管理列表 */

export function query (params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(path + '/bookService/queryBookingServiceForTeam.do', params).then(data => {
      resolve(data)
    })
  })
}
