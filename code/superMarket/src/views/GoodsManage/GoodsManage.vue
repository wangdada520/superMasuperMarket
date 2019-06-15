<template>
  <div class="Goods-manage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>
      <div class="text item">
        <el-form
          :inline="true"
          size="small"
          :model="accountForm"
          status-icon
          :rules="rules"
          ref="accountForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 选择分类 -->
          <el-select size="small" v-model="accountForm.region" placeholder="--选择分类--">
            <el-option label="分类一" value="分类一"></el-option>
            <el-option label="分类二" value="分类二"></el-option>
          </el-select>

          <!-- 关键字 -->
          <el-form-item label="关键字：">
            <el-input v-model="accountForm.user"></el-input>
          </el-form-item>
          <span>(商品名称，条形码)</span>
          <el-button size="mini" type="success">查询</el-button>
          <!-- 分割线 -->
          <div>
            <el-divider></el-divider>
          </div>
          <!-- 商品条形码 -->
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="bar" label="商品条形码" ></el-table-column>
            <el-table-column prop="name" label="商品名称" ></el-table-column>
            <el-table-column prop="classify" label="所属分类"></el-table-column>
            <el-table-column prop="price" label="售价(元)"></el-table-column>
            <el-table-column prop="promotion" label="促销价(元)"></el-table-column>
            <el-table-column prop="market" label="市场价(元)"></el-table-column>
            <el-table-column prop="repertory" label="库存"></el-table-column>
            <el-table-column prop="amoun" label="库存总额(元)"></el-table-column>
            <el-table-column prop="total" label="销售总额(元)"></el-table-column>
            <el-table-column prop="manage" label="管理"></el-table-column>
          </el-table>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
        accountForm:{
            region:""

        },
      //表单数据
      tableData: [
          {
             bar:222222 ,
             name:"",
             classify:"",
             price:"",
             promotion:"",
             market:"",
             repertory:"",
             amoun:"",
             total:"",
             manage:""





          }
      ]
    };
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
  }
}
</style>