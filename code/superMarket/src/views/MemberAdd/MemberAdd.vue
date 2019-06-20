<template>
    <div class="member-add">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h1>会员-添加账号</h1>
            </div>
            <div class="text item">
                <el-form :model="memberAddForm" :rules="rules" ref="memberAddForm" label-width="100px" class="demo-ruleForm">
                    <!-- 真实名字 -->
                    <el-form-item label="真实名字" prop="name">
                        <el-input v-model="memberAddForm.name" class="memberwid"></el-input>
                    </el-form-item>
                    <!-- 会员卡卡号 -->
                    <el-form-item label="会员卡卡号" prop="card">
                        <el-input v-model="memberAddForm.card" class="memberwid"></el-input>
                    </el-form-item>
                    <!-- 用户组 -->
                    <el-form-item label="用户组" prop="user_group">
                        <el-select v-model="memberAddForm.user_group" placeholder="铜牌管理员" class="memberwid">
                            <el-option label="铜牌管理员" value="铜牌管理员"></el-option>
                            <el-option label="银牌管理员" value="银牌管理员"></el-option>
                            <el-option label="金牌管理员" value="金牌管理员"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 身份证号 -->
                    <el-form-item label="身份证号" prop="identity">
                        <el-input v-model="memberAddForm.identity" class="memberwid"></el-input>
                    </el-form-item>
                    <!-- 用户状态 -->
                    <el-form-item label="用户状态" prop="state">
                        <el-radio-group v-model="memberAddForm.state" class="memberwid">
                            <el-radio label="启用"></el-radio>
                            <el-radio label="禁用" aria-checked="checked"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- 手机号码 -->
                    <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="memberAddForm.phone" class="memberwid"></el-input>
                    </el-form-item>
                    <!-- 邮箱地址 -->
                    <el-form-item label="邮箱地址" prop="email">
                        <el-input v-model="memberAddForm.email" class="memberwid"></el-input>
                    </el-form-item>
                    <!-- 地区选择 -->
                    <el-form-item label="地区选择" prop="region">
                        <el-select v-model="memberAddForm.region" placeholder="--请选择省份--" class="memberwid">
                            <el-option label="四川" value="四川"></el-option>
                            <el-option label="北京" value="北京"></el-option>
                            <el-option label="上海" value="上海"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 详细地址 -->
                    <el-form-item label="详细地址" prop="adress">
                        <el-input v-model="memberAddForm.adress" class="memberwid"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="submitForm('memberAddForm')">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {memberadd} from '@/api/member';

export default {
    data() {
      return {
        memberAddForm: {
          name: '',
          card:'',
          user_group:'',
          identity:'',
          state:'',
          phone:'',
          email:'',
          region: '',
          adress: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入名字', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
          ],
          card: [
            { required: true, message: '请输入卡号', trigger: 'blur' }
          ],
          user_group: [
            { required: true, message: '请选择用户组', trigger: 'change' }
          ],
          identity: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '不能为空', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          adress: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 收集数据
            let params = {
                name: this.memberAddForm.name,
                card:this.memberAddForm.card,
                user_group:this.memberAddForm.user_group,
                identity:this.memberAddForm.identity,
                state:this.memberAddForm.state,
                phone:this.memberAddForm.phone,
                email:this.memberAddForm.email,
                region: this.memberAddForm.region,
                adress: this.memberAddForm.adress
            }
            // console.log(params)
            // 发送请求
            memberadd(params)
                .then(res => {
                    // 获取后台发送的数据
                    let { code, reason } = res;
                    if (code === 0) {
                        this.$message({
                        message: reason,
                        type: "success"
                        });
                        // 路由跳转
                        this.$router.push("/home/MemberManage");
                    } else {
                        this.$message.error("商品添加失败");
                    }
                })
                .catch(err => {
                    console.log(err)
                })
          } else {
            return false;
          }
        });
      }
    }
}
</script>

<style lang="less">
    .el-card__body{
        .el-form{
            .memberwid{
                width: 20%;
            }
            .el-form-item{
                .el-select{
                    margin-right: 10px;
                    .el-input{
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
