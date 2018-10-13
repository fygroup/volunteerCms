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
            <upload ref="upload" :upload=upload2></upload>
          </el-form-item>
          <el-form-item label="活动时间" prop="activity_starttime" class="form-control">
            <el-date-picker v-model="ruleForm.activity_starttime" type="datetimerange" range-separator="至"
                            start-placeholder="活动开始时间" end-placeholder="活动结束时间" value-format="yyyy-MM-dd HH:mm:ss"
                            align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="报名时间" prop="sign_starttime" class="form-control">
            <el-date-picker v-model="ruleForm.sign_starttime" type="daterange" range-separator="至"
                            start-placeholder="活动报名开始时间" end-placeholder="活动报名结束时间" value-format="yyyy-MM-dd"
                            align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="所属类型" prop="volunteer_team_id">
            <el-select v-model="ruleForm.volunteer_team_id" placeholder="请选择所属类型">
              <el-option :label="item.name" :value="item.uuid" v-for="(item,index) in typeCodeList"
                         :key="index"></el-option>
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
  import upload from '@/components/common/upload'
  import {uploadPath} from '@/path/path'
  import {getCookie, setCookie} from "@/util/cookie";
  import {queryTypeDetailByTypeCode} from "api/volunteer/index";//查询服务类型明细
  import {addActivity} from "src/api/activity/index";//新增活动
  import {updateActivity} from "src/api/activity/index";//修改活动
  import {queryActivity} from "api/activity/index";//查看详情
  import {uploadFile} from "api/upload/index";
  export default {
    components: {
      upload
    },
    data() {
      return {
        upload2: {"id": "test2"},
        typeCodeList: [],//查询服务类型明细
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
          name: [
            {required: true, message: "请输入活动名称", trigger: "blur"},
            {min: 2, max: 64, message: "长度在 2 到 64 个字符", trigger: "blur"}
          ],
          activity_starttime: [
            {required: true, message: "请选择活动时间", trigger: "change"},
          ],
          sign_starttime: [
            {required: true, message: "请选择报名时间", trigger: "change"},
          ],
          volunteer_team_id: [
            {required: true, message: "请选择所属类型", trigger: "change"},
          ],
          limit_people: [
            {required: true, message: "请输入人数限制", trigger: "blur"},
            {pattern: /^[0-9]*$/, message: '请输入整数'},
          ],
          activity_place: [
            {required: true, message: "请输入活动地点", trigger: "blur"},
          ]
        }
      }
    },
    mounted() {
      this.queryTypeDetailByTypeCodePost();
      if (this.$route.query.type == 2) {
        this.queryVolunteerTeamPost();
      }
    },
    methods: {
      //查询服务类型明细
      queryTypeDetailByTypeCodePost() {
        queryTypeDetailByTypeCode({code: 'fwlx'}).then(data => {
          if (data.data.status == 200) {
            this.typeCodeList = data.data.data
          }
        })
      },
      //根据uuid查看详情
      queryVolunteerTeamPost() {
        queryActivity({uuid: this.$route.query.uuid}).then(data => {
          if (data.data.status == 200) {
            this.ruleForm.name = data.data.data.name
            if (data.data.data.cover!='') {
              this.$refs.upload.dataListsingle = data.data.data.cover
            }
            this.ruleForm.activity_starttime = [data.data.data.activity_starttime, data.data.data.activity_endtime]
            this.ruleForm.sign_starttime = [data.data.data.sign_starttime, data.data.data.sign_endtime]
            this.ruleForm.limit_people = data.data.data.limit_people

            this.ruleForm.activity_place = data.data.data.activity_place
            this.ruleForm.activity_detail = data.data.data.activity_detail
            this.ruleForm.volunteer_team_id = '' + data.data.data.limit_people + ''
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
      paramsList() {
        let cover;
        if(this.$refs.upload.dataListsingle=='static/upload/upload-120-120.png'){
          cover = ''
        }else {
          cover = this.$refs.upload.dataListsingle
        }
        let uuid;
        if (this.$route.query.type == 1) {
          uuid = ''
        }else if(this.$route.query.type == 2){
          uuid = this.$route.query.uuid
        }
        let params = {
          uuid: uuid,
          name: this.ruleForm.name,
          activity_starttime: this.ruleForm.activity_starttime[0],
          activity_endtime: this.ruleForm.activity_starttime[1],
          sign_starttime: this.ruleForm.sign_starttime[0],
          sign_endtime: this.ruleForm.sign_starttime[1],
          limit_people: this.ruleForm.limit_people,
          activity_place: this.ruleForm.activity_place,
          activity_detail: this.ruleForm.activity_detail,
          volunteer_team_id: this.ruleForm.volunteer_team_id,
          cover: cover
        };
        if (this.$route.query.type == 1) {
          addActivity(params).then(data => {
            var _this = this;
            if (data.data.status == 200) {
              this.$message({
                message: '新增成功！',
                type: 'success',
                duration: '500',
                onClose: function () {
                  _this.$router.push({path: '/home/activity'})
                }
              });
            }
          })
        }else if(this.$route.query.type == 2){
          updateActivity(params).then(data => {
            var _this = this;
            if (data.data.status == 200) {
              this.$message({
                message: '修改成功！',
                type: 'success',
                duration: '500',
                onClose: function () {
                  _this.$router.push({path: '/home/activity'})
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
