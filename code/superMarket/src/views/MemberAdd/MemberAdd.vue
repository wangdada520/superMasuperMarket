<template>
    <div class="member-add">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h1>会员-添加账号</h1>
            </div>
            <div class="text item">
                <el-form :model="menberAddForm" :rules="rules" ref="menberAddForm" label-width="100px" class="demo-ruleForm">
                    
                    <el-form-item label="真实名字" prop="name">
                        <el-input v-model="menberAddForm.name" class="memberwid"></el-input>
                    </el-form-item>

                    <el-form-item label="会员卡卡号" prop="card">
                        <el-input v-model="menberAddForm.card" class="memberwid"></el-input>
                    </el-form-item>

                    <el-form-item label="用户组" prop="user_group">
                        <el-select v-model="menberAddForm.user_group" placeholder="铜牌管理员" class="memberwid">
                            <el-option label="铜牌管理员" value="铜牌管理员"></el-option>
                            <el-option label="银牌管理员" value="银牌管理员"></el-option>
                            <el-option label="金牌管理员" value="金牌管理员"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="身份证号" prop="identity">
                        <el-input v-model="menberAddForm.identity" class="memberwid"></el-input>
                    </el-form-item>

                    <el-form-item label="用户状态" prop="state">
                        <el-radio-group v-model="menberAddForm.state" class="memberwid">
                            <el-radio label="启用"></el-radio>
                            <el-radio label="禁用" aria-checked="checked"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="手机号码" prop="identity">
                        <el-input v-model="menberAddForm.identity" class="memberwid"></el-input>
                    </el-form-item>

                    <el-form-item label="座机号码" prop="identity">
                        <el-input v-model="menberAddForm.identity" class="memberwid"></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱地址" prop="identity">
                        <el-input v-model="menberAddForm.identity" class="memberwid"></el-input>
                    </el-form-item>

                    <el-form-item label="地区选择" prop="region">
                        <el-select v-model="menberAddForm.region" placeholder="--请选择省份--" class="memberwid">
                            <el-option label="四川" value="四川"></el-option>
                            <el-option label="北京" value="北京"></el-option>
                            <el-option label="上海" value="上海"></el-option>
                        </el-select>
                        <el-select v-model="menberAddForm.region" placeholder="--请选择城市--" class="memberwid">
                            <el-option label="成都" value="成都"></el-option>
                            <el-option label="绵阳" value="绵阳"></el-option>
                            <el-option label="巴中" value="巴中"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="详细地址" prop="identity">
                        <el-input v-model="menberAddForm.identity" class="memberwid"></el-input>
                    </el-form-item>

                    <el-form-item label="邮政编码" prop="identity">
                        <el-input v-model="menberAddForm.identity" class="memberwid"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="submitForm('menberAddForm')">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
      return {
        menberAddForm: {
          name: '',
          region: '',
          type: [],
          resource: '',
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
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
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
