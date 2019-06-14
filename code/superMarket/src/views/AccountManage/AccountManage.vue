<template>
  <div class="Account-Manage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账户管理</span>
      </div>
      <!-- n内容 -->
      <div class="text item">
        <el-table ref="multipleTable" :data="accountData" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="selection"></el-table-column>

          <!-- 账号 -->
          <el-table-column prop="account" label="账号"></el-table-column>

          <!-- 用户组 -->
          <el-table-column prop="userGroup" label="用户组" show-overflow-tooltip></el-table-column>

          <!-- 创建账号日期 -->
          <el-table-column label="日期">
            <template slot-scope="scope">{{ scope.row.Ctime }}</template>
          </el-table-column>

          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">
                <i class="el-icon-edit"></i>修改
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                <i class="el-icon-delete"></i>删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页功能 -->
        <el-pagination
           style="margin-top: 20px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
        <!-- 删除和全选 -->
        <div style="margin-top: 20px">
          <el-button type="success">批量删除</el-button>
          <el-button type="danger">取消选择</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accountData: [
        {
          account: "王大大",
          userGroup: "超级管理员",
          Ctime: "2019-6-13"
        },
        {
          account: "杰哥哥",
          userGroup: "超级管理员",
          Ctime: "2019-6-13"
        },
        {
          account: "王大大",
          userGroup: "超级管理员",
          Ctime: "2019-6-13"
        },
        {
          account: "杰哥哥",
          userGroup: "超级管理员",
          Ctime: "2019-6-13"
        },
        {
          account: "王大大",
          userGroup: "超级管理员",
          Ctime: "2019-6-13"
        },
        {
          account: "杰哥哥",
          userGroup: "超级管理员",
          Ctime: "2019-6-13"
        },
        {
          account: "王大大",
          userGroup: "超级管理员",
          Ctime: "2019-6-13"
        },
        {
          account: "杰哥哥",
          userGroup: "超级管理员",
          Ctime: "2019-6-13"
        }
      ],
      currentPage:1,//当前页
      total:11,

    };
  },
  methods: {
    //    修改
    handleEdit(index, row) {
      console.log(index, row);
    },
    //   删除
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
};
</script>

<style lang="less">
@import "./AccountManage.less";
</style>