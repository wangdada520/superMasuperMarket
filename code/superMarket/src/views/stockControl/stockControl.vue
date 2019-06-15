
<template>
    <div class="stockControl">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h1>商品入库</h1>
            </div>
            <div class="text item">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="top">
                    <el-form-item label="商品条形码" prop="name">
                        <el-input v-model="ruleForm.name" class="stockControlWid"></el-input>
                    </el-form-item>
                    <el-form-item label="数量" prop="number" class="stockControlMbottom">
                        <el-input v-model="ruleForm.number" class="stockControlWid"></el-input>
                        <p>记重商品单位为千克</p>
                    </el-form-item>
                    <el-form-item label="进价" prop="price">
                        <el-input v-model="ruleForm.price" class="stockControlWid"></el-input>元
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="submitForm('ruleForm')">入库</el-button>
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
        ruleForm: {
          name: '',
          number:'',
          price:''
        },
        rules: {
          name: [
            { required: true, message: '请输入条形码', trigger: 'blur' },
          ],
          number: [
            { required: true, message: '请输入数量', trigger: 'blur' },
          ],
          price: [
            { required: true, message: '请输入价格', trigger: 'blur' },
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
            .stockControlWid{
                width: 20%;
                margin: 0;
            }
            p{
                font-size: 12px;
                color: #666;
            }
            .stockControlMbottom{
                margin-bottom: 0;
            }
        }
    }
</style>