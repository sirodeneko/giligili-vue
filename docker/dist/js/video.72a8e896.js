(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["video"],{"16cf":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-button",{attrs:{type:"primary",plain:""},on:{click:t.btnClick}},[t._v(t._s(t.message))]),n("Geet",{attrs:{isGeet:t.isgt},on:{geetPath:t.GeetPath,clickChange:t.GeetChange}})],1)},a=[],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("i",{ref:"btn"})])},i=[],r={data:function(){return{}},props:["isGeet"],methods:{GtCaptcha:function(){var t=this;t.axios.get("http://www.geetest.com/demo/gt/register-slide?t="+(new Date).getTime()).then(function(e){console.log("1,页面初始化，调用极验接口1，进行图形验证码的加载"),console.log(e);var n=e.data,o=function(e){e.onSuccess(function(){var o=e.getValidate(),a={geetest_challenge:o.geetest_challenge,geetest_validate:o.geetest_validate,geetest_seccode:o.geetest_seccode,status:n.success};console.log("3，图形验证通过，将数据传递给父组件，进行服务端验证"),t.$emit("geetPath",a)}).onError(function(){}),t.$refs.btn.addEventListener("click",function(){t.$emit("clickChange",!1),t.isGeet&&e.verify()})};t.$initGeet({gt:n.gt,challenge:n.challenge,product:"bind",offline:!n.success,https:!0},o)})}},computed:{},created:function(){this.GtCaptcha()},mounted:function(){},watch:{isGeet:function(){this.$refs.btn.click()}}},c=r,l=n("2877"),u=Object(l["a"])(c,s,i,!1,null,"20f576b0",null),f=u.exports,m={data:function(){return{flog:0,isgt:!1,message:"点击验证"}},components:{Geet:f},methods:{btnClick:function(){console.log("2,按钮被点击，进行图形验证"),this.isgt=!this.isgt},GeetChange:function(t){this.isgt=t},GeetPath:function(t){var e=0;console.log("4,接受到图形验证参数，将参数发往服务端进行验证"),console.log(t),this.flog=t.status,1==this.flog&&(this.$notify({title:"验证成功",message:"",type:"success"}),e=1),this.isgt=!1,this.$emit("ok",e)}},computed:{},created:function(){},mounted:function(){}},d=m,p=Object(l["a"])(d,o,a,!1,null,"61273c92",null);e["a"]=p.exports},"43fd":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"post-video"},[n("div",{staticClass:"main-contianer"},[n("h2",[t._v("欢迎投稿：")]),n("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[n("el-form-item",{attrs:{label:"标题",rules:[{required:!0,message:"标题不能为空"}]}},[n("el-input",{model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),n("el-form-item",{attrs:{label:"描述"}},[n("el-input",{attrs:{type:"textarea"},model:{value:t.form.info,callback:function(e){t.$set(t.form,"info",e)},expression:"form.info"}})],1),n("el-form-item",{attrs:{label:"视频封面",rules:[{required:!0,message:"封面不能为空"}]}},[n("el-upload",{ref:"upload",staticClass:"avatar-uploader",attrs:{action:"",label:"描述","before-upload":t.fnBeforeUpload,"http-request":t.fnUploadRequest,"show-file-list":!1}},[t.imageUrl?n("img",{staticClass:"avatar",attrs:{src:t.imageUrl}}):n("i",{staticClass:"el-icon-plus avatar-uploader-icon"}),n("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传png/jpg文件，且不超过2M")])])],1),n("el-form-item",{attrs:{label:"视频"}},[n("el-upload",{staticClass:"upload-demo",attrs:{action:"","before-upload":t.vBeforeUpload,"http-request":t.vUploadRequest,multiple:"",limit:1,"on-exceed":t.handleExceed}},[n("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),n("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传MP4文件，且请您自行压缩")])],1)],1),n("el-form-item",[n("el-progress",{attrs:{percentage:t.percentage,color:t.customColorMethod,"show-text":!1}})],1),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("立即创建")])],1)],1)],1)])},a=[],s=(n("7f7f"),n("76e5")),i=n("f766"),r={name:"PostVideo",data:function(){return{imageUrl:"",dialogImageUrl:"",percentage:0,customColor:"#409eff",videoUrl:"",dialogVideoUrl:"",dialogVisible:!1,form:{title:"",info:"",url:"",avatar:""}}},methods:{fnBeforeUpload:function(t){var e="image/png"===t.type||"image/jpeg"===t.type,n=t.size/1024/1024<2;return e||this.$message.error("上传头像图片只能是 PNG/JPG 格式!"),n||this.$message.error("上传头像图片大小不能超过 2MB!"),e&&n},fnUploadRequest:function(t){var e=this;i["b"](t.file.name).then(function(n){var o=new XMLHttpRequest;o.open("PUT",n.data.put,!0),o.send(t.file),o.onload=function(){e.imageUrl=n.data.get,e.form.avatar=n.data.key}}).catch(function(t){e.$notify.error({title:"网路错误，或者服务器宕机",message:t})})},vBeforeUpload:function(t){var e="video/mp4"===t.type;return e||this.$message.error("上传视频只能是 mp4 格式!"),e},customColorMethod:function(t){return t<50?"#909399":t<100?"#e6a23c":"#67c23a"},vUploadRequest:function(t){var e=this;i["a"](t.file.name).then(function(n){var o=new XMLHttpRequest;o.upload.onprogress=function(t){t.lengthComputable&&(e.percentage=Math.floor(t.loaded/t.total*100),console.log(e.percentage))},o.open("PUT",n.data.put,!0),o.send(t.file),o.onload=function(){e.form.url=n.data.key,e.$notify({title:"视频上传成功",message:"success",type:"success"})}}).catch(function(t){e.$notify.error({title:"网路错误，或者服务器宕机",message:t})})},handleExceed:function(t){this.$message.warning("仅可上传一个视频")},onSubmit:function(){var t=this;this.percentage=0,s["d"](this.form).then(function(e){e.status>0?t.$notify.error({title:"投稿失败",message:e.msg}):t.$notify({title:"投稿成功",message:"您的投稿ID为".concat(e.data.id),type:"success"})}).catch(function(e){t.$notify.error({title:"投稿失败惹",message:e})})}},comments:{}},c=r,l=(n("48bf"),n("2877")),u=Object(l["a"])(c,o,a,!1,null,null,null);e["default"]=u.exports},"48bf":function(t,e,n){"use strict";var o=n("65cc"),a=n.n(o);a.a},"65cc":function(t,e,n){},7555:function(t,e,n){"use strict";n.d(e,"c",function(){return s}),n.d(e,"d",function(){return i}),n.d(e,"b",function(){return r}),n.d(e,"a",function(){return c}),n.d(e,"e",function(){return l});var o=n("bc3a"),a=n.n(o),s=function(t){return a.a.post("/api/v1/user/login",t).then(function(t){return t.data})},i=function(t){return a.a.post("/api/v1/user/register",t).then(function(t){return t.data})},r=function(){return a.a.get("/api/v1/user/me").then(function(t){return t.data})},c=function(){return a.a.delete("/api/v1/user/logout").then(function(t){return t.data})},l=function(t){return a.a.put("/api/v1/user/account",t).then(function(t){return t.data})}},"7f7f":function(t,e,n){var o=n("86cc").f,a=Function.prototype,s=/^\s*function ([^ (]*)/,i="name";i in a||n("9e1e")&&o(a,i,{configurable:!0,get:function(){try{return(""+this).match(s)[1]}catch(t){return""}}})},a55b:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"login"},[n("div",{staticClass:"main-contianer"},[n("div",{staticClass:"mycard"},[n("div",{staticClass:"title"},[t._v("登录：")]),n("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[n("el-form-item",{attrs:{label:"账号",rules:[{required:!0,message:"账号不能为空"}]}},[n("el-input",{model:{value:t.form.user_name,callback:function(e){t.$set(t.form,"user_name",e)},expression:"form.user_name"}})],1),n("el-form-item",{attrs:{label:"密码",rules:[{required:!0,message:"密码不能为空"}]}},[n("el-input",{attrs:{type:"password"},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),n("el-form-item",[n("GtPage",{on:{ok:t.ok}})],1),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("登录")]),n("el-button",{nativeOn:{click:function(e){return t.onRegister(e)}}},[t._v("注册")])],1)],1)],1)])])},a=[],s=n("7555"),i=n("16cf"),r={name:"Login",data:function(){return{okk:0,form:{user_name:"",password:""}}},methods:{ok:function(t){this.okk=t},onSubmit:function(){var t=this;1==this.okk?s["c"](this.form).then(function(e){e.status>0?t.$notify.error({title:"登录失败",message:e.msg}):(t.$cookies.set("gin-ess","6666",518400),t.$notify({title:"登录成功",message:"success",type:"success"}),t.$bus.emit("myspace"),t.$router.push({name:"home"}))}).catch(function(e){t.$notify.error({title:"登录失败惹",message:e})}):this.$notify.error({title:"请验证",message:""})},onRegister:function(){this.$router.push({name:"Register"})}},comments:{},components:{GtPage:i["a"]}},c=r,l=(n("d6db"),n("2877")),u=Object(l["a"])(c,o,a,!1,null,null,null);e["default"]=u.exports},a9e7:function(t,e,n){},d6db:function(t,e,n){"use strict";var o=n("a9e7"),a=n.n(o);a.a},f766:function(t,e,n){"use strict";n.d(e,"b",function(){return s}),n.d(e,"a",function(){return i});var o=n("bc3a"),a=n.n(o),s=function(t){return a.a.post("/api/v1/upload/token",{filename:t}).then(function(t){return t.data})},i=function(t){return a.a.post("/api/v1/upload/tack",{filename:t}).then(function(t){return t.data})}}}]);
//# sourceMappingURL=video.72a8e896.js.map