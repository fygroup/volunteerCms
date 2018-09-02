import { path } from '@/path/path'
import axiosToken from '@/util/axiosToken'
import axiosTokenJson from '@/util/axiosTokenJson'


/*查看活动管理列表*/
export function queryBookingServiceForMySelf(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'bookService/queryBookingServiceForTeam.do', params).then(data => {
            resolve(data)
        })
    })
}


/*新增活动*/
export function updateBookingServiceRead(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'bookService/updateBookingServiceRead.do', params).then(data => {
            resolve(data)
        })
    })
}