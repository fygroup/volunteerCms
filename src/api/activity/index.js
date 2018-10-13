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

/*修改活动*/
export function updateActivity(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(path + 'activity/updateActivity.do', params).then(data => {
      resolve(data)
    })
  })
}

/*活动详情*/
export function queryActivity(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'activity/queryActivity.do', params).then(data => {
            resolve(data)
        })
    })
}

/*删除*/
export function deleteActivity(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'activity/deleteActivity.do', params).then(data => {
            resolve(data)
        })
    })
}
