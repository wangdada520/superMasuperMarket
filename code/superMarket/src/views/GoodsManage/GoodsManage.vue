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
            <el-table-column prop="bar" label="商品条形码"></el-table-column>
            <el-table-column prop="name" label="商品名称"></el-table-column>
            <el-table-column prop="classify" label="所属分类"></el-table-column>
            <el-table-column prop="price" label="售价(元)"></el-table-column>
            <el-table-column prop="promotion" label="促销价(元)"></el-table-column>
            <el-table-column prop="market" label="市场价(元)"></el-table-column>
            <el-table-column prop="repertory" label="库存"></el-table-column>
            <el-table-column prop="amoun" label="库存总额(元)"></el-table-column>
            <el-table-column prop="total" label="销售总额(元)"></el-table-column>
            <el-table-column prop="manage" label="管理">
                <template >
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </template>
            </el-table-column>
            
          </el-table>
           <!-- 分页功能 -->
        <el-pagination
           style="margin-top: 20px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accountForm: {
        region: ""
      },
      //表单数据
      tableData: [
        {
          bar: 222222,
          name: "我的优乐美",
          classify: "优乐美",
          price: "2.00",
          promotion: "未促销",
          market: "2.40",
          repertory: "0(缺)",
          amoun: "0.00",
          total: "0.00",
          manage: ""
        },
        {
          bar: 222222,
          name: "我的优乐美",
          classify: "优乐美",
          price: "2.00",
          promotion: "未促销",
          market: "2.40",
          repertory: "0(缺)",
          amoun: "0.00",
          total: "0.00",
          manage: ""
        },
        {
          bar: 222222,
          name: "我的优乐美",
          classify: "优乐美",
          price: "2.00",
          promotion: "未促销",
          market: "2.40",
          repertory: "0(缺)",
          amoun: "0.00",
          total: "0.00",
          manage: ""
        },
        {
          bar: 222222,
          name: "我的优乐美",
          classify: "优乐美",
          price: "2.00",
          promotion: "未促销",
          market: "2.40",
          repertory: "0(缺)",
          amoun: "0.00",
          total: "0.00",
          manage: ""
        },
        {
          bar: 222222,
          name: "我的优乐美",
          classify: "优乐美",
          price: "2.00",
          promotion: "未促销",
          market: "2.40",
          repertory: "0(缺)",
          amoun: "0.00",
          total: "0.00",
          manage: ""
        },
        {
          bar: 222222,
          name: "我的优乐美",
          classify: "优乐美",
          price: "2.00",
          promotion: "未促销",
          market: "2.40",
          repertory: "0(缺)",
          amoun: "0.00",
          total: "0.00",
          manage: ""
        }
      ],
        currentPage:1,//当前页
      total:11,
    };
  },
  // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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