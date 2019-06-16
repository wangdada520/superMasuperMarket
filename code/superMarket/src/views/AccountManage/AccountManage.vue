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
          <el-table-column prop="user_group" label="用户组" show-overflow-tooltip></el-table-column>

          <!-- 创建账号日期 -->
          <el-table-column label="日期">
            <template slot-scope="scope">{{ scope.row.create_date | filterDate }}</template>
          </el-table-column>

          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">
                <i class="el-icon-edit"></i>修改
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
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
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
        <!-- 删除和全选 -->
        <div style="margin-top: 20px">
          <el-button type="success">批量删除</el-button>
          <el-button type="danger" @click="toggleSelection()" >取消选择</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      accountData: [],
      currentPage:1,//当前页
      total:11,

    };
  },
  methods: {
       //   请求所有账户数据
    getAccountList(){
        //   发送ajax  请求所有数据
        this.request.get('/account/accountlist')
            .then(res => {
                this.accountData = res;
            })
            .catch(err => {
                console.log(err);
            })
    },
     
    //    修改
    handleEdit(id) {
      let params={id}

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
   
    // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    // 钩子函数-vue实例对象创建完成，dom还没有生成
    created() {
      // 发送axios请求  请求所有的账号和数据
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