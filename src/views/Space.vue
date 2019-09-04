<template>
	<div class="space">
		<div class="main-contianer">
			<div class="h">
				<div class="h-revise" @click="changhowtxt">{{showtxt}}</div>
				<div class="h-info">
					<div class="h-avatar">
						<el-avatar :size="65" :src="circleUrl"></el-avatar>
					</div>
					<div class="h-basic">
						<div id="h-name">{{gname}}</div>
						<div id="h-uid">UID:{{guid}}</div>
						<!-- <div id="h-sign">{{gsign}}</div> -->
					</div>
				</div>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import * as API from '@/api/login';
	export default {
		name: "space",
		components: {},
		data() {
			return {
				circleUrl: "https://giligili-img-av.oss-cn-hangzhou.aliyuncs.com/img/nofaces.png",
				gname: "gay哩gay哩大爆炸",
				guid: 0,
				showtxt: "编辑",
			};
		},
		methods: {
			load() {
				API.getMe().then((res) => {
					if (res.data.avatar != "") {
						this.circleUrl = res.data.avatar;
					}
					this.gname = res.data.nickname;
					this.guid = res.data.id;
				});
			},
			changhowtxt() {
				if (this.showtxt == "编辑") {
					this.$router.push({
						name: 'UserRevise',
						params: {
							sign: this.gsign
						}
					});
					this.showtxt = "主页";
				} else {
					this.$router.push('/space/me');
					this.showtxt = "编辑";
				}
			}
		},
		beforeMount() {
			this.load();
		},
	}
</script>
<style>
	.h {
		position: relative;
		width: 100%;
		padding-top: 150px;
		height: 100px;
		background-image: url(https://giligili-img-av.oss-cn-hangzhou.aliyuncs.com/img/58481766424_p0.jpg);
		border-bottom-right-radius: 5px;
		border-bottom-left-radius: 5px;
	}

	.h-revise {
		position: absolute;
		top: 15px;
		right: 30px;
		background: rgba(0, 0, 0, .45);
		border-radius: 4px;
		color: #fff;
		cursor: pointer;
		font-size: 12px;
		line-height: 30px;
		transition: all .1s ease;
		padding: 0 10px;
	}

	.h-info {
		height: 69px;
		margin-left: 20px;
		padding-bottom: 31px;
	}

	.h-avatar {
		float: left;
		width: 65px;
		height: 65px;
		border: 2px solid hsla(0, 0%, 100%, .4);
		border-radius: 52px;
	}

	.h-basic {
		float: left;
		color: #FFFFFF;
		font-size: 0;
		margin: 10px 0 0 20px;
	}

	#h-name {
		display: inline-block;
		margin-right: 5px;
		font-weight: 700;
		line-height: 18px;
		font-size: 18px;
		vertical-align: middle;
	}

	#h-uid {
		margin-top: 8px;
		color: #CFDEE4;
		font-size: 14px;
		line-height: 26px;
		height: 20px;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	#h-sign {
		margin-top: 4px;
		color: #CFDEE4;
		font-size: 14px;
		line-height: 20px;
		height: 26px;
		width: 740px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
