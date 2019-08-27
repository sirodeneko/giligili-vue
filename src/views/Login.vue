<template>
	<div class="login">
		<div class="title">登录：</div>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="账号" :rules="[{ required: true, message: '账号不能为空'},]">
				<el-input v-model="form.user_name"></el-input>
			</el-form-item>
			<el-form-item label="密码" :rules="[{ required: true, message: '密码不能为空'},]">
				<el-input type="password" v-model="form.password"></el-input>
			</el-form-item>
			<el-form-item>
				<GtPage @ok="ok"></GtPage>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">登录</el-button>
				<el-button @click.native="onRegister">注册</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>
<script src="http://static.geetest.com/static/tools/gt.js"></script>
<script>
	import * as API from '@/api/login';
	import GtPage from './GtPage.vue';
	export default {
		name: 'Login',
		data() {
			return {
				okk: 0,
				form: {
					user_name: '',
					password: '',
				},
			};
		},
		methods: {
			ok(val) {
				this.okk = val;
			},
			onSubmit() {
				if (this.okk == 1) {
					API.postLogin(this.form).then((res) => {
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
							this.$router.push({
								name: 'home'
							});
						}

					}).catch((error) => {
						this.$notify.error({
							title: '登录失败惹',
							message: error,
						});
					});
				}else{
					this.$notify.error({
						title: '请验证',
						message: '',
					});
				}

			},
			onRegister() {
				this.$router.push({
					name: 'Register'
				});
			},
		},

		comments: {},
		components: {
			GtPage,
		},
	};
</script>

<style>
	.title{
		font-family: Microsoft Yahei;
		font-weight: 500;
		font-size: 30px;
		padding: 20px;
	}
</style>
