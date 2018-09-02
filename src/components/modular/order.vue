<template>
	<div class="__resident">
		<div class="formBox">
			<el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline">
				<el-form-item label="姓名：">
					<el-input v-model="formInline.user_name" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item label="联系电话：">
					<el-input v-model="formInline.phone" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item label="服务类型：">
					<el-select v-model="formInline.type" placeholder="请选择服务类别">
                        <el-option :label="item.name" :value="item.uuid" v-for="(item,index) in typeCodeList" :key="index"></el-option>
                    </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="searchSubmit('formInline')">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="tableList">
			<vtable :dataArray="dataArray" :columns="columns" :total="total" :isSelection="isSelection" @getArticle="queryUserListPost"></vtable>
		</div>
	</div>
</template>

<script>
import table from '@/components/common/table'
import MyDropDown from '@/components/common/MyDropDown'
import { getCookie, setCookie } from "@/util/cookie";
import { queryBookingServiceForMySelf, updateBookingServiceRead } from "api/bookService/index";
import { queryTypeDetailByTypeCode } from "api/volunteer/index";//查询服务类型明细
export default {
	components: {
		vtable: table
	},
	data() {
		return {
			formInline: {
				user_name: '',
				phone: '',
				type: '',
			},
			typeCodeList: [],
			dataArray: [],
			pageSize: 10,
			pageNum: 1,
			total: 0,
			isSelection: false,
			columns: [
				{
					prop: "user_name",
					label: "用户名称",
				},
				{
					prop: "type_name",
					label: "预约服务类型",
				},
				{
					prop: "phone",
					label: "联系电话",
				},
				{
					prop: "booking_time",
					label: "预约时间",
				},
				{
					prop: "address",
					label: "预约地址",
				},
				{
					prop: "status",
					label: "状态",
					render: function(createElement) {
                        if(this.row.status==1){
                            return createElement('span', {
                                domProps: {
                                    innerHTML: '未完成',
                                }
                            })
                        }else if(this.row.status==2){
                            return createElement('span', {
                                domProps: {
                                    innerHTML: '已完成',
                                }
                            })
                        }
                    },
				},
				{
					prop: "",
					label: "操作",
					render: (h, param) => {
						if(param.row.status==1){
							const dropDownData = {
								label: "操作",
								items: [{
									label: "完成",
									func: {
										func: "update",
										uuid: param.row.uuid
									}
								},
								]
							};
							return h(MyDropDown, {
								props: {
									dropDownData: dropDownData
								},
								on: {
									update: this.update,
								}
							});
						}
					}
				}
			],
		}
	},
	mounted() {
		this.queryUserListPost(this.pageNum);
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
		searchSubmit(formName) {
			this.queryUserListPost(this.pageNum, this.formInline.user_name, this.formInline.phone, this.formInline.type );
		},
		onClickAdd() {
			this.$router.push({ path: '/home/residentAdd?type=1' })
		},
		//修改
		update(obj) {
			this.$confirm('是否设置为完成?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                updateBookingServiceRead({uuid: obj}).then(data => {
                    if(data.data.status==200){
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: '500',
                            onClose: function(){
                                window.location.reload();
                            }
                        });
                    }
                })
            }).catch(() => {
            });
			
		},
		//查询列表
		queryUserListPost(pageNum, user_name, phone, type ) {
			let params = {
				pageSize: this.pageSize,
				pageNum: pageNum,
				user_name: user_name,
				phone: phone,
				type: type,
			};
			queryBookingServiceForMySelf(params).then(data => {
				if (data.data.status == 200) {
					this.total = data.data.total
					this.dataArray = data.data.data
				}
			})
		},
	}
}
</script>

<style lang="stylus">
.__resident {
    background #ffffff;
    padding 15px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
    border-radius: 4px;
    .formBox {
        border-bottom 1px solid #eee
    }
    .btnBox {
        margin 10px 0;
    }
}
</style>