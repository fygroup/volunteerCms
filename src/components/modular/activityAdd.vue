<template>
    <div class="__residentAdd">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{$route.name}}</span>
            </div>
            <div class="addFromListBox">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="活动名称" prop="name" class="form-control">
                        <el-input v-model="ruleForm.name" placeholder="请输入活动名称"></el-input>
                    </el-form-item>
                    <el-form-item label="活动封面" prop="cover" class="form-control">
                        <el-upload
                            class="avatar-uploader"
                            :action="serverUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            >
                            <img v-if="ruleForm.cover" :src="ruleForm.cover" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="活动时间" prop="activity_starttime" class="form-control">
                        <el-date-picker
                            v-model="ruleForm.activity_starttime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="活动开始时间"
                            end-placeholder="活动结束时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            align="right">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="报名时间" prop="sign_starttime" class="form-control">
                        <el-date-picker
                            v-model="ruleForm.sign_starttime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="活动报名开始时间"
                            end-placeholder="活动报名结束时间"
                            value-format="yyyy-MM-dd"
                            align="right">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="所属类型" prop="volunteer_team_id">
                        <el-select v-model="ruleForm.volunteer_team_id" placeholder="请选择所属类型">
                            <el-option :label="item.name" :value="item.uuid" v-for="(item,index) in typeCodeList" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="人数限制" prop="limit_people" class="form-control">
                        <el-input v-model="ruleForm.limit_people" placeholder="请输入人数限制"></el-input>
                    </el-form-item>
                    <el-form-item label="活动地点" prop="activity_place" class="form-control">
                        <el-input v-model="ruleForm.activity_place" placeholder="请输入活动地点"></el-input>
                    </el-form-item>
                    <el-form-item label="活动详情" prop="activity_detail" class="form-control">
                        <el-input type="textarea" v-model="ruleForm.activity_detail" placeholder="写点什么吧！"></el-input>
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
import { addActivity } from "api/activity/index";//新增活动
import { queryVolunteerTeam } from "api/activity/index";//查看详情
import { uploadFile } from "api/upload/index";
export default {
    data(){
        return {
            typeCodeList: [],//查询服务类型明细
            dialogVisible: false,
            serverUrl: uploadPath,
            fileArr: [],
            ruleForm: {
                name: '',
                cover: '',
                activity_starttime: '',
                activity_endtime: '',
                sign_starttime: '',
                sign_endtime: '',
                limit_people: '',
                activity_place: '',
                activity_detail: '',
                volunteer_team_id: ''
            },
            rules: {
				// name: [
				// 	{ required: true, message: "请输入活动名称", trigger: "blur" },
				// 	{ min: 2, max: 64, message: "长度在 2 到 64 个字符", trigger: "blur" }
                // ],
                // activity_starttime: [
                //     { required: true, message: "请选择活动时间", trigger: "change" },
                // ],
                // sign_starttime: [
                //     { required: true, message: "请选择报名时间", trigger: "change" },
                // ],
                // volunteer_team_id: [
                //     { required: true, message: "请选择所属类型", trigger: "change" },
                // ],
                // limit_people: [
                //     { required: true, message: "请输入人数限制", trigger: "blur" },
                //     { pattern: /^[0-9]*$/, message: '请输入整数' },
                // ],
                // activity_place: [
                //     { required: true, message: "请输入活动地点", trigger: "blur" },
                // ]
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
            this.ruleForm.cover = URL.createObjectURL(file.raw);
            let arr = file.raw
            this.fileArr.push(arr)
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
                }
            })
        },
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
                    // console.log(this.fileArr)
                    // uploadFile(this.fileArr).then(data => {
                        
                    //     if(data.data.status==200){
                    //         debugger
                    //     }
                    // })
                    this.paramsList();
				} else {
                    return false;
				}
			});
        },
        paramsList(head_url){
            let params = {
                name: this.ruleForm.name,
                activity_starttime: this.ruleForm.activity_starttime[0],
                activity_endtime: this.ruleForm.activity_starttime[1],
                sign_starttime: this.ruleForm.sign_starttime[0],
                sign_endtime: this.ruleForm.sign_starttime[1],
                limit_people: this.ruleForm.limit_people,
                activity_place: this.ruleForm.activity_place,
                activity_detail: this.ruleForm.activity_detail,
                volunteer_team_id: this.ruleForm.volunteer_team_id,
                cover: this.ruleForm.cover
            };
            addActivity(params).then(data => { 
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
