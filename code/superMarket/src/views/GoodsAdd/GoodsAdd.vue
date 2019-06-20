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
          :model="goods"
          status-icon
          :rules="rules"
          ref="goods"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 选择分类 -->
          <el-form-item label="所属分类" prop="cate_id">
            <el-select style="width:50%" v-model="goods.cate_id" placeholder="--选择分类--">
              <el-option label="电子类" value="电子类"></el-option>
              <el-option label="食品类" value="食品类"></el-option>
              <el-option label="烟酒类" value="烟酒类"></el-option>
              <el-option label="服装类" value="服装类"></el-option>
              <el-option label="肉类" value="肉类"></el-option>
              <el-option label="蔬菜类" value="蔬菜类"></el-option>
            </el-select>
          </el-form-item>
          <!-- 商品条形码 -->
          <el-form-item label="商品条形码:" prop="code">
            <el-input v-model="goods.code"></el-input>
            <el-button style="margin-left:5px" type="success">生成条形码</el-button>
          </el-form-item>
          <!-- 生成条形码 -->

          <!-- 商品名称 -->
          <el-form-item label="商品名称:" prop="name">
            <el-input v-model="goods.name"></el-input>
          </el-form-item>
          <!-- 商品进价 -->
          <el-form-item label="商品进价:" prop="costprice">
            <el-input @blur="autoprice" v-model="goods.costprice"></el-input>元
          </el-form-item>
          <!-- 商品售价 -->
          <el-form-item label="商品售价:" prop="price">
            <el-input v-model="goods.price"></el-input>元
          </el-form-item>
          <!-- 市场价 -->
          <el-form-item label="市场价:" prop="seleprice">
            <el-input v-model="goods.seleprice"></el-input>元
            <div>默认售价是市场价的1.2倍</div>
          </el-form-item>
          <!-- 入库数量 -->
          <el-form-item label="入库数量:" prop="awa">
            <el-input v-model="goods.num"></el-input>
          </el-form-item>
          <!-- 商品重量 -->
          <el-form-item label="商品重量:" prop="weight">
            <el-input v-model="goods.weight"></el-input>
            <div>计重商品单价为千克</div>
          </el-form-item>
          <!-- 商品单位 -->
          <el-form-item label="商品单位" prop="goodsUnit">
            <el-input type="text" v-model="goods.goodsUnit" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 会员优惠 -->
          <el-form-item label="会员优惠" prop="member">
            <el-radio-group v-model="goods.member">
              <el-radio label="享受"></el-radio>
              <el-radio label="不享受"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 是否促销 -->
          <el-form-item label="是否促销" prop="saled">
            <el-radio-group v-model="goods.saled">
              <el-radio label="促销"></el-radio>
              <el-radio label="不促销"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 商品简介 -->
          <el-form-item label="商品简介">
            <el-input style="width:600px" type="textarea" v-model="goods.intro"></el-input>
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
// 引入封装的请求函数
import {goodssaveAdd} from "@/api/goods";
export default {
  data() {
    return {
      //表单数据
      goods: {
        cate_id: "", //选择分类
        code: "",//商品条形码
        name: "",//商品名字
        price: "", //售价
        saleprice: "", //市场价
        costprice: 0, //进价
        num: 1, //入库数量
        weight: 1, //商品重量
        saled: 0, //促销
        intro: "", //商品简介
        member: "",
        goodsUnit: ""
      },

      // 验证规则
      rules: {
        cate_id: [{ required: true, message: "不能为空", trigger: "chang" }],
        code: [{ required: true, message: "不能为空", trigger: "blur" }],
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        price: [{ required: true, message: "不能为空", trigger: "blur" }],
        saleprice: [{ required: true, message: "不能为空", trigger: "blur" }],
        costprice: [{ required: true, message: "不能为空", trigger: "blur" }],
        num: [{ required: true, message: "不能为空", trigger: "change" }],
        weight: [{ required: true, message: "不能为空", trigger: "blur" }],
        saled: [{ required: true, message: "不能为空", trigger: "chang" }],
        intro: [{ required: true, message: "不能为空", trigger: "blur" }],
        member: [{ required: true, message: "不能为空", trigger: "chang" }],
        goodsUnit: [{ required: true, message:"不能为空", trigger: "blur" }],
      }
    };
  },
  methods: {
     // 计算价格
    autoprice(){
      this.goods.price=(parseFloat(this.goods.costprice)*1.5).toFixed(2)//售价
      this.goods.seleprice=(parseFloat(this.goods.costprice)*2).toFixed(2)//市场价
    },
    // 添加 按钮
    onSubmit() {
      this.$refs.goods.validate(valid => {
        if (valid) {
          // 获取所有的参数
          let params = {
            name: this.goods.name,
            cate_id: this.goods.cate_id,
            code: this.goods.code,
            costprice: this.goods.costprice,
            price: this.goods.price,
            seleprice: this.goods.seleprice,
            num: this.goods.num,
            weight: this.goods.weight,
            saled: this.goods.saled,
            intro: this.goods.intro
          };
          // console.log(params);

          // 发送ajax请求 b把数据传给后端
         goodssaveAdd(params)
            .then(res => {
              // 获取后台发送的数据
              let { code, reason } = res;
              if (code === 0) {
                this.$message({
                  message: reason,
                  type: "success"
                });
                // 路由跳转
                this.$router.push("/home/GoodsManage");
              } else {
                this.$message.error("商品添加失败");
              }
            })
            .catch(err => {
              console.log(err);
            })
        } else {
          return false;
        }
      })
    }
  }
}

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