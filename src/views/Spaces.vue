<template>
		<div class="main-contianer">
			<div class="col-1">
				<div class="my-videos">我的视频</div>
				<div class="my-top" style="margin-bottom: 10px;">
					<el-row :gutter="20">
						<el-col :span="6" v-for="(video,index) in videos" :key="video.id">
							<el-card class="video-card">
								<div class="atomimg" @click="goVideo(video)">
									<img class="video-avatar" :src="video.avatar" width="100%">
								</div>
								<div class="videoInof" @click="goVideo(video)">
									<div class="video-title">{{video.title}}</div>
									<div class="bottom clearfix" style="margin-top: 4px;">
										<span class="video-info">{{video.Info.substring(0,35)}}</span>
									</div>
								</div>
								<!-- @click="handDelete(video.id)" -->
								<div class="video-more" @click="open(video.id,index)">
									<el-tooltip class="item" effect="dark" content="删除本视频" placement="right" :hide-after="1000">
										<img src="../../public/更多.png" width="18px">
									</el-tooltip>
								</div>
							</el-card>
						</el-col>
					</el-row>
				</div>
				<div class="blocks">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="12" :page-sizes="[6, 12]"
					 layout="total, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
			</div>
			<div class="col-2">
				<div class="sections">
					<div class="sections-title">
						公告
					</div>
					<div class="itext">{{itext}}</div>
				</div>
				<div class="sections">
					<div class="sections-day">
						<div class="s-sex">
							<div class="s-sextxt"><img :src="gsex" width="32px" height="32px"></div>
							<div class="s-sextxt" id="s-sextxt">{{gsextxt}}</div>
						</div>
						<div class="s-birthday">
							<div class="s-sextxt"><img src="../../public/生日.png" width="32px" height="32px"></div>
							<div class="s-sextxt" id="s-birthday">{{gbirthday}}</div>
						</div>
					</div>
				</div>
				<div class="sections" id="sections-exit">
					<div class="sections-exit" @click="gexit">
						退出登录
					</div>
				</div>

			</div>
		</div>
</template>

