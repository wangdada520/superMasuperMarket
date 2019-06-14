<template>
    <div class="account-manage">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>账户管理</span>
            </div>
            <!-- 账户列表 -->
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                >
                <el-table-column
                    type="selection">
                </el-table-column>
                <!-- 用户名称 -->
                <el-table-column
                    label="用户名称">
                <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <!-- 用户组 -->
                <el-table-column
                    prop="userGroup"
                    label="用户组">
                </el-table-column>
                <!-- 创建日期 -->
                <el-table-column
                    prop="createDate"
                    label="日期"
                    show-overflow-tooltip>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column label="管理">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i> 修改</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i> 删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div style="margin-top: 20px">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
            <!-- 批量删除&取消选择 -->
            <div style="margin-top: 20px">
                <el-button type="danger">批量删除</el-button>
                <el-button @click="toggleSelection()" type="primary">取消选择</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
  data() {
    return {
      // 表格数据
      tableData: [
        {
          name: "王大大",
          userGroup: "管理员",
          createDate: "2019-01-10"
        },
        {
          name: "杰哥哥",
          userGroup: "管理员",
          createDate: "2019-01-10"
        },
        {
          name: "黄三岁",
          userGroup: "员工",
          createDate: "2019-02-10"
        }
      ],
      //  当前页
      currentPage4:1,
    // 总页数
      total:100
    };
  },

  methods: {
    handleEdit() {},
    handleDelete() {},
    // 取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSizeChange(){},
    handleCurrentChange(){}
  }
};
</script>

<style lang="less">
@import "./AccountManage.less";
</style>
