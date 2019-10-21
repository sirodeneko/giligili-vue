<template>
  <div id="app">
	  <div class="top-navbar">
	  <div class="menubar"><NavBar></NavBar></div>
	  </div>
	  <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
	name:'app',
	components: {
		NavBar,
	},
}
</script>

<style>

	.top-navbar{
		width: 100%;
		min-width: 1300px;
		height: 60px;
		background: #FFFFFF;
		border-bottom: solid 1px #e6e6e6;
	}
	.menubar{
		max-width: 1300px;
		margin: 0 auto;
	}
</style>
