<template>
    <div class="__residentAdd">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{$route.name}}</span>
            </div>
            <div class="addFromListBox">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="姓名" prop="real_name" class="form-control">
                        <el-input v-model="ruleForm.real_name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="nick_name" class="form-control">
                        <el-input v-model="ruleForm.nick_name" placeholder="请输入昵称"></el-input>
                    </el-form-item>
                    <el-form-item label="用户头像">
                        <el-upload
                            class="avatar-uploader"
                            :action="serverUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="ruleForm.coverpic" :src="ruleForm.coverpic" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                            <el-option label="男" value="1"></el-option>
                            <el-option label="女" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phone" class="form-control">
                        <el-input v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号码" prop="card_number" class="form-control">
                        <el-input v-model="ruleForm.card_number" placeholder="请输入身份证号码"></el-input>
                    </el-form-item>
                    <el-form-item label="出生日期" prop="birthday" class="form-control">
                        <el-date-picker
                            v-model="ruleForm.birthday"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="请选择出生日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="居住地址" prop="domicile" class="form-control">
                        <el-input v-model="ruleForm.domicile" placeholder="请输入居住地址"></el-input>
                    </el-form-item>
                    <el-form-item label="职业" prop="vocation" class="form-control">
                        <el-input v-model="ruleForm.vocation" placeholder="请输入职业"></el-input>
                    </el-form-item>
                    <el-form-item label="所属行业" prop="industry" class="form-control">
                        <el-input v-model="ruleForm.industry" placeholder="请输入所属行业"></el-input>
                    </el-form-item>
                    <el-form-item label="用户角色" prop="role">
                        <el-select v-model="ruleForm.role" placeholder="请选择所属社区">
                            <el-option label="普通用户" value="1"></el-option>
                            <el-option label="志愿者团队管理员" value="2"></el-option>
                            <el-option label="社区管理员" value="3"></el-option>
                        </el-select>
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
import { updateUser, queryUser } from "api/resident/index";
import { uploadFile } from "api/upload/index";
export default {
    data(){
        return {
            serverUrl: uploadPath,
            fileArr: [],
            ruleForm: {
                coverpic: '',
                real_name: '',
                nick_name: '',
                head_url: '',
                sex: '',
                phone: '',
                card_number: '',
                birthday: '',
                domicile: '',
                vocation: '',
                industry: '',
                role: ''
			},
			rules: {
				// real_name: [
				// 	{ required: true, message: "请输入姓名", trigger: "blur" },
				// 	{ min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
                // ],
                // phone: [
                //     { required: true, message: "请输入手机号码", trigger: "blur" },
                //     { min: 11, max: 11, message: "请输入正确的手机号码", trigger: "blur" }
                // ],
				// card_number: [
                //     { required: true, message: "请输入身份证号码", trigger: "blur" },
                //     { min: 18, max: 18, message: "请输入正确的身份证号码", trigger: "blur" }
                // ],
                // role: [
                //     { required: true, message: "请选择用户角色", trigger: "blur" },
                // ]
			}
        }
    },
    mounted() {
        this.queryUserPost(this.$route.query.uuid);//查询用户详情
    },
    methods: {
        //封面
        handleAvatarSuccess(res, file) {
            this.ruleForm.coverpic = URL.createObjectURL(file.raw);
            this.fileArr = file.raw
        },
        // 上传图片前
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 10;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 10MB!');
            }
            return isLt2M;
        },
        queryUserPost(obj){
            queryUser({uuid: obj}).then(data => {
                if(data.data.status==200){
                    this.ruleForm.real_name = data.data.data.real_name
                    this.ruleForm.nick_name = data.data.data.nick_name
                    this.ruleForm.coverpic = data.data.data.head_url
                    if(data.data.data.sex!=''){
                        this.ruleForm.sex = ''+data.data.data.sex+''
                    }
                    this.ruleForm.phone = data.data.data.phone
                    this.ruleForm.card_number = data.data.data.card_number
                    this.ruleForm.birthday = data.data.data.birthday
                    this.ruleForm.domicile = data.data.data.domicile
                    this.ruleForm.vocation = data.data.data.vocation
                    this.ruleForm.industry = data.data.data.industry
                    this.ruleForm.role = ''+data.data.data.role+''
                }
            })
        },
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
                    if(this.fileArr!=''){
                        uploadFile(this.fileArr).then(data => {
                            if(data.data.status==200){
                                this.paramsList(data.data.data);
                            }
                        })
                    } else {
                        this.paramsList(this.ruleForm.coverpic);
                    }
				} else {
                    return false;
				}
			});
        },
        paramsList(head_url){
            let params = {
                uuid: this.$route.query.uuid,
                real_name: this.ruleForm.real_name,
                nick_name: this.ruleForm.nick_name,
                head_url: head_url,
                sex: this.ruleForm.sex,
                phone: this.ruleForm.phone,
                card_number: this.ruleForm.card_number,
                birthday: this.ruleForm.birthday,
                domicile: this.ruleForm.domicile,
                vocation: this.ruleForm.vocation,
                industry: this.ruleForm.industry,
                role: this.ruleForm.role
            };
            updateUser(params).then(data => {
                var _this = this;
                if(data.data.status==200){
                    this.$message({
                        message: '修改成功！',
                        type: 'success',
                        duration: '500',
                        onClose: function () {
                            _this.$router.push({path: '/home/resident'})
                        }
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
