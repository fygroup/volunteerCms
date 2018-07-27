import { path } from '@/path/path'
import axiosToken from '@/util/mutipartAxios'


/*查询用户列表*/
export function uploadFile(params) {
    return new Promise((resolve, reject) => {
        let param = new FormData()
        param.append('file', params);
        axiosToken.post(path + 'file/upload.do', param).then(data => {
            resolve(data)
        })
    })
}