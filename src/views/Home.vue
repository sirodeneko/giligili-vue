<template>
	<div class="home">
		<div class="main-contianer">
			<div class="left">
				<div class="top" style="margin-bottom: 10px;">
					<el-row :gutter="20">
						<el-col :span="6" v-for="video in videos" :key="video.id">
							<el-card class="video-card" @click.native="goVideo(video)">
								<div class="atomimg">
									<img class="video-avatar" :src="video.avatar" width="100%">
								</div>
								<div class="videoInof">
									<div class="video-title">{{video.title}}</div>
									<!-- .substring切字符串 -->
									<div class="bottom clearfix" style="margin-top: 4px;">
										<span class="video-info">{{video.Info.substring(0,35)}}</span>
										<!-- <el-button type="text" class="button">操作按钮</el-button> -->
									</div>
								</div>
							</el-card>
						</el-col>
					</el-row>
				</div>
				<div class="fenye">
					<div class="blocks">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="12" :page-sizes="[6, 12]"
						 layout="total, prev, pager, next, jumper" :total="total">
						</el-pagination>
					</div>
				</div>
			</div>
			<div class="home-right">
				<div class="right-top">
					排行榜
				</div>
				<div class="right-show">
					<div class="right-show-card" v-for="video in rivideos" :key="video.id" @click="goVideo(video)">
						<div class="right-show-card-img">
							<img class="rivideo-avatar" :src="video.avatar" width="100%">
						</div>
						<p class="rivideo-title">{{video.title}}</p>
						<p class="rivideo-viev">播放量:{{video.view}}</p>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import * as API from '@/api/video';

	export default {
		name: "home",
		components: {},
		data() {
			return {
				videos: [],
				rivideos: [],
				start: 0,
				limit: 12,
				total: 0,
			};
		},
		methods: {
			handleSizeChange(val) {
				this.limit = val;
				this.load();
			},
			handleCurrentChange(val) {
				this.start = this.limit * (val - 1); // val 页面
				this.load();
			},
			load() {
				API.getVideos(this.start, this.limit).then((res) => {
					this.videos = res.data.items;
					this.total = res.data.total;
				});
				API.getRiVideo().then((res) => {
					this.rivideos = res.data;
				});
			},
			goVideo(video) {
				//$router.push 加上一层
				this.$router.push({
					name: 'ShowVideo',
					params: {
						videoID: video.id,
						userID: video.user,
					}
				});
			}
		},
		beforeMount() {
			this.load();
		},
	};
</script>



<style>
	.home {
		min-height: 640px;
	}

	.left {
		float: left;
	}

	.top {

		width: 1000px;
		min-height: 600px;
	}

	.home-right {
		border: 1px solid #eee;
		border-radius: 4px;
		float: right;
		width: 288px;
		margin-top: 10px;
		margin-left: 10px;
		min-height: 600px;
		background: #fff;
	}

	.right-top {
		font-size: 18px;
		font-weight: 400;
		width: 290px;
		padding: 20px;
		height: 20px;
	}

	.videoInof {
		margin-top: 10px;
		width: 100%;
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

	.right-show-card-img {

		width: 120px;
		height: 0;
		padding-bottom: 25%;
		overflow: hidden;
		border-radius: 4px;
	}

	.rivideo-avatar {
		/* width: 100%;
		height: 0;
		padding-bottom: 80%;
		overflow: hidden; */
	}

	.rivideo-title {
		position: absolute;
		left: 135px;
		top: 15px;
		height: 36px;
		line-height: 18px;
		margin-top: -3px;
		width: 140px;
		overflow: hidden;
	}

	.rivideo-viev {
		position: absolute;
		left: 135px;
		top: 55px;
		color: #99a2aa;
		height: 15px;
		line-height: 15px;
		font-size: 15px;
		margin-top: -3px;
		width: 150px;
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
		margin-top: 10px;
		cursor: pointer;
	}

	.right-show-card {
		position: relative;
		padding-left: 8px;
		padding-top: 8px;
		padding-bottom: 10px;
		cursor: pointer;
	}

	.fenye {
		max-width: 1300px;
		margin: 0 auto;
	}

	.blocks {}
</style>
