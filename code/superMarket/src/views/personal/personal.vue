<template>
    <div class="personal">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h1>个人中心</h1>
            </div>
            <div class="text item">
                <p>账户：{{accountObj.account}}</p>
                <p>用户ID：{{accountObj.id}}</p>
                <p>用户组：{{accountObj.user_group}}</p>
                <p>创建时间：{{accountObj.create_date | filterTime}}</p>
            </div>
            <div style="margin-top:20px;">
                <el-upload
                    class="avatar-uploader"
                    action="#"
                    :http-request="uploadAavatar"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
        </el-card>
    </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
export default {
    data(){
        return {
            accountObj:{
                account:'',
                id:'',
                user_group:'',
                create_date:''
            },
            imageUrl: ''
        }
    },
    methods:{
        // 获取用户信息
        getaccountObj(){
            this.request.get('/account/getaccountObj')
                .then(res => {
                    // console.log(res)
                    this.accountObj = res[0];
                })
                .catch(err => {
                    console.log(err)
                })
        },
        // 头像上传成功
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        // 头像上传之前限制
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        // 上传函数
        uploadAavatar(file){
            // console.log(file);
            // 创建formData实例对象
            let formData = new FormData();
            // 把文件信息添加进对象
            formData.append('file',file.file);
            // 发送文件信息给后台
            axios.post('/account/uploadavatar',formData)
                .then(response => {
                    // 获取地址
                    let {avatarUrl} = response.data;
                    // 回填
                    this.imageUrl = 'http://127.0.0.1:999' + avatarUrl;
                    // 传递给父组件
                    this.$emit('sc');
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    created(){
        this.getaccountObj();
    },
    filters:{
        filterTime(time){
            return moment(time).format('YYYY-MM-DD HH:mm:ss');
        }
    }
}
</script>

<style lang="less">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
