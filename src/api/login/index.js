import { path } from '@/path/path'
import axiosToken from '@/util/axiosToken'


/*登录*/
export function login(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'pclogin/login.do', params).then(data => {
            resolve(data)
        })
    })
}