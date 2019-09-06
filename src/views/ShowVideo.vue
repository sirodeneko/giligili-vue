<template>
	<div class="main-contianer" id="show-video">
		<div class="video-top">
			<div class="video-title">{{video.title}}</div>
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
				playerOptions: { //配置视频属性
					//playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
					muted: false,
					fluid: true, //适应容器大小
					sources: [{
						type: 'video/mp4',
						src: '',
					}],
					//poster: "",
				}
			}
		},
		methods: {

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

			},
			loadafter(userid) {
				console.log(userid);
				APIs.getUser(userid).then((res) => {
					if (res.data.avatar != "") {
						this.circleUrl = res.data.avatar;
						this.uname = res.data.nickname;
						this.usign = res.data.sign;
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

	.video-title {
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
		width: 950px;
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
		min-height: 60px;
		width: 700px;
		overflow: hidden;
		margin-left: 58px;
	}
</style>
