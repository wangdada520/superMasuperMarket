<template>
  <div class="Goods-Add">
    <!-- 面板啊 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加商品</span>
      </div>
      <!-- 主要内容 -->
      <div class="text item">
        <el-form
          size="small"
          :model="accountForm"
          status-icon
          :rules="rules"
          ref="accountForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 选择分类 -->
          <el-form-item label="所属分类" prop="region">
            <el-select style="width:50%" v-model="accountForm.region" placeholder="--选择分类--">
              <el-option label="分类一" value="分类一"></el-option>
              <el-option label="分类二" value="分类二"></el-option>
            </el-select>
          </el-form-item>
          <!-- 商品条形码 -->
          <el-form-item label="活动名称:" prop="bar">
            <el-input v-model="accountForm.bar"></el-input>
            <el-button style="margin-left:5px" type="success">生成条形码</el-button>
          </el-form-item>
          <!-- 生成条形码 -->

          <!-- 商品名称 -->
          <el-form-item label="商品名称:" prop="trade">
            <el-input v-model="accountForm.trade"></el-input>
          </el-form-item>
          <!-- 商品售价 -->
          <el-form-item label="商品售价:" prop="price">
            <el-input v-model="accountForm.price"></el-input>元
          </el-form-item>
          <!-- 市场价 -->
          <el-form-item label="市场价:" prop="price">
            <el-input v-model="accountForm.price"></el-input>元
            <div>默认售价是市场价的1.2倍</div>
          </el-form-item>
          <!-- 商品进价 -->
          <el-form-item label="商品进价:" prop="price">
            <el-input v-model="accountForm.price"></el-input>元
          </el-form-item>
          <!-- 入库数量 -->
          <el-form-item label="入库数量:" prop="price">
            <el-input v-model="accountForm.price"></el-input>
            <div>计重商品单价为千克</div>
          </el-form-item>
          <!-- 商品重量 -->
          <el-form-item label="商品重量:" prop="price">
            <el-input v-model="accountForm.price"></el-input>
          </el-form-item>
          <!-- 商品单位 -->
          <el-form-item label="商品单位:" prop="price">
            <el-input v-model="accountForm.price"></el-input>
          </el-form-item>
          <!-- 会员优惠 -->
          <el-form-item label="会员优惠" prop="member">
            <el-radio-group v-model="accountForm.member">
              <el-radio label="享受"></el-radio>
              <el-radio label="不享受"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 是否促销 -->
          <el-form-item label="会员优惠" prop="resource">
            <el-radio-group v-model="accountForm.resource">
              <el-radio label="启用"></el-radio>
              <el-radio label="禁用"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 商品简介 -->
          <el-form-item label="商品简介">
            <el-input style="width:600px" type="textarea" v-model="accountForm.desc"></el-input>
            <div>不超过200个汉字</div>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="onSubmit">添加</el-button>
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
      //表单数据
      accountForm: {
        price: "",
        trade: "",
        bar: "",
        region: "",
        desc: "",
        member: ""
      },
      // 验证规则
      rules: {
        price: [{ required: true, message: "请选择分类", trigger: "change" }],
        trade: [{ required: true, message: "请选择分类", trigger: "change" }],
        bar: [{ required: true, message: "请选择分类", trigger: "change" }],
        region: [{ required: true, message: "请选择分类", trigger: "change" }]
      }
    };
  },
  methods: {
    // 添加 按钮
    onSubmit() {}
  }
};
</script>

<style lang="less">
.Goods-Add {
  .el-card {
    .el-card__header {
      font-size: 22px;
      font-weight: 600;
    }
    .el-card__body {
      .item {
        .el-form {
          .el-form-item {
            
            .el-form-item__content {
              .el-input {
                width: 30%;
              }
            }
          }
        }
      }
    }
  }
}
</style>