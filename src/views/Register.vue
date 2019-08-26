<template>
	<div class="register">
		<h2>注册：</h2>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="用户昵称" :rules="[{ required: true, message: '账号不能为空'},]">
				<el-input v-model="form.nickname"></el-input>
			</el-form-item>
			<el-form-item label="账号" :rules="[{ required: true, message: '账号不能为空'},]">
				<el-input v-model="form.user_name"></el-input>
			</el-form-item>
			
			<el-form-item label="密码" :rules="[{ required: true, message: '密码不能为空'},]">
				<el-input type="password" v-model="form.password"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" :rules="[{ required: true, message: '密码不能为空'},]">
				<el-input type="password" v-model="form.password_confirm"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">注册</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import * as API from '@/api/login';
	export default {
		name: 'Register',
		data() {
			return {
				form: {
					nickname: '',
					user_name: '',
					password: '',
					password_confirm: '',
				},
			};
		},
		methods: {
			onSubmit() {
				API.postRegister(this.form).then((res) => {
					if (res.status > 0) {
						this.$notify.error({
							title: '登录失败',
							message: res.msg,
						});
					} else {
						this.$notify({
							title: '登录成功',
							message: 'success',
							type: 'success',
						});
						this.$router.push({ name:'Login'});
					}
	
				}).catch((error) => {
					this.$notify.error({
						title: '登录失败惹',
						message: error,
					});
				});
			},
		},
		
		comments: {},
	};
</script>

<style>
</style>

