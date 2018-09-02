<template>
    <div class="__userAdd">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{$route.name}}</span>
            </div>
            <div class="addFromListBox">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="姓名" prop="name" class="form-control">
                        <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
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
import { upadteResident, queryResident, addResident } from "api/resident/index";
export default {
    data(){
        return {
            ruleForm: {
                name: '',
                sex: '',
                phone: '',
                card_number: '',
			},
			rules: {
				name: [
					{ required: true, message: "请输入姓名", trigger: "blur" },
					{ min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
                ],
                phone: [
                    { required: true, message: "请输入手机号码", trigger: "blur" },
                    { min: 11, max: 11, message: "请输入正确的手机号码", trigger: "blur" }
                ],
				card_number: [
                    { required: true, message: "请输入身份证号码", trigger: "blur" },
                    { min: 18, max: 18, message: "请输入正确的身份证号码", trigger: "blur" }
                ],
                sex: [
                    { required: true, message: "请选择性别", trigger: "change" },
                ]
			}
        }
    },
    mounted() {
        if(this.$route.query.type==2){
            this.queryUserPost(this.$route.query.uuid);//查询用户详情
        }
    },
    methods: {
        queryUserPost(obj){
            queryResident({uuid: obj}).then(data => {
                if(data.data.status==200){
                    this.ruleForm.name = data.data.data.name
                    this.ruleForm.sex = ''+data.data.data.sex+''
                    this.ruleForm.phone = data.data.data.phone
                    this.ruleForm.card_number = data.data.data.card_number
                }
            })
        },
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
                    this.paramsList();
				} else {
                    return false;
				}
			});
        },
        paramsList(){
            var uuid = '';
            if(this.$route.query.type==2){
                uuid = this.$route.query.uuid
            }
            let params = {
                uuid: uuid,
                name: this.ruleForm.name,
                sex: this.ruleForm.sex,
                phone: this.ruleForm.phone,
                card_number: this.ruleForm.card_number,
            };
            if(this.$route.query.type==1){
                addResident(params).then(data => {
                    var that = this;
                    if(data.data.status==200){
                        this.$message({
                            message: '新增成功！',
                            type: 'success',
                            duration: '500',
                            onClose: function () {
                                that.$router.push({path: '/home/user' })
                            }
                        });
                    }
                })
            }else {
                upadteResident(params).then(data => {
                    var that = this;
                    if(data.data.status==200){
                        this.$message({
                            message: '修改成功！',
                            type: 'success',
                            duration: '500',
                            onClose: function () {
                                that.$router.push({path: '/home/user' })
                            }
                        });
                    }
                })
            }
            
        },
	}
}
</script>

<style lang="stylus">
.__userAdd {
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
