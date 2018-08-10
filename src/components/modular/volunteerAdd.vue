<template>
    <div class="__residentAdd">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{$route.name}}</span>
            </div>
            <div class="addFromListBox">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="团队名称" prop="name" class="form-control">
                        <el-input v-model="ruleForm.name" placeholder="请输入团队名称"></el-input>
                    </el-form-item>
                    <el-form-item label="活动封面图">
                        <el-upload
                            class="avatar-uploader"
                            :action="serverUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="ruleForm.head_url" :src="ruleForm.head_url" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="所属类型" prop="type">
                        <el-select v-model="ruleForm.type" placeholder="请选择所属类型">
                            <el-option :label="item.name" :value="item.uuid" v-for="(item,index) in typeCodeList" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服务类型" prop="service_type" class="form-control">
                        <el-input v-model="ruleForm.service_type" placeholder="请输入服务类型"></el-input>
                    </el-form-item>
                    <el-form-item label="加入方式" prop="join_type" class="form-control">
                        <el-input v-model="ruleForm.join_type" placeholder="请输入加入方式"></el-input>
                    </el-form-item>
                    <el-form-item label="招募时间" prop="recruit_starttime" class="form-control">
                        <el-date-picker
                            v-model="ruleForm.recruit_starttime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="招募开始时间"
                            end-placeholder="招募结束时间"
                            value-format="yyyy-MM-dd"
                            align="right">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="服务时间" prop="service_time" class="form-control">
                        <el-date-picker
                            v-model="ruleForm.service_time"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="date"
                            placeholder="请选择服务时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="简介" prop="introduction" class="form-control">
                        <el-input type="textarea" v-model="ruleForm.introduction" placeholder="写点什么吧！"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import { uploadPath } from '@/path/path'
import { getCookie, setCookie } from "@/util/cookie";
import { queryTypeDetailByTypeCode } from "api/volunteer/index";//查询服务类型明细
import { addVolunteerTeam } from "api/volunteer/index";//新增志愿者团队
import { queryVolunteerTeam } from "api/volunteer/index";//查看详情
import { uploadFile } from "api/upload/index";
export default {
    data(){
        return {
            typeCodeList: [],//查询服务类型明细
            dialogVisible: false,
            serverUrl: uploadPath,
            ruleForm: {
                name: '',
                type: '',
                service_type: '',
                recruit_starttime: '',
                recruit_endtime: '',
                service_time: '',
                introduction: '',
                pictureList: [],
                join_type: '',
                head_url: ''
            },
            rules: {
				name: [
					{ required: true, message: "请输入团队名称", trigger: "blur" },
					{ min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
                ],
                service_type: [
                    { required: true, message: "请选择服务类型", trigger: "blur" },
                ],
                type: [
                    { required: true, message: "请选择所属类型", trigger: "change" },
                ],
                recruit_starttime: [
                    { required: true, message: "请选择招募时间", trigger: "change" },
                ],
                service_time: [
                    { required: true, message: "请选择服务时间", trigger: "change" },
                ],
                join_type: [
                    { required: true, message: "请输入加入方式", trigger: "blur" },
                ]
			}
        }
    },
    mounted() {
        this.queryTypeDetailByTypeCodePost();
        if(this.$route.query.type==2){
            this.queryVolunteerTeamPost();
        }
    },
    methods: {
         // 上传图片成功
        handleAvatarSuccess(res, file) {
            this.ruleForm.head_url = res.data
        },
        // 上传图片前
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 10;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 10MB!');
            }
            return isLt2M;
        },
        //查询服务类型明细
        queryTypeDetailByTypeCodePost(){
            queryTypeDetailByTypeCode({code: 'fwlx'}).then(data => {
                if(data.data.status==200){
                    this.typeCodeList = data.data.data
                }
            })
        },
        //根据uuid查看详情
        queryVolunteerTeamPost(){
            queryVolunteerTeam({uuid: this.$route.query.uuid}).then(data => { 
                if(data.data.status==200){
                    console.log(data.data)
                    this.ruleForm.name = data.data.data.name
                    this.ruleForm.type = ''+data.data.data.type+''
                    this.ruleForm.service_type = data.data.data.service_type
                    this.ruleForm.join_type = data.data.data.join_type
                    this.ruleForm.recruit_starttime = [ data.data.data.recruit_starttime, data.data.data.recruit_endtime ]
                    this.ruleForm.service_time = data.data.data.service_time
                    this.ruleForm.introduction = data.data.data.introduction
                }
            })
        },
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
                    this.paramsList()
				} else {
                    return false;
				}
			});
        },
        paramsList(head_url){
            let params = {
                name: this.ruleForm.name,
                type: this.ruleForm.type,
                service_type: this.ruleForm.service_type,
                join_type: this.ruleForm.join_type,
                recruit_starttime: this.ruleForm.recruit_starttime[0],
                recruit_endtime: this.ruleForm.recruit_starttime[1],
                service_time: this.ruleForm.service_time,
                introduction: this.ruleForm.introduction,
                pictureList: [],
            };
            console.log(JSON.stringify(params))
            addVolunteerTeam(params).then(data => { 
                if(data.data.status==200){
                    this.$alert("提交成功！", '温馨提示',
                        { confirmButtonText: '确定', callback: action => { }
                    });
                }
            })
        },
	}
}
</script>

<style lang="stylus">
.__residentAdd {
    .addFromListBox {
		width 960px;
		.form-control {
			width 60%;
		}
		.el-textarea {
			textarea {
				height 90px;
			}
		}
	}
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
}
</style>
