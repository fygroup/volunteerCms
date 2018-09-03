<template>
	<div class="__residentAdd">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>{{$route.name}}</span>
			</div>

			<div class="__resident">
				<div class="btnBox" style="margin-bottom: 10px;">
					<el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">新增</el-button>
				</div>
				<div class="tableList">
					<vtable :dataArray="dataArray" :columns="columns" :total="total" :isSelection="isSelection" @getArticle="queryUserListPost"></vtable>
				</div>
			</div>

			<el-dialog title="新增" :visible.sync="dialogFormVisible" :modal-append-to-body="false" :close-on-click-modal="false">
				<div class="modelFromListBox">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="姓名" prop="roleId" class="form-control">
							<el-select v-model="ruleForm.roleId" placeholder="请选择姓名">
								<el-option v-for="(item,index) in userList" :key="index" :label="item.nick_name" :value="item.uuid"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click="resetForm('ruleForm')">取 消</el-button>
					<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
				</div>
			</el-dialog>

		</el-card>
	</div>
</template>

<script>
import { uploadPath } from "@/path/path";
import { getCookie, setCookie } from "@/util/cookie";
import { addVTeamUser, deleteVTeamUser, queryVTeamUserList } from "api/volunteer/index"; //查询服务类型明细
import table from '@/components/common/table'
import MyDropDown from '@/components/common/MyDropDown'
import { queryUserList } from "api/resident/index";

export default {
	components: {
		vtable: table
	},
	data() {
		return {
			dialogFormVisible: false,//弹窗
			userList: [],//查询用户
			ruleForm: {
				roleId: ''
			},
			rules: {
				roleId: [
					{ required: true, message: "请选择姓名", trigger: "change" },
				],
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
					prop: "phone",
					label: "手机号码",
				},
				{
					prop: "",
					label: "操作",
					render: (h, param) => {
						let dropDownData = {
							label: "操作",
							items: [{
								label: "删除",
								func: {
									func: "del",
									uuid: param.row.uuid
								}
							},
							]
						};
						// 触发MyDropDown的update和del事件
						return h(MyDropDown, {
							props: {
								dropDownData: dropDownData
							},
							on: {
								del: this.del
							}
						});
					}
				}
			],
		};
	},
	mounted() {
		this.queryUserListPost1();
		this.queryUserListPost();
	},
	methods: {
		//打开弹窗
		onClickAdd(){
			this.dialogFormVisible = true
		},
		//查询用户信息
		queryUserListPost1() {
			let params = {
				pageSize: 100,
				pageNum: 1,
			};
			queryUserList(params).then(data => {
				if (data.data.status == 200) {
					this.userList = data.data.data
				}
			})
		},
		//取消弹窗
		resetForm(ruleForm) {
            this.$refs[ruleForm].resetFields();
			this.dialogFormVisible = false
		},
		//提交
		submitForm(ruleForm) {
			this.$refs[ruleForm].validate(valid => {
				if (valid) {
                    var params = {
						volunteer_team_id: this.$route.query.uuid,
						user_id: this.ruleForm.roleId,
					}
					addVTeamUser(params).then(data => {
						if(data.data.status==200){
							this.$message({
								message: '新增成功！',
								type: 'success',
								duration: '500',
								onClose: function(){
									window.location.reload();
								}
							});
						}
					})
				} else {
				    return false;
				}
			});
		},
		
		queryUserListPost(pageNum){
			let params = {
                pageSize: this.pageSize,
				pageNum: pageNum,
				volunteer_team_id: this.$route.query.uuid,
            };
            queryVTeamUserList(params).then(data => {
                if(data.data.status==200){
                    this.total = data.data.total
					this.dataArray = data.data.data
                }
            })
		},

		del(uuid) {
			this.$confirm('取消管理员', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				deleteVTeamUser({
					volunteer_team_id: this.$route.query.uuid,
					user_id: uuid
				}).then(res => {
					this.$message({
						type: 'success',
						message: '设置成功!'
					});
					setTimeout(() => {
						location.reload();
					}, 500)
				})
			})
		},
		

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
