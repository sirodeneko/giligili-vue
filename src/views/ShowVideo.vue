<template>
	<div class="main-contianer" id="show-video">
		<div class="video-top">
			<div class="video-titlee">{{video.title}}</div>
			<div class="video-create-time">{{video_create_time}}</div>
			<div class="video-view">播放:{{video.view}}</div>
		</div>
		<div class="video-beside">

		</div>
		<div class="show-video">
			<el-row>
				<el-col>
					<video-player class="video-player-box" ref="videoPlayer" :options="playerOptions">
					</video-player>
				</el-col>
			</el-row>
		</div>
		<div class="video-master">
			<div class="v-uavatar">
				<el-avatar :size="50" :src="circleUrl"></el-avatar>
			</div>
			<div class="v-uname">{{uname}}</div>
			<div class="v-usign">{{usign}}</div>
		</div>
		<div class="video-inof">
			{{video.Info}}
		</div>
		<div class="video-comment">
			<div class="video-comment-head">
				{{total+" "}}评论
			</div>
			<div class="video-comment-input">
				<div class="v-c-uavatar">
					<el-avatar :size="50" :src="meCircleUrl"></el-avatar>
				</div>
				<div class="video-c-input">
					<el-input type="textarea" :rows="3" placeholder="来吐槽吧(〜￣△￣)〜" v-model="form.text" maxlength="8888" show-word-limit>
					</el-input>
				</div>
				<div class="video-c-ok">
					<div class="video-c-button" @click="upComment">吐槽一下</div>
				</div>
			</div>
			<div class="video-c-center">
				<div class="video-c-card" v-for="comment in comments" :key="comment.id">
					<div class="v-c-uavatar">
						<el-avatar :size="50" :src="comment.user_url"></el-avatar>
					</div>
					<div class="v-c-name">{{comment.user_name}}</div>
					<div class="v-c-text">{{comment.txet}}</div>
					<div class="v-c-time">{{timestampToTime(comment.created_at)}}</div>
					<div class="v-c-more" v-if="comment.me==1" @click="open(comment.id,index)">
						<el-tooltip class="item" effect="dark" content="删除本评论" placement="right" :hide-after="1000">
							<img src="../../public/更多.png" width="14px">
						</el-tooltip>
					</div>
				</div>
				<div class="blocks">
					<el-pagination 
					@size-change="handleSizeChange" 
					@current-change="handleCurrentChange" 
					:page-size="20" 
					:page-sizes="[10, 20]"
					 layout="total, prev, pager, next, jumper" 
					 :total="total" 
					 :hide-on-single-page="true">
					</el-pagination>
				</div>
			</div>
		</div>
		<el-backtop :visibility-height="600"></el-backtop>
	</div>

</template>

