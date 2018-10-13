<template>
    <div class="__volunteer">
        <div class="formBox">
            <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline">
                <el-form-item label="志愿队名称：">
                    <el-input v-model="formInline.real_name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="searchSubmit('formInline')">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="btnBox">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">新增</el-button>
        </div>
        <div class="tableList">
            <vtable :dataArray="dataArray" :columns="columns" :total="total" :isSelection="isSelection" @getArticle="queryVolunteerListPost"></vtable>
        </div>
    </div>
</template>

<script>
import table from '@/components/common/table'
import MyDropDown from '@/components/common/MyDropDown'
import { getCookie, setCookie } from "@/util/cookie";
import { queryVolunteerTeamList } from "api/volunteer/index";
import { queryTypeDetailByTypeCode } from "api/volunteer/index";//查询服务类型明细
export default {
    components: {
        vtable: table
    },
    data() {
        return {
            formInline: {
                real_name: '',
                typeId: '',
            },
            typeCodeList: [],
            dataArray: [],
            pageSize: 10,
            pageNum: 1,
            total: 0,
            isSelection: false,
            columns: [
                {
                    prop: "name",
                    label: "服务队名称",
                },
                {
                    prop: "type_name",
                    label: "服务类别",
                },
                {
                    prop: "join_type",
                    label: "加入方式",
                },
                {
                    prop: "peoplenumnber",
                    label: "加入人数",
                },
                {
                    prop: "create_time",
                    label: "成立时间",
                    width: ""
                },
                {
                    prop: "recruitstatus",
                    label: "状态",
                    render: function(createElement) {
                        if(this.row.recruitstatus==1){
                            return createElement('span', {
                                domProps: {
                                    innerHTML: '未开始',
                                }
                            })
                        }else if(this.row.recruitstatus==2){
                            return createElement('span', {
                                domProps: {
                                    innerHTML: '进行中',
                                }
                            })
                        }else if(this.row.recruitstatus==3){
                            return createElement('span', {
                                domProps: {
                                    innerHTML: '已结束',
                                }
                            })
                        }
                    }
                },
                {
                    prop: "",
                    label: "操作",
                    render: (h, param) => {
                        const dropDownData = {
                            label: "操作",
                            items: [{
                                    label: "修改",
                                    func: {
                                        func: "update",
                                        uuid: param.row.uuid
                                    }
                                },
                                {
                                    label: "设置负责人",
                                    func: {
                                        func: "view",
                                        uuid: param.row.uuid
                                    }
                                }
                            ]
                        };
                        // 触发MyDropDown的update和del事件
                        return h(MyDropDown, {
                            props: {
                                dropDownData: dropDownData
                            },
                            on: {
                                update: this.update,
                                view: this.view
                            }
                        });
                    }
                }
            ],
        }
    },
    mounted() {
        this.queryVolunteerListPost(this.pageNum, '');
        this.queryTypeDetailByTypeCodePost();
    },
    methods: {
        //查询服务类型明细
        queryTypeDetailByTypeCodePost(){
            queryTypeDetailByTypeCode({code: 'fwlx'}).then(data => {
                if(data.data.status==200){
                    this.typeCodeList = data.data.data
                }
            })
        },
        //查询列表
        queryVolunteerListPost(pageNum, name, type) {
            let params = {
                pageSize: this.pageSize,
                pageNum: pageNum,
                name: name,
            };
            queryVolunteerTeamList(params).then(data => {
                if(data.data.status==200){
                    this.total = data.data.total
					this.dataArray = data.data.data
                }
            })
        },
        //搜索
        searchSubmit() {
            this.queryVolunteerListPost(this.pageNum, this.formInline.real_name, this.formInline.typeId );            
        },
        //新增
        onClickAdd() {
            this.$router.push({path: '/home/volunteerAdd?type=1' })
        },
        //修改
        update(obj){
            this.$router.push({path: '/home/volunteerAdd?uuid='+obj+'&type=2' })
        },
        //设置负责人
        view(obj){
            this.$router.push({path: '/home/volunteerUser?uuid='+obj+'' })
        }
    }
}
</script>

<style lang="stylus">
.__volunteer {
    background #ffffff;
    padding 15px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
    border-radius: 4px;
    .formBox {
        border-bottom 1px solid #eee
    }
    .btnBox {
        margin 10px 0;
    }
}
</style>
