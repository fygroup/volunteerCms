<template>
  <div class="__picturesAdd__">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新增轮播图</span>
      </div>
      <div class="addFromListBox">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="标题" prop="title" class="form-control">
            <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="外链接" prop="fUrl" class="form-control">
            <el-input v-model="ruleForm.fUrl" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <upload ref="upload" :upload=upload2></upload>
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
  import upload from 'src/components/common/upload'
  import {addPictures} from "api/pictures/index";//新增
  import {upadtePictures} from "api/pictures/index";//修改
  import {queryOnePictures} from "api/pictures/index";//详情
  export default {
    name: "picturesAdd",
    components: {upload},
    data() {
      return {
        upload2: {"id": "test2"},
        ruleForm: {
          title: "",
          weight: "",
          fUrl: ''
        },
        rules: {}
      }
    },
    created() {
      if (this.$route.query.type == 2) {
        queryOnePictures({uuid: this.$route.query.uuid}).then(data => {
          let d = data.data.data;
          this.ruleForm.title = d.title;
          this.ruleForm.weight = d.weight;
          this.ruleForm.fUrl = d.fUrl;
          if(!d.url) {
            this.$refs.upload.dataListsingle =  'static/upload/upload-120-120.png'
          }else{
            this.$refs.upload.dataListsingle = d.url;
          }
        })
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if(valid) {
            if (this.$route.query.type == 1) {
              var headPic = ''
              if(this.$refs.upload.dataListsingle=='static/upload/upload-120-120.png'){
                alert('图片是必填的');
                headPic = '';
                return;
              }else{
                headPic = this.$refs.upload.dataListsingle;
              }
              let params = {
                title: this.ruleForm.title,
                weight: this.ruleForm.weight,
                url: headPic,
                fUrl: this.ruleForm.fUrl
              };
              addPictures(params).then(data => {
                var _this = this;
                if (data.data.status == 200) {
                  this.$message({
                    message: '新增成功！',
                    type: 'success',
                    duration: '500',
                    onClose: function () {
                      _this.$router.go(-1)
                    }
                  });
                }
              })
            }else if (this.$route.query.type == 2) {
              var headPic = ''
              if(this.$refs.upload.dataListsingle=='static/upload/upload-120-120.png'){
                alert('图片是必填的');
                headPic = '';
                return;
              }else{
                headPic = this.$refs.upload.dataListsingle;
              }
              let params = {
                title: this.ruleForm.title,
                weight: this.ruleForm.weight,
                url: headPic,
                fUrl: this.ruleForm.fUrl,
                uuid: this.$route.query.uuid
              };
              upadtePictures(params).then(data => {
                var _this = this;
                if (data.data.status == 200) {
                  this.$message({
                    message: '修改成功！',
                    type: 'success',
                    duration: '500',
                    onClose: function () {
                      _this.$router.go(-1)
                    }
                  });
                }
              })
            }


            /*var headPic = ''
            if(this.$refs.upload.dataListsingle=='static/upload/upload-120-120.png'){
              alert('图片是必填的');
              headPic = '';
              return;
            }else{
              headPic = this.$refs.upload.dataListsingle;
            }


            var p = {
              title: this.ruleForm.title,
              weight: this.ruleForm.weight,
              url: headPic,
              fUrl: this.ruleForm.fUrl
            }

            var u = '';
            if(this.$route.query.uuid) {
              u = '/wxbacksys/pictures/update'
              p.uuid = this.$route.query.uuid
            }else{
              u = '/wxbacksys/pictures/add'
            }

            this.$api.postAndJson(u, p).then(res=> {
              this.$router.go(-1)
            })*/
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
