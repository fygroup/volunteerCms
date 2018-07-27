<template>
    <div class="__hotline">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{$route.name}}</span>
            </div>
            <div class="addFromListBox">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                    <el-form-item label="社区服务热线" prop="phone" class="form-control">
                        <el-input v-model="ruleForm.phone" placeholder="请输入社区服务热线"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import { getCookie, setCookie } from "@/util/cookie";
import { queryHotline, updateHotline } from "api/hotline/index";
export default {
    data(){
        return {
            ruleForm: {
                phone: '',
			},
			rules: {
				phone: [
					{ required: true, message: "请输入请输入社区服务热线", trigger: "blur" },
                ],
			}
        }
    },
    mounted() {
        this.queryHotlinePost()
    },
    methods: {
        queryHotlinePost(){
            queryHotline().then(data => {
                if(data.data.status==200){
                    this.ruleForm.phone = data.data.data.phone
                }
            })
        },
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
                    let params = {
                        uuid: 1,
                        phone: this.ruleForm.phone,
                    };
                    updateHotline(params).then(data => {
                        if(data.data.status==200){
                            this.$alert("提交成功！", '温馨提示',
                                { confirmButtonText: '确定', callback: action => { }
                            });
                        }
                    })
				} else {
                    return false;
				}
			});
        },
	}
}
</script>

<style lang="stylus">
.__hotline {
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
}
</style>
