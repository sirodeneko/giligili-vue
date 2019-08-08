<template>
	<div class="home">
		<div class=""style="max-width: 1920px;min-width: 1024px;margin-bottom: 10px;">
			<el-row :gutter="20">
				<el-col :span="4" v-for="video in videos" :key="video.id">
					<el-card class="video-card">
						<img src="../assets/A.jpg" class="image" width="200px" height="200px"style="">
						<div style="padding: 14px;">
							<span class="video-title">{{video.title}}</span>
							<div class="bottom clearfix"style="margin-top: 4px;">
								<span class="video-info">{{video.Info}}</span>
								<!-- <el-button type="text" class="button">操作按钮</el-button> -->
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
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
			};
		},
		methods: {
			load() {
				API.getVideos().then((res) => {
					this.videos = res.data;
				});
			},
		},
		beforeMount() {
			this.load();
		}
	};
</script>

<style>
	.video-info{
		color: #999;
		font-size: 13px;
	}
	.video-card{
		height: 300px;
		margin-top: 10px;
	}
</style>