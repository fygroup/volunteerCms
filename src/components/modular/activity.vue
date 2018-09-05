<template>
    <div class="__activity">
        <div class="formBox">
            <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline">
                <el-form-item label="服务队名称：">
                    <el-input v-model="formInline.real_name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="服务类别：">
                    <el-select v-model="formInline.typeId" placeholder="请选择服务类别">
                        <el-option :label="item.name" :value="item.uuid" v-for="(item,index) in typeCodeList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="searchSubmit('formInline')">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="btnBox">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">发布活动</el-button>
        </div>
        <div class="tableList">
            <vtable :dataArray="dataArray" :columns="columns" :total="total" :isSelection="isSelection" @getArticle="queryActivityForManagerPost"></vtable>
        </div>
    </div>
</template>

<script>
import table from '@/components/common/table'
import MyDropDown from '@/components/common/MyDropDown'
import { getCookie, setCookie } from "@/util/cookie";
import { queryActivityForManager } from "api/activity/index";
import { queryTypeDetailByTypeCode } from "api/volunteer/index";//查询服务类型明细
import { deleteActivity } from "api/activity/index";
export default {
    components: {
        vtable: table
    },
    data() {
        return {
            formInline: {
                real_name: '',
                typeId: '153049725197393',
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
                    label: "活动名称",
                },
                {
                    prop: "activity_starttime",
                    label: "活动开始时间",
                },
                {
                    prop: "activity_endtime",
                    label: "活动结束时间",
                    width: ""
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
                                    label: "删除",
                                    func: {
                                        func: "del",
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
                                del: this.del
                            }
                        });
                    }
                }
            ],
        }
    },
    mounted() {
        this.queryActivityForManagerPost(this.pageNum, '', this.formInline.typeId);
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
        searchSubmit() {
            this.queryActivityForManagerPost(this.pageNum, this.formInline.real_name, this.formInline.typeId );            
        },
        onClickAdd() {
            this.$router.push({path: '/home/activityAdd?type=1' })
        },
        //修改
        update(obj){
            this.$router.push({path: '/home/activityAdd?uuid='+obj+'&type=2' })
        },
        //查询列表
        queryActivityForManagerPost(pageNum, name, type) {
            let params = {
                pageSize: this.pageSize,
                pageNum: pageNum,
                name: name,
            };
            queryActivityForManager(params).then(data => {
                if(data.data.status==200){
                    this.total = data.data.total
					this.dataArray = data.data.data
                }
            })
        },
        del(obj){
            this.$confirm('是否删除该活动?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteActivity({uuid: obj}).then(data => {
                    if(data.data.status==200){
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: '500',
                            onClose: function(){
                                window.location.reload();
                            }
                        });
                    }
                })
            }).catch(() => {
            });
        }
    }
}
</script>

<style lang="stylus">
.__activity {
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
