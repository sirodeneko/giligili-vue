<template>
	<div class="home">
		<div class="main-contianer">
			<div class="top" style="margin-bottom: 10px;">
				<el-row :gutter="20">
					<el-col :xs="12" :sm="8" :md="6" :lg="4" v-for="video in videos" :key="video.id">
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
			
		</div>
		<div class="fenye">
		<div class="blocks">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="12" :page-sizes="[6, 12]"
				 layout="total, prev, pager, next, jumper" :total="total">
				</el-pagination>
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
			},
			goVideo(video) {
				//$router.push 加上一层
				this.$router.push({
					name: 'ShowVideo',
					params: {
						videoID: video.id
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
	.home{
		min-height: 640px;
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
	.fenye{
		max-width: 1300px;
		margin: 0 auto;
	}
	.blocks {}
</style>
