import { path } from '@/path/path'
import axiosToken from 'src/util/axiosToken'
import axiosTokenJson from 'src/util/axiosTokenJson'


/*查询志愿者团队列表*/
export function queryVolunteerTeamList(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'volunteerTeam/queryVolunteerTeamList.do', params).then(data => {
            resolve(data)
        })
    })
}




/*查看志愿者团队详情*/
export function queryVolunteerTeam(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'volunteerTeam/queryVolunteerTeam.do', params).then(data => {
            resolve(data)
        })
    })
}


/*新增志愿者团队*/
export function addVolunteerTeam(params) {
    return new Promise((resolve, reject) => {
        axiosTokenJson.post(path + 'volunteerTeam/addVolunteerTeam.do', params).then(data => {
            resolve(data)
        })
    })
}


/*修改志愿者团队*/
export function updateVolunteerTeam(params) {
    return new Promise((resolve, reject) => {
        axiosTokenJson.post(path + 'volunteerTeam/updateVolunteerTeam.do', params).then(data => {
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



/*查询志愿者团队成员*/
export function queryVTeamUserList(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'vteamuser/queryVTeamUserList', params).then(data => {
            resolve(data)
        })
    })
}



/*设置志愿者团队管理员*/
export function addVTeamUser(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'vteamuser/addVTeamUser.do', params).then(data => {
            resolve(data)
        })
    })
}

/* 删除志愿者团队管理员 */
export function deleteVTeamUser(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(path + 'vteamuser/deleteVTeamUser.do', params).then(data => {
            resolve(data)
        })
    })
}
