import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

import login from '@/components/login';
import wrapper from '@/components/wrapper';
import user from '@/components/modular/user'; //居民管理
import userAdd from '@/components/modular/userAdd'; //居民管理
import resident from '@/components/modular/resident'; //居民管理
import residentAdd from '@/components/modular/residentAdd'; //居民管理
import volunteer from '@/components/modular/volunteer'; //志愿者管理
import volunteerAdd from '@/components/modular/volunteerAdd'; //新增志愿者
import volunteerUser from '@/components/modular/volunteerUser'; //设置负责人
import activity from '@/components/modular/activity'; //活动管理
import activityAdd from '@/components/modular/activityAdd'; //活动管理
import order from '@/components/modular/order'; //预约管理
import hotline from '@/components/modular/hotline'; //热线管理

export default new Router({
    routes: [{
            path: '/login',
            name: '登录',
            component: login,
        },
        {
            path: '/home',
            name: '主页',
            component: wrapper,
            children: [
                { path: '/home', redirect: 'resident' },
                { path: '/home/user', name: '居民管理', component: user },
                { path: '/home/userAdd', name: '新增居民', component: userAdd },
                { path: '/home/resident', name: '用户管理', component: resident },
                { path: '/home/residentAdd', name: '用户居民', component: residentAdd },
                { path: '/home/volunteer', name: '志愿者管理', component: volunteer },
                { path: '/home/volunteerAdd', name: '新增志愿者', component: volunteerAdd },
                { path: '/home/volunteerUser', name: '设置负责人', component: volunteerUser },
                { path: '/home/activity', name: '活动管理', component: activity },
                { path: '/home/activityAdd', name: '发布活动', component: activityAdd },
                { path: '/home/order', name: '预约管理', component: order },
                { path: '/home/hotline', name: '热线管理', component: hotline },
            ]
        }
    ]
})