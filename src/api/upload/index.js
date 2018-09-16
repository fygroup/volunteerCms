import { path } from '@/path/path'
import axiosToken from '@/util/mutipartAxios'
import axiosTokenGet from '@/util/axiosTokenGet'


/*查询用户列表*/
export function uploadFile(params) {
    return new Promise((resolve, reject) => {
        let param = new FormData();
        if (params.length == undefined) {
            param.append('file', params);
        } else {
            for (var i = 0; i < params.length; i++) {
                param.append('file', params[i]);
            }
        }
        axiosToken.post(path + 'file/upload', param).then(data => {
            resolve(data)
        })
    })
}


/*查询用户列表*/
export function importExcel(params) {
    return new Promise((resolve, reject) => {
        let param = new FormData();
        if (params.length == undefined) {
            param.append('file', params);
        }
        axiosToken.post(path + 'excel/importExcel.do', param).then(data => {
            resolve(data)
        })
    })
}