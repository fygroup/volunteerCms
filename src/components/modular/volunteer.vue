<template>
    <div class="__volunteer">
        <div class="formBox">
            <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline">
                <el-form-item label="姓名：">
                    <el-input v-model="formInline.real_name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号码：">
                    <el-input v-model="formInline.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="性别：">
                    <el-select v-model="formInline.sex" placeholder="请选择性别">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户标签：">
                    <el-select v-model="formInline.role" placeholder="请选择用户标签">
                        <el-option label="普通用户" value="1"></el-option>
                        <el-option label="志愿者团队管理员" value="2"></el-option>
                        <el-option label="社区管理员" value="3"></el-option>
                    </el-select>
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
            <vtable :dataArray="dataArray" :columns="columns" :total="total" :isSelection="isSelection" @getArticle="queryUserListPost"></vtable>
        </div>
    </div>
</template>

<script>
import table from '@/components/common/table'
import MyDropDown from '@/components/common/MyDropDown'
import { getCookie, setCookie } from "@/util/cookie";
import { queryVolunteerTeamList } from "api/volunteer/index";
export default {
    components: {
        vtable: table
    },
    data() {
        return {
            formInline: {
                real_name: '',
                phone: '',
                sex: '',
                role: ''
            },
            dataArray: [],
            pageSize: 10,
            pageNum: 1,
            total: 0,
            isSelection: false,
            columns: [
                {
                    prop: "nick_name",
                    label: "用户昵称",
                    width: ""
                },
                {
                    prop: "real_name",
                    label: "姓名",
                    width: ""
                },
                {
                    prop: "sex",
                    label: "性别",
                    width: "",
                    render: function(createElement) {
                        if(this.row.sex==1){
                            return createElement('span', {
                                domProps: {
                                    innerHTML: '男',
                                }
                            })
                        }else if(this.row.sex==2){
                            return createElement('span', {
                                domProps: {
                                    innerHTML: '女',
                                }
                            })
                        }
                    },
                },
                {
                    prop: "phone",
                    label: "手机号码",
                    width: ""
                },
                {
                    prop: "card_number",
                    label: "身份证号码",
                    width: ""
                },
                {
                    prop: "is_authentication",
                    label: "是否实名",
                    width: "",
                    render: function(h, param) {
                        let html = "";
                        if(param.row.sex == 1) {
                            html = "是";
                        } else if(param.row.sex == 2) {
                            html = "否";
                        }
                        return html;
                    }
                },
                {
                    prop: "role",
                    label: "用户标签",
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
        this.queryVolunteerListPost(this.pageNum);
    },
    methods: {
        searchSubmit(formName) {
            this.queryVolunteerListPost(this.pageNum, this.formInline.real_name, this.formInline.phone, this.formInline.sex, this.formInline.role,);
            // this.$nextTick(function() {
            //     this.$refs["formReset"].resetFields();
            // })
        },
        onClickAdd() {
            this.$router.push({path: '/home/volunteerAdd?type=1' })
        },
        //修改
        update(obj){
            this.$router.push({path: '/home/volunteerAdd?uuid='+obj+'' })
        },
        //查询列表
        queryVolunteerListPost(pageNum, real_name, phone, sex, role) {
            let params = {
                pageSize: this.pageSize,
                pageNum: pageNum,
                real_name: real_name,
                phone: phone,
                sex: sex,
                role: role,
            };
            queryVolunteerTeamList(params).then(data => {
                if(data.data.status==200){
                    this.total = data.data.total
					this.dataArray = data.data.data
                }
            })
        },
        del(){

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
