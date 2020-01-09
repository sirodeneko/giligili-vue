<template>
	<el-menu class="el-menu-demo" mode="horizontal" router>
		<el-menu-item class="el-menu-item" index="/"><img src="../assets/logo.png" alt="" width="25px" style="margin-bottom: 3px;">首页</el-menu-item>
		<el-menu-item class="el-menu-item" index="/postvideo">投稿视频</el-menu-item>
		<el-menu-item class="el-menu-item" index="/login"  :style="{'display':disPlay1}">登录</el-menu-item>
		<el-menu-item class="el-menu-item" index="/space"  :style="{'display':disPlay2}">个人中心</el-menu-item>
		<!-- <el-menu-item class="el-menu-item" index="/im"  :style="{'display':disPlay2}">聊天室</el-menu-item> -->
		<el-menu-item class="el-menu-item" index="/about">关于giligili</el-menu-item>
		<!-- <div style="position:absolute;right: 10px;top:-15px;color: #13CE66;">
		<h1 >
			GILIGILI超和平
		</h1></div> -->
	</el-menu>
</template>

<script>
	export default {
		name: 'NavBar',
		data() {
			return {
				disPlay1: "list-item",
				disPlay2: "none",
				//监听事件
				addTodo: "",
			};
		},
		methods: {

			load() {
				//console.log(this.$cookies.isKey("gin-ess"));
				if (this.$cookies.isKey("gin-ess")) {
					this.disPlay1 = "none";
					this.disPlay2 = "list-item";
				} else {
					this.disPlay1 = "list-item";
					this.disPlay2 = "none";
				}
			},
		},
		created() {
			//监听事件
			//console.log("监听事件");
			this.$bus.on('myspace', () => {
				//console.log(8989);
				this.load();
			});
		},
		beforeDestroy() {
		  this.$bus.off('myspace');
		},
		beforeMount() {
			this.load();
		},
	};
</script>
<style>
	/* .active1 {
		display:none;
	}
	.active2 {
		display:list-item;
	} */
</style>
