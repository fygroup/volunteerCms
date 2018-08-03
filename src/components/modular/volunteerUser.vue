<template>
    <div class="__residentAdd">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{$route.name}}</span>
            </div>
            <div class="addFromListBox">
                <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                    <el-form-item
                        v-for="(domain, index) in dynamicValidateForm.domains"
                        :label="'负责人' + index"
                        :key="domain.key"
                        :prop="'domains.' + index + '.value'"
                        :rules="{
                            required: true, message: '请选择负责人', trigger: 'change'
                        }"
                    >
                        <el-select v-model="domain.value" filterable placeholder="请选择所属类型" style="width: 400px; margin-right: 15px;">
                            <el-option :label="item.name" :value="item.uuid" v-for="(item,index) in typeCodeList" :key="index"></el-option>
                        </el-select>
                        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="addDomain">新增负责人</el-button>
                        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import { uploadPath } from "@/path/path";
import { getCookie, setCookie } from "@/util/cookie";
import { queryTypeDetailByTypeCode } from "api/volunteer/index"; //查询服务类型明细
import { addVTeamUser } from "api/volunteer/index"; //新增志愿者团队
import { queryVolunteerTeam } from "api/volunteer/index"; //查看详情
import { uploadFile } from "api/upload/index";
export default {
  data() {
      return {
        typeCodeList: [],//查询服务类型明细
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          email: ''
        }
      };
    },
    mounted() {
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
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        name: this.ruleForm.name,
                        activity_starttime: this.ruleForm.activity_starttime[0],
                    };
                    addVTeamUser(params).then(data => { 
                        if(data.data.status==200){
                            this.$alert("提交成功！", '温馨提示',
                                { confirmButtonText: '确定', callback: action => { }
                            });
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        removeDomain(item) {
            var index = this.dynamicValidateForm.domains.indexOf(item)
            if (index !== -1) {
            this.dynamicValidateForm.domains.splice(index, 1)
            }
        },
        addDomain() {
            this.dynamicValidateForm.domains.push({
            value: '',
            key: Date.now()
            });
        }
    }
}
</script>

<style lang="stylus">
.__residentAdd {
    .addFromListBox {
        width: 960px;

        
    }

   
}
</style>
