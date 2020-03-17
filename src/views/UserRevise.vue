<template>
	<div class="revise-content">
		<div class="revise-main">
			<el-form ref="form" :model="form" label-width="90px">
				<el-form-item label="昵称" :rules="[{ required: true, message: '不能为空'},]">
					<el-col :span="6">
						<el-input v-model="form.nickname" :span="11" ></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="我的生日" :rules="[{ required: true, message: '不能为空'},]">
					<el-col :span="6">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.birthdays" style="width: 100%;" value-format="timestamp"></el-date-picker>
					</el-col>

				</el-form-item>
				<el-form-item label="性别" :rules="[{ required: true, message: '不能为空'},]">
					<el-radio-group v-model="form.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
						<el-radio label="保密"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="头像" :rules="[{ required: true, message: '封面不能为空'},]">
					<el-upload class="avatar-uploader" action="" label="描述" ref="upload" 
					:before-upload="fnBeforeUpload" 
					:http-request="fnUploadRequest"
					 :show-file-list="false">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						<div class="el-upload__tip" slot="tip">只能上传png/jpg文件，且不超过2M</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="公告" :rules="[{ required: true, message: '不能为空'},]">
					<el-col :span="12">
					<el-input type="textarea" v-model="form.sign"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">保存</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import * as API from '@/api/login';
	import * as uplpadAPI from '@/api/upload/';
	export default {
		data() {
			return {
				imageUrl: '',
				
				form: {
					nickname: "",
					birthdays:"",
					birthday:"",
					sex:"",
					sign:"",
					avatar:"",
				}
			}
		},
		methods: {
			fnBeforeUpload(file) {
				const isPNG = (file.type === 'image/png' || file.type === 'image/jpeg');
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isPNG) {
					this.$message.error('上传头像图片只能是 PNG/JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isPNG && isLt2M;
			},
			fnUploadRequest(option) {
				uplpadAPI.postUploadToken(option.file.name).then((res) => {
					const oReq = new XMLHttpRequest();
					oReq.open('PUT', res.data.put, true);
					oReq.send(option.file);
					oReq.onload = () => {
						this.imageUrl = res.data.get;
						this.form.avatar = res.data.key;
					};
				}).catch((error) => {
					this.$notify.error({
						title: '网路错误，或者服务器宕机',
						message: error,
					});
				});
			},
			load() {
				API.getMe().then((res) => {
					this.form.nickname=res.data.nickname;
					this.form.sign=res.data.sign;
					this.form.sex=res.data.sex;
					this.form.birthdays=res.data.birthday*1000;
					this.imageUrl=res.data.avatar;
					this.form.avatar=unescape(res.data.avatar);//将url字符串解码为正常字符串
				});
				
			},
			onSubmit() {
				this.form.birthday=this.form.birthdays/1000;
				console.log(this.form);
				API.putRevise(this.form).then((res) => {
					if (res.status > 0) {
						this.$notify.error({
							title: '修改失败',
							message: res.msg,
						});
					} else {
						this.$notify({
							title: '修改成功',
							type: 'success',
						});
					}
				}).catch((error) => {
					this.$notify.error({
						title: '修改失败惹',
						message: error,
					});
				});
			}
		},
		beforeMount() {
			this.load();
		},
	}
</script>

<style>
	.revise-content {
		min-width: 1300px;
		width: 100%;
		margin-top: 10px;
	}

	.revise-main {
		overflow: hidden;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .14);
		background: #fff;
		border: 1px solid #eee;
		border-radius: 4px;
		padding: 15px 20px;
		width: 1260px;
		height: 600px;
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
		max-width: 178px;
		max-height: 178px;
		display: block;
	}
</style>
