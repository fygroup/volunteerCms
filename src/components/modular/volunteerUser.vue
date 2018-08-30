<template>
  <div class="__residentAdd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$route.name}}</span>
      </div>

      <div class="__resident">
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
          <!--<el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">新增</el-button>-->
        </div>
        <div class="tableList">
          <vtable :dataArray="dataArray" :columns="columns" :total="total" :isSelection="isSelection"
                  @getArticle="queryUserListPost"></vtable>
        </div>
      </div>

    </el-card>
  </div>
</template>

<script>
  import {uploadPath} from "@/path/path";
  import {getCookie, setCookie} from "@/util/cookie";
  import {queryTypeDetailByTypeCode, addVTeamUser, deleteVTeamUser} from "api/volunteer/index"; //查询服务类型明细
  import {queryVolunteerTeam} from "api/volunteer/index"; //查看详情
  import {uploadFile} from "api/upload/index";
  import table from '@/components/common/table'
  import MyDropDown from '@/components/common/MyDropDown'
  import {queryUserList} from "api/resident/index";

  export default {
    components: {
      vtable: table
    },
    data() {
      return {
        typeCodeList: [],//查询服务类型明细
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          email: ''
        },
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
          },
          {
            prop: "real_name",
            label: "姓名",
          },
          {
            prop: "sex",
            label: "性别",
            render: function (createElement) {
              if (this.row.sex == 1) {
                return createElement('span', {
                  domProps: {
                    innerHTML: '男',
                  }
                })
              } else if (this.row.sex == 2) {
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
          },
          {
            prop: "card_number",
            label: "身份证号码",
          },
          {
            prop: "is_authentication",
            label: "是否实名",
            render: function (createElement) {
              if (this.row.is_authentication == 1) {
                return createElement('span', {
                  domProps: {
                    innerHTML: '是',
                  }
                })
              } else if (this.row.is_authentication == 2) {
                return createElement('span', {
                  domProps: {
                    innerHTML: '否',
                  }
                })
              }
            }
          },
          {
            prop: "role",
            label: "角色",
            render: function (createElement) {
              if (this.row.role == 1) {
                return createElement('span', {
                  domProps: {
                    innerHTML: '普通用户',
                  }
                })
              } else if (this.row.role == 2) {
                return createElement('span', {
                  domProps: {
                    innerHTML: '志愿者团队管理员',
                  }
                })
              } else if (this.row.role == 3) {
                return createElement('span', {
                  domProps: {
                    innerHTML: '社区管理员',
                  }
                })
              }
            }
          },
          {
            prop: "",
            label: "操作",
            render: (h, param) => {
              let dropDownData = {
                label: "操作",
                items: [{
                  label: "设置为负责人",
                  func: {
                    func: "update",
                    uuid: param.row.uuid
                  }
                },
                ]
              };

              if(param.row.role == 2) {
                //管理员
                dropDownData.items.push({
                  label: '删除',
                  func: {
                    func: 'del',
                    uuid: param.row.uuid
                  }
                })
              }

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
      };
    },
    mounted() {
      this.queryTypeDetailByTypeCodePost();
      this.queryUserListPost(this.pageNum);
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
      searchSubmit(formName) {
        this.queryUserListPost(this.pageNum, this.formInline.real_name, this.formInline.phone, this.formInline.sex, this.formInline.role,);
        // this.$nextTick(function() {
        //     this.$refs["formReset"].resetFields();
        // })
      },
      //查询列表
      queryUserListPost(pageNum, real_name, phone, sex, role) {
        let params = {
          pageSize: this.pageSize,
          pageNum: pageNum,
          real_name: real_name,
          phone: phone,
          sex: sex,
          role: role,
        };
        queryUserList(params).then(data => {
          if (data.data.status == 200) {
            this.total = data.data.total
            this.dataArray = data.data.data
          }
        })
      },
      /* 设置为负责人 */
      update(uuid) {
        this.$confirm('是否设置为负责人？？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let team_id = this.$route.query.uuid;
          addVTeamUser({
            volunteer_team_id: team_id,
            user_id: uuid
          }).then(res => {
            this.$message({
              type: 'success',
              message: '设置成功!'
            });
            setTimeout(()=>{
              location.reload();
            },500)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消设置'
          });
        });
      },
      del(uuid) {
        this.$confirm('取消管理员', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let team_id = this.$route.query.uuid;
          deleteVTeamUser({
            volunteer_team_id: team_id,
            user_id: uuid
          }).then(res=>{
            this.$message({
              type: 'success',
              message: '设置成功!'
            });
            setTimeout(()=>{
              location.reload();
            },500)
          })
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
              if (data.data.status == 200) {
                this.$alert("提交成功！", '温馨提示',
                  {
                    confirmButtonText: '确定', callback: action => {
                    }
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
