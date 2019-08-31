<template>
	<div class="login">
		<div class="main-contianer">
		<div class="mycard">
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
		</div></div>
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
							this.$cookies.set("gin-ess","6666",3600*24*6); 
							this.$notify({
								title: '登录成功',
								message: 'success',
								type: 'success',
							});
							//传递信号给导航条组件
							this.$bus.emit('myspace');
							//跳转首页
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
	.login{
	/* 	///background:url(../../public/56784491_p0.jpg)  no-repeat; */
	}
	.title{
		font-family: Microsoft Yahei;
		font-weight: 500;
		font-size: 30px;
		padding: 20px;
	}
	.mycard{
		margin: 0 auto;
		padding: 10px;
		    background: #fff;
		    border: 1px solid #eee;
		    border-radius: 4px;
		    
		    padding: 15px 20px;
		    width: 700px;
	}
</style>
