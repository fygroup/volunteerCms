import { path } from '@/path/path'
import axiosToken from '@/util/axiosToken'


/*查询用户列表*/
export function queryUserList(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'user/queryUserList.do', params).then(data => {
            resolve(data)
        })
    })
}


/*修改用户*/
export function updateUser(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'user/updateUser.do', params).then(data => {
            resolve(data)
        })
    })
}


/*查询用户详情*/
export function queryUser(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'user/queryUser.do', params).then(data => {
            resolve(data)
        })
    })
}


/*查询居民列表*/
export function queryResidentList(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'resident/queryResidentList.do', params).then(data => {
            resolve(data)
        })
    })
}
/*新增居民*/
export function addResident(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'resident/addResident.do', params).then(data => {
            resolve(data)
        })
    })
}
/*修改居民列表*/
export function upadteResident(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'resident/upadteResident.do', params).then(data => {
            resolve(data)
        })
    })
}
/*查询居民详情*/
export function queryResident(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'resident/queryResident.do', params).then(data => {
            resolve(data)
        })
    })
}