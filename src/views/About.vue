<template>
	<div class="about">
		<div class="main-contianer">
		<div class="title">(￣▽￣)"欢迎来到giligili</div>
		<div class="master-inof">本网站由siro创建运营</div>
		<div class="master-inof">如有兴趣请移步<a href="https://github.com/sirodeneko">github</a></div>
		<div class="master-inof">如果您有什么建议或者侵犯到您的权益，请邮件至siro-neko@qq.com</div>
		<div class="master-inof"></div>
		<div class="block">
			<el-timeline>
				<el-timeline-item timestamp="2020/3/17" placement="top">
					<el-card>
						<h4>更新 v1.1.0.8</h4>
						<p>修复用户信息修改bug</p>
					</el-card>
				</el-timeline-item>
				<el-timeline-item timestamp="2019/9/19" placement="top">
					<el-card>
						<h4>更新 v1.1.0.6</h4>
						<p>被阿里云警告了加个备案号</p>
					</el-card>
				</el-timeline-item>
				<el-timeline-item timestamp="2019/9/19" placement="top">
					<el-card>
						<h4>更新 v1.1.0.5</h4>
						<p>修复没登录就看不到评论的bug</p>
					</el-card>
				</el-timeline-item>
				<el-timeline-item timestamp="2019/9/19" placement="top">
					<el-card>
						<h4>更新 v1.1.0.4</h4>
						<p>我们可以吐槽视频了</p>
					</el-card>
				</el-timeline-item>
				<el-timeline-item timestamp="2019/9/7" placement="top">
					<el-card>
						<h4>更新 v1.1.0.3</h4>
						<p>一不小心放错的视频支持删除了</p>
					</el-card>
				</el-timeline-item>
				<el-timeline-item timestamp="2019/9/5" placement="top">
					<el-card>
						<h4>更新 v1.1.0.2</h4>
						<p>播放界面更改，也许马上评论功能也会上线哦</p>
					</el-card>
				</el-timeline-item>
				<el-timeline-item timestamp="2019/9/4" placement="top">
					<el-card>
						<h4>更新 v1.1.0.1</h4>
						<p>排行榜更新and淦，页面居然出现布局bug了</p>
					</el-card>
				</el-timeline-item>
				<el-timeline-item timestamp="2019/9/1" placement="top">
					<el-card>
						<h4>更新 v1.1.0.0</h4>
						<p>用户中心更新，我们终于有自己的信息啦</p>
					</el-card>
				</el-timeline-item>
				<el-timeline-item timestamp="2019/8/27" placement="top">
					<el-card>
						<h4>更新 v1.0.3.1</h4>
						<p>请使用验证码哦</p>
					</el-card>
				</el-timeline-item>
				<el-timeline-item timestamp="2019/8/26" placement="top">
					<el-card>
						<h4>更新 v1.0.3</h4>
						<p>用户系统更新</p>
					</el-card>
				</el-timeline-item>
				<el-timeline-item timestamp="2019/8/16" placement="top">
					<el-card>
						<h4>更新 v1.0.2</h4>
						<p>封面支持自定义,视频终于可以直接上传了 嘿嘿</p>
					</el-card>
				</el-timeline-item>
				<el-timeline-item timestamp="2019/8/13" placement="top">
					<el-card>
						<h4>更新 v1.0.1</h4>
						<p>美化首页，完成自适应，视频播放上线,Logo1.0上线</p>
					</el-card>
				</el-timeline-item>
				<el-timeline-item timestamp="2019/8/12" placement="top">
					<el-card>
						<h4>更新 v1.0.0</h4>
						<p>giligili大和平</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
		</div>
		</div>
		<el-backtop :visibility-height="600"></el-backtop>
	</div>
</template>
<script>
	export default {
		name: "About",
		components: {},
		data() {
			return {
				
			};
		},
		methods: {
			
		},
		beforeMount() {
			//this.load();
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
	.master-inof{
		margin-left: 55px;
		width: 1000px;
		font-family: Microsoft Yahei;
		font-weight: 500;
		font-size: 15px;
		padding-top: 20px;
	}
	.about {
	    background: #d2e9fb url(../../public/background.bc72515.png) top/contain no-repeat;
	    min-height: 55vw;
		min-width: 1300px;
	}
</style>
