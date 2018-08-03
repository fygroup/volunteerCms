import { path } from '@/path/path'
import axiosToken from '@/util/axiosToken'
import axiosTokenJson from '@/util/axiosTokenJson'


/*查看活动管理列表*/
export function queryActivityForManager(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'activity/queryActivityForManager.do', params).then(data => {
            resolve(data)
        })
    })
}


/*新增活动*/
export function addActivity(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'activity/addActivity.do', params).then(data => {
            resolve(data)
        })
    })
}