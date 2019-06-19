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
          :model="goodsForm"
          status-icon
          :rules="rules"
          ref="goodsForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 选择分类 -->
          <el-form-item label="所属分类" prop="cate_id">
            <el-select style="width:50%" v-model="goodsForm.cate_id" placeholder="--选择分类--">
              <el-option label="电子类" value="电子类"></el-option>
              <el-option label="食品类" value="食品类"></el-option>
              <el-option label="烟酒类" value="烟酒类"></el-option>
              <el-option label="服装类" value="服装类"></el-option>
              <el-option label="肉类" value="肉类"></el-option>
              <el-option label="蔬菜类" value="蔬菜类"></el-option>
            </el-select>
          </el-form-item>
          <!-- 商品条形码 -->
          <el-form-item label="活动名称:" prop="code">
            <el-input v-model="goodsForm.code"></el-input>
          </el-form-item>
          <!-- 商品名称 -->
          <el-form-item label="商品名称:" prop="name">
            <el-input v-model="goodsForm.name"></el-input>
          </el-form-item>
          <!-- 商品售价 -->
          <el-form-item label="商品售价:" prop="price">
            <el-input v-model="goodsForm.price"></el-input>元
          </el-form-item>
          <!-- 市场价 -->
          <el-form-item label="市场价:" prop="seleprice">
            <el-input v-model="goodsForm.seleprice"></el-input>元
            <div>默认售价是市场价的1.2倍</div>
          </el-form-item>
          <!-- 商品进价 -->
          <el-form-item label="商品进价:" prop="costprice">
            <el-input v-model="goodsForm.costprice" @blur="autoPrice"></el-input>元
          </el-form-item>
          <!-- 入库数量 -->
          <el-form-item label="入库数量:" prop="num">
            <el-input v-model="goodsForm.num"></el-input>
          </el-form-item>
          <!-- 商品重量 -->
          <el-form-item label="商品重量:" prop="weight">
            <el-input v-model="goodsForm.weight"></el-input>
            <div>计重商品单价为千克</div>
          </el-form-item>
          <!-- 会员优惠 -->
          <el-form-item label="会员优惠" prop="member">
            <el-radio-group v-model="goodsForm.member">
              <el-radio label="享受"></el-radio>
              <el-radio label="不享受"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 是否促销 -->
          <el-form-item label="会员优惠" prop="saled">
            <el-radio-group v-model="goodsForm.saled">
              <el-radio label="启用"></el-radio>
              <el-radio label="禁用"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 商品简介 -->
          <el-form-item label="商品简介" prop="intro">
            <el-input style="width:600px" type="textarea" v-model="goodsForm.intro"></el-input>
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
      goodsForm: {
        cate_id: "", //选择分类
        code: "",//条形码
        name: "",//商品名称
        price:'',//商品售价
        seleprice:'',//市场价
        costprice:'',//进价
        num: '', //入库数量
        weight: '', //商品重量
        saled: '', //是否促销
        intro: "", //商品简介
        member: ""//会员优惠
      },
      // 验证规则
      rules: {
        cate_id: [{required:true,message:'不能为空',trigger:'change'}],
        code: [{required:true,message:'不能为空',trigger:'blur'}],
        name: [{required:true,message:'不能为空',trigger:'blur'}],
        price:[{required:true,message:'不能为空',trigger:'blur'}],
        seleprice:[{required:true,message:'不能为空',trigger:'blur'}],
        costprice:[{required:true,message:'不能为空',trigger:'blur'}],
        num: [{required:true,message:'不能为空',trigger:'blur'}],
        weight: [{required:true,message:'不能为空',trigger:'blur'}],
        saled: [{required:true,message:'不能为空',trigger:'change'}],
        intro: [{required:true,message:'不能为空',trigger:'blur'}],
        member: [{required:true,message:'不能为空',trigger:'change'}]
      }
    };
  },
  methods: {
    // 添加 按钮
    onSubmit() {
      this.$refs.goodsForm.validate(valid => {
        if (valid) {
          // 获取所有的参数
          let params = {
            cate_id: this.goodsForm.cate_id,
            code: this.goodsForm.code,
            name: this.goodsForm.name,
            price:this.goodsForm.price,
            seleprice:this.goodsForm.seleprice,
            costprice:this.goodsForm.costprice,
            num: this.goodsForm.num,
            weight: this.goodsForm.weight,
            saled: this.goodsForm.saled,
            intro: this.goodsForm.intro,
            member: this.goodsForm.member,
          };
          // 发送ajax请求 b把数据传给后端
          this.request.post("/goodsadd/ljgoodssaveadd", params)
            .then(res => {
              // 获取后台发送的数据
              let { code, reason } = res;
              if (code === 0) {
                this.$message({
                  message: reason,
                  type: "success"
                });
                // 路由跳转
                this.$router.push("/home/ljGoodsManage");
              } else {
                this.$message.error("商品添加失败");
              }
            })
            .catch(err => {});
        } else {
        }
      });
    },
    // 自动补全价格
    autoPrice() {
        this.goodsForm.price = this.goodsForm.costprice * 1.5,
        this.goodsForm.seleprice = this.goodsForm.costprice * 2
    }
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