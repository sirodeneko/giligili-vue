<template>
	<el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" router style="margin-bottom: 10px;">
		<el-menu-item index="/">首页</el-menu-item>
		<!-- <el-submenu index="2">//多级导航演示 
			<template slot="title">我的工作台</template>
			<el-menu-item index="2-1">选项1</el-menu-item>
			<el-menu-item index="2-2">选项2</el-menu-item>
			<el-menu-item index="2-3">选项3</el-menu-item>
			<el-submenu index="2-4">
				<template slot="title">选项4</template>
				<el-menu-item index="2-4-1">选项1</el-menu-item>
				<el-menu-item index="2-4-2">选项2</el-menu-item>
				<el-menu-item index="2-4-3">选项3</el-menu-item>
			</el-submenu> -->
		<el-menu-item index="/postvideo">投稿视频</el-menu-item>
		<el-menu-item index="/about">关于giligili</el-menu-item>
		<div style="position:absolute;right: 10px;top:-15px;color: #13CE66;">
		<h1 >
			GILIGILI超和平
		</h1></div>
	</el-menu>
</template>

<script>
	export default {
		name: 'NavBar',
	};
</script>
<style>
</style>
