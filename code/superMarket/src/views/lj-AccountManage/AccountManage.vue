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
                    prop="account"
                    label="用户名称">
                </el-table-column>
                <!-- 用户组 -->
                <el-table-column
                    prop="user_group"
                    label="用户组">
                </el-table-column>
                <!-- 创建日期 -->
                <el-table-column label="日期">
                    <template slot-scope="scope">{{ scope.row.create_date | filterDate}}</template>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column label="管理">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(scope.row.id)"><i class="el-icon-edit"></i> 修改</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row.id)"><i class="el-icon-delete"></i> 删除</el-button>
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
import moment from 'moment'

export default {
  data() {
    return {
      // 表格数据
      tableData: [],
      //  当前页
      currentPage4:1,
    // 总页数
      total:100
    };
  },
  methods: {
    //   请求所有账户数据
    getAccountList(){
        //   发送ajax  请求所有数据
        this.request.get('/account/accountlist')
            .then(res => {
                this.tableData = res;
            })
            .catch(err => {
                console.log(err);
            })
    },
    // 修改
    handleEdit(id) {
        // 接受参数
        let params = { id };
        // console.log(params)
    },
    // 删除
    handleDelete(id) {
        // 接受参数
        let params = { id };
        // console.log(params)
        //   发送ajax请求
        this.request.get('/account/delaccount',params)
            .then(res => {
                // 接受后台数据
                let {code,reason} = res;
                // 判断
                if(code === 0){
                    // 弹出成功提示
                    this.$message({
                        message: reason,
                        type: 'success'
                    });
                    // 刷新列表
                    this.getAccountList();
                }else if(code === 1){
                    // 弹出失败提示
                    this.$message.error('错了哦，这是一条错误消息');
                }
            })
            .catch(err => {
                console.log(err);
            })
    },
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
  },
//   钩子函数 
  created(){
    this.getAccountList();
  },
  filters:{
    filterDate(time){
        return moment(time).format('YYYY-MM-DD hh:mm:ss');
    }
  }
};
</script>

<style lang="less">
@import "./AccountManage.less";
</style>
