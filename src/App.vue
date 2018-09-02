<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
import axiosToken from '@/util/axiosToken'
import mutipartAxios from '@/util/mutipartAxios'
export default {
	created() {

		axiosToken.interceptors.request.use(
			config => {
				if (sessionStorage.getItem("user_id")) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
					config.headers.access_token = `${sessionStorage.getItem("user_id")}`;
				}
				return config;
			},
			err => {
				return Promise.reject(err);
			});

		//普通校验
		axiosToken.interceptors.response.use((respone) => {
			let source = respone.data;
			if (source.status != 200) {
				this.$alert(source.msg, '温馨提示',
					{
						confirmButtonText: '确定', callback: action => { }
					});
			}
			return respone
		}, err => {
			Toast(err)
		}
		)
		//上传校验
		mutipartAxios.interceptors.response.use((respone) => {
			let source = respone.data;
			if (source.status != 200) {
				this.$alert(source.msg, '温馨提示',
					{
						confirmButtonText: '确定', callback: action => { }
					});
			}
			return respone
		}, err => {
			Toast(err)
		}
		)
	}
};
</script>

<style>

</style>
