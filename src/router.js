import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
	routes: [{
			path: "/",
			name: "home",
			component: Home,
		},
		{
			path: "/about",
			name: "About",
			component: () =>
				import('./views/About.vue'),
		},
		{
			path: "/postvideo",
			name: "postVideo",
			component: () =>
				import( /* webpackChunkName: "video" */ "./views/PostVideo.vue"),
		},
		{
			path: "/video/gv:videoID",
			name: "ShowVideo",
			component: () =>
				import('./views/ShowVideo.vue'),
		},
		{
			path: "/login",
			name: "Login",
			component: () =>
				import( /* webpackChunkName: "video" */ "./views/Login.vue"),
		},
		{
			path: "/register",
			name: "Register",
			component: () =>
				import('./views/Register.vue'),
		},
		{
			path: "/im",
			name: "IM",
			component: () =>
				import('./views/IM.vue'),
		},
		{
			path: "/space",
			name: "Space",
			redirect: "/space/me",
			component: () =>
				import('./views/Space.vue'),
			children: [{
					path: "/space/me",
					name: "Spaces",
					component: () =>
						import('./views/Spaces.vue'),
				},
				{
					path: "/space/revise",
					name: "UserRevise",
					component: () =>
						import('./views/UserRevise.vue'),
				}
			]
		}
	]
});
