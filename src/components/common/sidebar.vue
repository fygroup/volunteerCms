<template>
    <div class="__sidebar">
        <el-row class="tac">
            <el-col>
                <el-menu
                class="el-menu-vertical-demo"
                :default-openeds="openeds"
                @open="handleOpen"
                @close="handleClose"
                :unique-opened="uniqueOpened"
                :router="openedRouter"
                :default-active="defaultActive"
                background-color="#20222a"
                text-color="#fff"
                active-text-color="#fff">
                    <el-menu-item v-for="(item,index) in sidebarMenu" :key="index" :index="item.path">
                        <span slot="title">{{item.name}}</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            uniqueOpened: true,
            openedRouter: true,
            defaultActive: this.$route.path,
            openeds: ['1'],
            sidebarMenu: [
                { name: '居民管理', icon: 'el-icon-location', path: '/home/user' },
                { name: '用户管理', icon: 'el-icon-location', path: '/home/resident' },
                { name: '志愿队管理', icon: 'el-icon-location', path: '/home/volunteer' },
                { name: '活动管理', icon: 'el-icon-location', path: '/home/activity' },
                { name: '预约管理', icon: 'el-icon-location', path: '/home/order' },
                { name: '热线管理', icon: 'el-icon-location', path: '/home/hotline' },
            ]
        }
    },
    methods: {
        handleOpen(key, keyPath) {
           	
        },
        handleClose(key, keyPath) {
            
        },
    },
}
</script>

<style lang="stylus">
.sidebar {
    .el-menu-item.is-active {
        background #1E9FFF !important
    }
}
</style>