<script>
	import 'video.js/dist/video-js.css';
	import {
		videoPlayer
	} from 'vue-video-player';
	import * as API from '@/api/video';
	import * as APIs from '@/api/login';

	export default {
		name: 'ShowVideo',
		data() {
			return {
				uname: "",
				usign: "",
				circleUrl: "",
				video_create_time: "",
				video: {},
				comment_head: "",
				meCircleUrl: "",
				//提交评论
				form: {
					text: "",
				},
				playerOptions: { //配置视频属性
					//playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
					muted: false,
					fluid: true, //适应容器大小
					sources: [{
						type: 'video/mp4',
						src: '',
					}],
					//poster: "",
				},
				//评论
				comments: [],
				start: 0,
				limit: 20,
				total: 0,
				value: true,
			}
		},
		methods: {
			handleSizeChange(val) {
				this.limit = val;
				API.getVideoComments(this.$route.params.videoID, this.start, this.limit).then((res) => {
					this.comments = res.data.items;
					this.total = res.data.total;
				});

			},
			handleCurrentChange(val) {
				this.start = this.limit * (val - 1); // val 页面
				API.getVideoComments(this.$route.params.videoID, this.start, this.limit).then((res) => {
					this.comments = res.data.items;
					this.total = res.data.total;
				});
			},
			open(val, index) {
				this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					API.deleteVideoComment(val).then((res) => {
						if (res.status != 0) {
							this.$message.error('删除失败');
						} else {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.comments.splice(index, 1);
							this.total--;
						}
					}).catch((error) => {
						this.$message.error('删除失败惹');
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			// 时间戳转换成时间
			timestampToTime(cjsj) {
				if (cjsj / 10000000000 <= 1) {
					cjsj = cjsj * 1000;
				}
				var date = new Date(cjsj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " ";
				var h = date.getHours() + ':';
				var m = date.getMinutes() + ':';
				var s = date.getSeconds();
				return Y + M + D + h + m + s;
				//return M+D;
			},

			load() {
				var userid;
				API.getVideo(this.$route.params.videoID).then((res) => {
					this.video = res.data;
					this.playerOptions.sources[0].src = this.video.url;
					this.video_create_time = this.timestampToTime(this.video.created_at);
					this.loadafter(this.video.user);
				});

				APIs.getMe().then((res) => {
					if (res.data.avatar != "") {
						this.meCircleUrl = res.data.avatar;
					}
				});

				API.getVideoComments(this.$route.params.videoID, this.start, this.limit).then((res) => {
					this.comments = res.data.items;
					this.total = res.data.total;
				});

			},
			loadafter(userid) {
				//console.log(userid);
				APIs.getUser(userid).then((res) => {
					if (res.data.avatar != "") {
						this.circleUrl = res.data.avatar;
						this.uname = res.data.nickname;
						this.usign = res.data.sign;
					}
				});
			},
			upComment() {
				API.postVideoComment(this.$route.params.videoID, this.form).then((res) => {
					if (res.status != 0) {
						this.$message.error('发布失败惹');
					} else {
						this.$message({
							message: '发布成功',
							type: 'success'
						});
						this.form.text = "";
						API.getVideoComments(this.$route.params.videoID, this.start, this.limit).then((res) => {
							this.comments = res.data.items;
							this.total = res.data.total;
						});
					}
				});
			}

		},
		components: {
			videoPlayer,
		},
		beforeMount() {
			this.load();
		},

	}
</script>

<style>
	#show-video {
		background: #FFFFFF;
		font-family: Microsoft YaHei, Arial, Helvetica, sans-serif;
	}

	.video-top {
		float: left;
		padding-top: 16px;
		width: 950px;
		height: 70px;
		background: #FFFFFF;
	}

	.video-beside {
		float: right;
		width: 350px;
		height: 621px;
		background: #FFFFFF;
	}

	.video-titlee {
		font-size: 21px;
		font-weight: 500;
		color: #212121;
		line-height: 26px;
		height: 26px;
		margin-bottom: 5px;
		margin-left: 8px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.video-create-time {
		font-size: 13px;
		color: #B39999;
		line-height: 15px;
		height: 15px;
		margin-bottom: 1px;
		margin-left: 8px;
	}

	.video-view {
		font-size: 12px;
		color: #B39999;
		line-height: 15px;
		height: 15px;
		margin-bottom: 1px;
		margin-left: 8px;
	}

	.show-video {
		width: 950px;
		/* border-radius: 4px; */
		overflow: hidden;
		/* padding-bottom: 6px;
		border-bottom: solid 1px #e6e6e6; */
	}

	.video-master {
		width: 940px;
		height: 54px;
		margin-left: 10px;
		margin-top: 10px;
		cursor: pointer;
	}

	.v-uavatar {
		float: left;
		width: 50px;
		height: 50px;
		border: 2px solid hsla(0, 0%, 100%, .4);
		border-radius: 52px;
	}

	.v-uname {
		/* float: left; */
		height: 20px;
		padding-top: 6px;
		font-size: 17px;
		font-weight: 500;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.v-usign {
		float: left;
		height: 20px;
		padding-top: 6px;
		font-size: 13px;
		color: #6d757a;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.video-inof {
		white-space: pre-line;
		transition: all .3s;
		font-size: 15px;
		color: #212121;
		letter-spacing: 0;
		line-height: 18px;
		min-height: 10px;
		width: 700px;
		overflow: hidden;
		margin-left: 10px;
		margin-right: 10px;
		padding-left: 48px;
		padding-right: 182px;
		border-bottom: 1px solid #e5e9ef;
	}

	.video-comment {
		width: 950px;
		/* height: 300px; */
	}

	.video-comment-head {
		font-size: 18px;
		line-height: 24px;
		color: #222;
		width: 930px;
		margin-left: 20px;
		margin-top: 20px;
	}

	.video-comment-input {
		margin-top: 10px;
		height: 90px;
		width: 940px;
		margin-left: 20px;
	}

	.v-c-uavatar {
		margin-top: 18px;
		float: left;
		width: 50px;
		height: 50px;
		border: 2px solid hsla(0, 0%, 100%, .4);
		border-radius: 52px;
	}

	.video-c-input {
		float: left;
		color: #0000FF;
		width: 700px;
		height: 90px;
		margin-left: 30px;
	}

	.el-textarea__inner {
		font-family: inherit;
		resize: none;
		height: 90px;
	}

	.video-c-ok {
		float: left;
		width: 90px;
		height: 90px;
		margin-left: 20px;
	}

	.video-c-button {
		color: #fff;
		padding: 26px;
		border-radius: 4px;
		text-align: center;
		cursor: pointer;
		background-color: #00a1d6;
		border: 1px solid #00a1d6;
		transition: .1s;
		height: 36px;
		width: 36px;
		font-size: 16px;
	}

	.video-c-button:hover {
		background-color: #00B5E5;
	}

	.video-c-center {

		margin-left: 20px;
		width: 930px;
		min-height: 200px;
	}

	.video-c-card {
		padding-top: 3px;
		position: relative;
	}

	.v-c-name {
		height: 30px;
		padding-top: 18px;
		margin-left: 84px;
		font-size: 15px;
		font-weight: 500;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #6d757a;

	}

	.v-c-text {
		margin-left: 84px;
		width: 846px;
		line-height: 20px;
		padding: 2px 0;
		font-size: 14px;
		text-shadow: none;
		overflow: hidden;
		word-wrap: break-word;
		word-break: break-word;
		white-space: pre-wrap;
	}

	.v-c-time {
		font-size: 13px;
		color: #B39999;
		line-height: 15px;
		height: 15px;
		padding-bottom: 10px;
		border-bottom: 1px solid #e5e9ef;
		margin-left: 84px;
		margin-top: 5px;
	}

	.v-c-more {
		position: absolute;
		right: 5px;
		bottom: 8px;
		width: 18px;
		height: 18px;
		cursor: pointer;
	}
</style>
