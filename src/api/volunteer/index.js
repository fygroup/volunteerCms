import { path } from '@/path/path'
import axiosToken from '@/util/axiosToken'


/*查询志愿者团队列表*/
export function queryVolunteerTeamList(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'volunteerTeam/queryVolunteerTeamList.do', params).then(data => {
            resolve(data)
        })
    })
}




/*新增志愿者团队*/
export function addVolunteerTeam(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'volunteerTeam/addVolunteerTeam.do', params).then(data => {
            resolve(data)
        })
    })
}



/*查询服务类型明细*/
export function queryTypeDetailByTypeCode(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'typedetail/queryTypeDetailByTypeCode.do', params).then(data => {
            resolve(data)
        })
    })
}







