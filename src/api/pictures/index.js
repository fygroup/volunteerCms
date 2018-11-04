import { path } from '@/path/path'
import axiosToken from '@/util/axiosToken'


/*新增轮播图*/
export function addPictures(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'pictures/add', params).then(data => {
            resolve(data)
        })
    })
}
/*修改轮播图*/
export function upadtePictures(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'pictures/update', params).then(data => {
            resolve(data)
        })
    })
}
/*查询轮播图详情*/
export function queryOnePictures(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'pictures/queryOne', params).then(data => {
            resolve(data)
        })
    })
}
/*查询轮播图列表*/
export function queryPictures(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(path + 'pictures/query', params).then(data => {
      resolve(data)
    })
  })
}
