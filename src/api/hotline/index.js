import { path } from '@/path/path'
import axiosToken from '@/util/axiosToken'


/*查询热线*/
export function queryHotline(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'hotline/queryHotline.do', params).then(data => {
            resolve(data)
        })
    })
}


/*修改热线*/
export function updateHotline(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'hotline/updateHotline.do', params).then(data => {
            resolve(data)
        })
    })
}