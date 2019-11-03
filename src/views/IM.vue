<template>
  <div class="im">
    <!-- <div class="main-contianer"> -->
    <!-- <el-input v-model="toMsg.msg"></el-input>
    <el-button type="primary" @click="putMsgSubmit">立即发送</el-button>-->
    <div class="main-im-s">
      <div class="maim-im">
        <div class="im-master">
          <img
            class="im-m-avater"
            :src="me.avatar"
            style="width: 60px; height:60px; border-radius:30px;"
          />
        </div>
        <div class="im-m-list">
          <div class="im-m-l-search">
            <input class="im-m-l-s-input" type="text" placeholder="搜索群组/用户" />
            <div class="im-m-l-add" @click="addNewRoom"></div>
          </div>
          <div class="im-m-l-list">
            <div
              :class="isFocus==index?'im-m-l-l-room-focus':'im-m-l-l-room' "
              v-for="(item, index) in listRooms"
              :key="index"
              @click="changeRoom(index)"
            >
              <img :src="item.avatar" alt style="width: 48px; height: 48px; border-radius: 24px;" />
              <div class="im-m-l-l-r-main">
                <div class="im-m-l-r-m-name" style="color:#f7f7f7;font-size: 14px;">
                  <p>{{item.groupName}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="im-char">
          <div class="im-c-header">
            <h2 style="font-size: 16px;color: #333;">{{chatMain.groupName}}</h2>
          </div>
          <div class="im-c-message" id="im-c-msg">
            <div
              :class="item.userID!=me.uid?'im-c-m-msg-left':'im-c-m-msg-right'"
              v-for="(item, index) in msgs"
              :key="index"
            >
              <img class="im-c-m-avater" :src="item.from_avatar" alt />
              <div :class="item.userID!=me.uid?'im-c-m-m-left':'im-c-m-m-right'">
                <div :class="item.userID!=me.uid?'im-c-m-m-name-left':'im-c-m-m-name-right'">
                  <span
                    class="im-c-m-m-name-name"
                    style="margin-right: 0;color: #333;font-size: 13px;"
                  >{{item.from_name}}</span>
                  <span
                    class="im-c-m-m-name-time"
                    style="color: #666;font-size: 12px;margin-left: 4px;margin-right: 4px;"
                  >{{timestampToTime(item.created_at)}}</span>
                </div>
                <div style="display: flex;">
                  <div
                    v-if="item.msg_type==1"
                    :class="item.userID!=me.uid?'im-c-m-m-txt-left':'im-c-m-m-txt-right'"
                  >
                    <div style="    user-select: text;word-break: break-word;">{{item.msg}}</div>
                  </div>
                  <div
                    v-if="item.msg_type==2"
                    :class="item.userID!=me.uid?'im-c-m-m-txt-left':'im-c-m-m-txt-right'"
                  >
                    <img :src="item.msg" style="max-width: 400px;max-height: 450px;" />
                  </div>
                  <div :class="item.userID!=me.uid?'im-c-m-m-3-left':'im-c-m-m-3-right'"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="im-c-charInput">
            <div class="im-c-c-img-no"></div>
            <input
              class="im-c-c-input"
              type="text"
              placeholder="聊点什么吧 (/≧▽≦/) "
              v-model="toMsg.msg"
              @keyup.enter="putMsg"
            />
            <div class="im-c-c-img-yes" @click="putMsg"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>
<script>
import * as API from "@/api/login";
import * as ImAPI from "@/api/im";
export default {
  name: "IM",
  data() {
    return {
      isFocus: 0,
      chatMain: {
        groupName: ""
      },
      msgs: [],
      websock: null,
      createRoomForm: {
        name: "",
        type: 1
      },
      toMsg: {
        user_id: 1,
        to: 1,
        type: 1,
        msg: ""
      },
      me: {
        uid: 0,
        nickname: "",
        avatar: ""
      },
      //聊天室列表
      listRooms: []
    };
  },
  created() {
    this.initWebSocket();
    this.load();
  },
  destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
  },
  methods: {
    load() {
      API.getMe().then(res => {
        this.me.uid = res.data.id;
        this.me.nickname = res.data.nickname;
        this.me.avatar = res.data.avatar;
      });
      ImAPI.getMyGroups()
        .then(res => {
          if (res.status > 0) {
            this.$notify.error({
              title: "失败",
              message: res.msg
            });
          } else {
            this.listRooms = res.data.items;
            this.chatMain = this.listRooms[0];
            for (var i = 0; i < this.listRooms.length; i++) {
              //加入房间
              let actions = {
                ws_header: "link",
                id: this.listRooms[i].id
              };
              this.websocketsend(JSON.stringify(actions));
              //拉聊天记录
              //var _this = this;
              ImAPI.getGroupMsgs(this.listRooms[i].id).then(res => {
                //_this.listRooms[i]["msgs"] = res;
                //console.log(this.listRooms);
                for (var j = 0; j < this.listRooms.length; j++) {
                  if (res.data.items != null) {
                    if (this.listRooms[j].id == res.data.items[0].to) {
                      this.listRooms[j]["msgs"] = res.data.items.reverse();
                      if (j == 0) {
                        this.msgs = this.listRooms[0].msgs;
                        this.scrollToBottom();
                        //console.log(this.msgs);
                      }
                      break;
                    }
                  } else {
                    this.listRooms[j]["msgs"] = [];
                  }
                }
              });
            }
          }
        })
        .catch(error => {
          this.$notify.error({
            title: "加载失败惹",
            message: error
          });
        });
    },
    putMsgSubmit() {
      let actions = this.toMsg;
      actions["ws_header"] = "msg";
      this.websocketsend(JSON.stringify(actions));
    },
    putMsg() {
      if (this.toMsg.msg != "") {
        let actions = this.toMsg;
        actions.user_id = this.me.uid;
        actions.type = 1;
        actions.to = this.listRooms[this.isFocus].id;
        actions["ws_header"] = "msg";
        this.websocketsend(JSON.stringify(actions));
        console.log(actions);
        this.toMsg.msg = "";
      }
    },
    createRoomSubmit() {
      ImAPI.groupCreate(this.createRoomForm)
        .then(res => {
          console.log(res);
          if (res.status > 0) {
            this.$notify.error({
              title: "失败",
              message: res.msg
            });
          } else {
          }
        })
        .catch(error => {
          this.$notify.error({
            title: "创建失败惹",
            message: error
          });
        });
    },
    addNewRoom() {
      this.$prompt("请输入房间名", "创建小房间", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
        inputErrorMessage: "不允许有特殊字符哦°(°ˊДˋ°) °"
      })
        .then(({ value }) => {
          let from = {
            name: "",
            type: 1
          };
          from.name = value;
          ImAPI.groupCreate(from)
            .then(res => {
              console.log(res);
              if (res.status > 0) {
                this.$notify.error({
                  title: "失败",
                  message: res.msg
                });
              } else {
                this.$message({
                  type: "success",
                  message: "创建成功"
                });
              }
            })
            .catch(error => {
              this.$notify.error({
                title: "创建失败惹",
                message: error
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消创建"
          });
        });
    },
    changeRoom(index) {
      this.isFocus = index;
      this.chatMain = this.listRooms[this.isFocus];
      this.msgs = this.listRooms[this.isFocus].msgs;
      this.scrollToBottom();
    },
    getMsg(redata) {
      //console.log(this.listRooms[0]);
      let msg = document.getElementById('im-c-msg');
      var f=0;
      if(msg.scrollTop+msg.clientHeight >= msg.scrollHeight-3){
        f=1;
        console.log(1);
      }
      for (var i = 0; i < this.listRooms.length; i++) {
        if (this.listRooms[i].id == redata.data.to) {
          this.listRooms[i].msgs.push(redata.data);
          if (this.isFocus == i) {
            this.msgs = this.listRooms[this.isFocus].msgs;
          }
          break;
        }
      }
      this.$nextTick(() => {
        console.log(3);
        if(f==1){
          msg.scrollTop = msg.scrollHeight-msg.clientHeight; // 滚动高度
          console.log(2);
        }
        
      })
    },
    //滚动到底部
    scrollToBottom(){
      let msg = document.getElementById('im-c-msg');
       //msg.scrollTop = msg.scrollHeight-msg.clientHeight;
      this.$nextTick(() => {
        msg.scrollTop = msg.scrollHeight-msg.clientHeight; // 滚动高度
      })
    },
    // 时间戳转换成时间
    timestampToTime(cjsj) {
      if (cjsj / 10000000000 <= 1) {
        cjsj = cjsj * 1000;
      }
      var date = new Date(cjsj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "/";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes();
      var s = date.getSeconds();
      return M + D + h + m;
      //return M+D;
    },
    initWebSocket() {
      //初始化weosocket
      const wsuri = "ws://" + window.location.host + "/api/v1/ws";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      let actions = {
        ws_header: "ping"
      };
      //对象转json字符串
      this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      //字符串转json
      const redata = JSON.parse(e.data);
      //console.log(redata);
      switch (redata.status) {
        case 0:
          //console.log(redata);
          this.getMsg(redata);
          break;
        case 1:
          break;
        case 50001:
          console.log(redata.msg);
          break;
      }
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接");
    }
  },
  mounted() {
    this.timer = setInterval(this.websocketonopen, 30000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style>
.im {
  background: #d2e9fb
    url(https://giligili-img-av.oss-cn-hangzhou.aliyuncs.com/img/imBack.jpg)
    top/contain no-repeat;
  background-size: 1920px 1080px;
  height: 100vh;
  min-width: 1300px;
  position: relative;
  font-family: "local-file", "Arial", "Verdana", "微软雅黑", "黑体", "serif";
}
.maim-im {
  width: 80vw;
  height: 90vh;
  left: 10vw;
  top: 5vh;
  position: absolute;

  display: flex;
  border-radius: 10px;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.5);
}
.main-im-s::before {
  width: 80vw;
  height: 90vh;
  left: 10vw;
  top: 5vh;
  content: " ";
  position: absolute;
  background-attachment: fixed;
  background-size: cover;
  background-image: url(https://giligili-img-av.oss-cn-hangzhou.aliyuncs.com/img/imBack.jpg);
  filter: blur(10px);
  z-index: 0;
}
.im-master {
  width: 80px;
  background-color: #4a90e2cc;
  display: flex;
  align-items: center;
  position: relative;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.im-m-avater {
  margin-top: 50px;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 10px;
}
.im-m-list {
  width: 300px;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: unset;
  background-color: rgba(74, 144, 226, 0.5);
}
.im-m-l-search {
  display: flex;
  height: 70px;
  width: 276px;

  align-items: center;
  padding: 0 12px;
  position: relative;
}
.im-m-l-s-input {
  padding-left: 35px;
  padding-right: 15px;
  padding-top: 2px;
  border: none;
  border-radius: 18px;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  color: #333;
  box-sizing: border-box;
  user-select: auto;
  height: 36px;
  outline: none;
}
.im-m-l-add {
  height: 35px;
  width: 35px;
  background: url(../../public/加.png) top/contain no-repeat;
  margin-left: 10px;
  cursor: pointer;
}
.im-m-l-list {
  width: 300px;
  flex: 1;
  overflow-y: auto;
  /* background: #d2e9fb; */
  -webkit-overflow-scrolling: touch;
}

.im-m-l-list::-webkit-scrollbar {
  display: none;
}
.im-m-l-l-room {
  height: 70px;
  display: flex;
  align-items: center;
  padding: 10px 16px;
  cursor: default;
  transition: background-color 0.2s;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.im-m-l-l-room-focus {
  height: 70px;
  display: flex;
  align-items: center;
  padding: 10px 16px;
  cursor: default;
  transition: background-color 0.2s;
  -ms-flex-pack: justify;
  justify-content: space-between;
  background-color: rgba(74, 144, 226, 0.4);
}
.im-m-l-l-r-main {
  flex: 1;
  margin-left: 12px;
}
.im-char {
  -ms-flex: 1;
  flex: 1;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  background-color: rgba(241, 241, 241, 0.6);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: hidden;
  position: relative;
}
.im-c-header {
  height: 70px;
  border-bottom: 1px solid rgba(208, 208, 208, 0.6);
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding: 0px 18px;
  -ms-flex-pack: justify;
  justify-content: space-between;
  position: relative;
}
.im-c-message {
  -ms-flex: 1;
  flex: 1;
  padding: 8px 10px 0 10px;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}
.im-c-m-msg-left {
  display: -ms-flexbox;
  display: flex;
  margin-right: 54px;
  margin-bottom: 10px;
  position: relative;
}
.im-c-m-msg-right {
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
  margin-right: 0px;
  margin-left: 54px;
  display: flex;
  margin-bottom: 10px;
  position: relative;
}
.im-c-m-avater {
  width: 44px;
  height: 44px;
  border-radius: 22px;
}
.im-c-m-m-left {
  margin-left: 12px;
  flex-direction: column;
}
.im-c-m-m-right {
  margin-left: 0px;
  margin-right: 12px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-align: end;
  align-items: flex-end;
}
.im-c-m-m-name-left {
  height: 20px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: end;
  align-items: flex-end;
}
.im-c-m-m-name-right {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
  height: 20px;

  -ms-flex-align: end;
  align-items: flex-end;
}
.im-c-m-m-txt-left {
  display: inline-block;
  color: #555;
  font-size: 14px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 6px 8px;
  border-radius: 8px;
  border-top-left-radius: 0px;
  min-height: 28px;
  margin-top: 3px;
}
.im-c-m-m-txt-right {
  color: rgba(255, 255, 255, 0.9);
  background-color: #4a90e2;
  border-top-left-radius: 8px;
  border-top-right-radius: 0px;
  display: inline-block;
  font-size: 14px;
  padding: 6px 8px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  margin-top: 3px;
}
.im-c-m-m-3-left {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0px 7px 15px 0;
  border-color: transparent rgba(255, 255, 255, 0.8) transparent transparent;
  position: absolute;
  top: 23px;
  left: 49px;
}
.im-c-m-m-3-right {
  border-width: 0 0 15px 7px;
  border-color: transparent transparent transparent #4a90e2;
  left: initial;
  right: 49px;
  top: 23px;
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
}
.im-c-charInput {
  height: 60px;
  background-color: rgba(255, 255, 255, 0.5);
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding: 0px 20px;
  border-bottom-right-radius: 10px;
}
.im-c-c-img-no {
  width: 35px;
  height: 35px;
  background-image: url(../../public/图片1.png);
  background-size: 35px 35px;
}
.im-c-c-img-no:hover {
  background-image: url(../../public/图片2.png);
}
.im-c-c-img-yes {
  width: 30px;
  height: 30px;
  background-image: url(../../public/emi纸飞机1.png);
  background-size: 30px 30px;
  margin-left: 5px;
}
.im-c-c-img-yes:hover {
  background-image: url(../../public/emi纸飞机2.png);
}
.im-c-c-input {
  flex: 1;
  padding: 0px 8px;
  height: 32px;
  line-height: 32px;
  outline: none;
  border: 1px solid rgba(208, 208, 208, 0.5);
  font-size: 14px;
  color: #666;
  -webkit-user-select: auto;
  -moz-user-select: auto;
  -ms-user-select: auto;
  user-select: auto;
  margin-left: 5px;
  overflow: visible;
}
</style>
