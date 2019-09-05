import axios from 'axios';

//登录
const postLogin = form => axios.post('/api/v1/user/login', form).then(res => res.data);
//注册
const postRegister = form => axios.post('/api/v1/user/register', form).then(res => res.data);
//获取个人信息
const getMe = () => axios.get('/api/v1/user/me').then(res => res.data);
//退出
const Exit = () => axios.delete('/api/v1/user/logout').then(res => res.data);
//更新用户信息
const putRevise = form => axios.put('/api/v1/user/account', form).then(res => res.data);

// 读用户详情
const getUser = id => axios.get(`/api/v1/users/${id}`).then(res => res.data);

export {
  postLogin,
  postRegister,
  getMe,
  Exit,
  putRevise,
  getUser,
};