<script>
	import * as API from '@/api/video';
	import * as APIs from '@/api/login';
	export default {
		name: "myhome",
		components: {},
		data() {
			return {
				videos: [],
				start: 0,
				limit: 12,
				total: 0,
				itext: "",
				gsex: "",
				gsextxt: "保密",
				gbirthday: "01-01",
			};
		},
		methods: {
			open(val,index) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					API.deleteVideo(val).then((res) => {
						if (res.status == 0) {
							this.$message({
								type: 'success',
								message: '删除成功!！！！'
							});
							this.videos.splice(index, 1);
						} else {
							this.$notify.error({
								title: '删除失败惹',
								message: res.msg,
							});
						}
						// console.log(this.videos);
						// console.log(val);
						// this.$delete(this.videos, val);
						// console.log(this.videos);
					}).catch((error) => {
						this.$notify.error({
							title: '删除失败惹',
							message: error,
						});
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			handleSizeChange(val) {
				this.limit = val;
				this.load();

			},
			handleCurrentChange(val) {
				this.start = this.limit * (val - 1); // val 页面
				this.load();
			},

			load() {

				API.getUserVideos(this.start, this.limit).then((res) => {
					this.videos = res.data.items;
					this.total = res.data.total;
				});
				APIs.getMe().then((res) => {
					this.itext = res.data.sign;
					if (res.data.sex == "" || res.data.sex == "保密") {
						this.gsex = "https://giligili-img-av.oss-cn-hangzhou.aliyuncs.com/img/%E5%A4%96%E6%98%9F%E4%BA%BA%20.png";
					} else if (res.data.sex == "男") {
						this.gsex = "https://giligili-img-av.oss-cn-hangzhou.aliyuncs.com/img/%E6%80%A7%E5%88%AB%E7%94%B7.png";
						this.gsextxt = "绅士";
					} else {
						this.gsex = "https://giligili-img-av.oss-cn-hangzhou.aliyuncs.com/img/%E6%80%A7%E5%88%AB%E5%A5%B3.png";
						this.gsextxt = "淑女";
					}
					//console.log(res.data.birthday);
					this.gbirthday = this.timestampToTime(res.data.birthday);
				});
			},
			// 时间戳转换成时间
			timestampToTime(cjsj) {
				if (cjsj / 10000000000 <= 1) {
					cjsj = cjsj * 1000;
				}
				var date = new Date(cjsj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				//var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " ";
				//var h = date.getHours() + ':';
				//var m = date.getMinutes() + ':';
				//var s = date.getSeconds();
				//return Y + M + D + h + m + s
				return M + D;
			},
			goVideo(video) {
				let routeUrl = this.$router.resolve({
					name: 'ShowVideo',
					params: {
						videoID: video.id,
						userID: video.user,
					}
				});
				window.open(routeUrl.href, '_blank');
			},
			gexit() {
				APIs.Exit().then((res) => {
					if (res.status > 0) {
						this.$notify.error({
							title: '登出失败',
							message: res.msg,
						});
					} else {
						this.$cookies.remove("gin-ess");
						this.$notify({
							title: '登出成功',
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
						title: '登出失败惹',
						message: error,
					});
				});
			},
		},
		beforeMount() {
			this.load();
		},
	};
</script>



<style>
	/* .myhome {
		min-height: 600px;
	} */

	.my-top {
		min-height: 600px;
	}

	.col-1 {
		margin-top: 10px;
		background: #fff;
		border: 1px solid #eee;
		border-radius: 4px;
		float: left;
		padding: 15px 20px;
		width: 918px;
	}

	.col-2 {

		width: 340px;
		float: right;
	}

	.sections {
		margin-top: 10px;
		background: #fff;
		border: 1px solid #eee;
		border-radius: 4px;
		float: left;
		padding: 15px 20px;
		margin-left: 8px;
		width: 290px;
	}

	.sections-title {
		border-bottom: 1px solid #e5e9ef;
		font-size: 14px;
		font-weight: 700;
		padding: 0;
		margin: -15px 0 10px;
		height: 45px;
		line-height: 45px;
	}

	#sections-exit {
		background: #F56C6C;
		color: #FFFFFF;
	}

	.sections-exit {
		text-align: center;
		cursor: pointer;
	}

	.s-sex {
		height: 32px;
		width: 140px;
		float: left;
	}

	.s-sextxt {
		float: left;
	}

	#s-sextxt {
		margin-top: 6px;
		color: #6D757A;
	}

	.s-birthday {
		float: right;
		height: 32px;
		width: 140px;
	}

	#s-birthday {
		margin-top: 6px;
		margin-left: 4px;
		color: #6D757A;
	}

	.itext {
		width: 100%;
		height: 172px;
		color: #6d757a;
		font-size: 13px;
		font-family: Microsoft Yahei;
		line-height: 20px;
		padding: 10px;
		margin: -10px 0 0 -11px;
	}

	.my-videos {
		font-size: 20px;
		font-weight: 400;
		line-height: 33px;
		padding: 0 0 15px;
	}


	.videoInof {
		margin-top: 10px;
		width: 150px;
		height: 0;
		padding-bottom: 35%;
		overflow: hidden;
	}

	.atomimg {
		width: 100%;
		height: 0;
		padding-bottom: 100%;
		overflow: hidden;
	}

	.video-title {
		width: 100%;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.video-info {
		color: #999;
		font-size: 13px;
	}

	.video-card {
		position: relative;
		margin-top: 10px;
		cursor: pointer;
	}

	.el-card__body {
		padding: 20px 20px 10px 20px;
	}

	.video-more {
		width: 25px;
		height: 25px;
		position: absolute;
		right: 10px;
		bottom: 10px;
	}
</style>
