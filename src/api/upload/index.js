import axios from 'axios';

// 请求图片签名
const postUploadToken = fileName => axios.post('/api/v1/upload/token', { filename: fileName }).then(res => res.data);
// 请求视频签名
const postUploadTack = fileName => axios.post('/api/v1/upload/tack', { filename: fileName }).then(res => res.data);

export {
  postUploadToken,
  postUploadTack,
};