import axios from 'axios';

//创建房间
const groupCreate = form => axios.post('/api/v1/group/create', form).then(res => res.data);
//获取聊天室
const getMyGroups = () => axios.get('/api/v1/user/groups').then(res => res.data);
//拉取聊天消息
const getGroupMsgs = id =>axios.get(`/api/v1/group/msgs/${id}`).then(res => res.data);

export {
    groupCreate,
    getMyGroups,
    getGroupMsgs,
};