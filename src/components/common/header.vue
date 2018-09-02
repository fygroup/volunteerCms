<template>
    <div class="__header">
        <div class="left">
        </div>
        <ul class="right">
            <li>
                <a href="javascript:void(0);">
                    admin
                </a>
            </li>
            <li>
                <a href="javascript:void(0);" @click="out()">
                    退出
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    methods: {
        out(){
            this.$confirm('是否退出该系统?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: '正在退出系统中，请等候。',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    loading.close();
                    this.$router.push({ path: '/login' });
                }, 500);
            }).catch(() => {
                
            });
        }
    }
}
</script>

<style lang="stylus">
.__header {
    position relative
    .left {
        position absolute;
        left 220px;
        line-height 50px;
        width 50px;
        text-align center;
    }
    .right {
        position absolute
        right 0px;
        box-sizing: border-box;
        li {
            height: 48px;
            line-height: 48px;
            position: relative;
            display: inline-block;
            vertical-align: middle;
            padding 0 20px;
            transition: all .3s;
            -webkit-transition: all .3s;
            border-top 2px solid transparent
            a {
                color #333;
                font-size 14px;
                transition: all .3s;
                -webkit-transition: all .3s;
            }
        }
        li:hover {
            border-top 2px solid #1E9FFF
        }
    }
}
</style>
