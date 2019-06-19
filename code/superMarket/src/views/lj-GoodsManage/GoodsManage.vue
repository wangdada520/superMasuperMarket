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
          :model="goods"
          status-icon
          :data="tableData"
          ref="goods"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 选择分类 -->
          <el-select size="small" v-model="goods.region" placeholder="--选择分类--">
            <el-option label="电子类" value="电子类"></el-option>
            <el-option label="食品类" value="食品类"></el-option>
            <el-option label="烟酒类" value="烟酒类"></el-option>
            <el-option label="服装类" value="服装类"></el-option>
            <el-option label="肉类" value="肉类"></el-option>
            <el-option label="蔬菜类" value="蔬菜类"></el-option>
          </el-select>

          <!-- 关键字 -->
          <el-form-item label="关键字：">
            <el-input  placeholder="(商品名称，条形码)"></el-input>
          </el-form-item>
          <el-button size="mini" type="success">查询</el-button>
          <!-- 分割线 -->
          <div>
            <el-divider></el-divider>
          </div>
          <!-- 商品条形码 -->
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="code" label="商品条形码"></el-table-column>
            <el-table-column prop="name" label="商品名称"></el-table-column>
            <el-table-column prop="cate_id" label="所属分类"></el-table-column>
            <el-table-column prop="price" label="售价(元)"></el-table-column>
            <el-table-column prop="saled" label="促销价(元)"></el-table-column>
            <el-table-column prop="saleprice" label="市场价(元)"></el-table-column>
            <el-table-column prop="num" label="库存"></el-table-column>
            <el-table-column prop="manage" label="管理">
              <template>
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
            :page-sizes="[1, 2, 3, 4]"
            :page-size="pageSize"
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
      goods: {
        region: ""
      },
      //表单数据
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 3, //每页的条数
      total: 2
    };
  },
  methods: {
    // 按照分页请求数据
    goodstpage() {
      // 收集参数
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      // console.log(params)
      // 请求数据
      this.request.get("/goodsadd/ljgoodspage", params)
        .then(res => {
          // 接收后端数据
          let { total, data } = res;
          // 赋值给对应变量
          this.total = total;
          this.accountData = data;
          // 如果这一页已经没有数据了
          if (!data.length && this.currentPage !== 1) {
            // 回到上一页
            this.currentPage -= 1;
            // 调用自己
            this.goodstpage();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    
    // 分页
    handleSizeChange(val) {
      // 赋值
      this.pageSize = val;
      // 调用分页  //
    //   this.goodstpage();
    },
    // 当前的页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      // 调用分页  //
    //   this.goodstpage();
    }
  },
  // 钩子函数-vue实例对象创建完成，dom还没有生成
  created() {
    // 发送axios请求  请求所有的账号和数据
    // this.goodstpage();
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