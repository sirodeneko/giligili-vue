import axios from 'axios';

// 创建视频
const postVideo = form => axios.post('/api/v1/videos', form).then(res => res.data);

// 读视频详情
const getVideo = id => axios.get(`/api/v1/video/${id}`).then(res => res.data);

// 读取视频列表
const getVideos = (start, limit) => axios.get('/api/v1/videos', {
	params: {
		start,
		limit
	}
}).then(res => res.data);

// 删除视频
const deleteVideo = id => axios.delete(`/api/v1/video/${id}`).then(res => res.data);

// 读取用户频列表
const getUserVideos = (start, limit) => axios.get('/api/v1/user/videos', {
	params: {
		start,
		limit
	}
}).then(res => res.data);
//读排行榜
const getRiVideo = () => axios.get('api/v1/rank/daily').then(res => res.data);

// 创建视频评论
const postVideoComment = (id,form) => axios.post(`/api/v1/video/comment/${id}`, form).then(res => res.data);

// 读取视频评论列表
const getVideoComments = (id,start, limit) => axios.get(`/api/v1/videos/comments/${id}`, {
	params: {
		start,
		limit
	}
}).then(res => res.data);

// 删除视频评论
const deleteVideoComment = id => axios.delete(`/api/v1/comment/${id}`).then(res => res.data);

export {
	getRiVideo,
	getVideos,
	getVideo,
	postVideo,
	getUserVideos,
	deleteVideo,
	postVideoComment,
	getVideoComments,
	deleteVideoComment,
};
