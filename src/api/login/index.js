import axios from 'axios';

//登录
const postLogin = form => axios.post('/api/v1/user/login', form).then(res => res.data);
const postRegister = form => axios.post('/api/v1/user/register', form).then(res => res.data);
export {
  postLogin,
  postRegister,
};