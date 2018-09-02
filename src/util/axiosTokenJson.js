import * as axios from 'axios'
import { getCookie, setCookie } from '@/util/cookie'
import Qs from 'qs'

let options = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'user_id': sessionStorage.getItem("user_id"),
    },
}

export default axios.create(options)