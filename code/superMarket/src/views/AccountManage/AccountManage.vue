<template>
  <div class="Account-Manage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账户管理</span>
      </div>
      <!-- n内容 -->
      <div class="text item">
        <el-table  @selection-change="handleSelectionChange" ref="multipleTable" :data="accountData" tooltip-effect="dark" style="width: 100%">
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
             <!-- 修改模态框 -->
          <el-dialog width='30%' title="修改账户" :visible.sync="dialogFormVisible">
            <el-form :model="editFrom"  :rules="rules"  ref="editfrom">
              <el-form-item  prop="account" style="width:320px;" label="账户" :label-width="formLabelWidth">
                <el-input v-model="editFrom.account" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item  prop="user_group" label="用户组" :label-width="formLabelWidth">
                <el-select v-model="editFrom.user_group" placeholder="请选择用户组">
                  <el-option label="高级用户" value="高级用户"></el-option>
                  <el-option label="普通用户" value="普通用户"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveEdit">确 定</el-button>
            </div>
          </el-dialog>
        <!-- 分页功能 -->
        <el-pagination
          style="margin-top: 20px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 3, 5, 8]"
          :page-size="pageSize"
          layout="total,sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
        <!-- 删除和全选 -->
        <div style="margin-top: 20px">
          <el-button type="success" @click="batchDel()">批量删除</el-button>
          <el-button type="danger" @click="toggleSelection()">取消选择</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import moment from "moment";
// 引入请求方法
import {accountpage,editaccount,delaccount,saveEditaccount,batchdel} from '@/api/account.js'
export default {
  data() {
    return {
      accountData: [],
      currentPage: 1, //当前页
      pageSize:3,//每页的条数
      total: 2,
      editFrom: {
        //修改模态框的数据
        account: "",
        user_group: ""
      },
     
      //修改模态框的显示和隐藏
      EditId:'',
      dialogFormVisible: false,
      formLabelWidth:'100px',//修改表单的宽度
      rules:{//修改表单验证
         account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 6, message: "账号长度3-6位", trigger: "blur" }
        ],
          user_group: [
          { required: true, message: '请选择用户组', trigger: "change" }
        ]
      },
      selectedId:[]//批量删除
    };
  },
  methods: {
    //   请求所有账户数据
      // getAccountList() {
      //   //   发送ajax  请求所有数据
      //   this.request
      //     .get("/account/accountlist")
      //     .then(res => {
      //       this.accountData = res;
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // },
    // 按照分页请求数据
    getAccountListpage(){
      // 收集参数
      let params={
           currentPage:this.currentPage,
           pageSize:this.pageSize
      }
      // console.log(params)
      // 请求数据
      accountpage(params)
      .then(res=>{
        // 接收后端数据
        let {total,data}=res;
         // 赋值给对应变量
        this.total=total;
        this.accountData=data;
         // 如果这一页已经没有数据了
        if(!data.length&&this.currentPage !==1){
          // 回到上一页
          this.currentPage -= 1;
          // 调用自己
          this.getAccountListpage()
        }
      })
      .catch(err=>{
        console.log(err);
        
      })
    },

    //    修改
    handleEdit(id) {
      // 显示模态框
      this.dialogFormVisible=true;
      // 保留id
      this.EditId=id;
      // 发送请求 把id发送给后端
      editaccount({id})
      .then(Response=>{
        // let {data}=Response.data;
        console.log(Response);
           this.editFrom.account=Response[0].account,
           this.editFrom.user_group=Response[0].user_group
      })
      .catch(err=>{
        console.log(err);
        
      })

    },

    // 删除
    handleDelete(id) {
    
      //   发送ajax请求
      delaccount({id})
        .then(res => {
          // 接受后台数据
          let { code, reason } = res;
          // 判断
          if (code === 0) {
            // 弹出成功提示
            this.$message({
              message: reason,
              type: "success"
            });
            // 刷新列表
              this.getAccountListpage()
          } else if (code === 1) {
            // 弹出失败提示
            this.$message.error("错了哦，这是一条错误消息");
          }
        })
        .catch(err => {
          console.log(err);
        });
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
    // 保存修改
    saveEdit(){
      this.$refs.editfrom.validate(valid => {
        if (valid) {
           this.dialogFormVisible=false;
          //提交数据给后端
          let params = {
            account: this.editFrom.account,
            user_group: this.editFrom.user_group,
            EditId: this.EditId,
          };
          //发送ajax请求，把数据发送给后端
          saveEditaccount(params)
          .then(res=>{
            let {code,reason}=res;
            if(code===0){
              this.$message({
                type:"success",
                message:reason
              })
             // 刷新列表
              this.getAccountListpage()
            }else if(code===1){
              this.$message.err(reason)
            }

          })
          .catch(err=>{
            console.log(err);
            
          })
        }else{return false}
         

    })
    },
    // 选中选择框的状态，触发的的事件
    handleSelectionChange(val){
      // 获取选中的id 放入一个数组
      this.selectedId=val.map(v=>v.id) //循环选中的数据
      // console.log(this.selectedId)

    },
    // 批量删除
    batchDel(){
      console.log(this.selectedId)

      if(!this.selectedId.length){
        // 弹错误提示
        this.$message.error('请选择需要批量删除的用户！！')
        return
      }

      // 删除提示
      this.$confirm('你确定要删除吗？','温馨提示',{
        confirmButtonText:'确定',
        cancelButttonText:'取消',
        type:'warning'
      }).then(()=>{   //确定
          // 收集id
      let params={
           idArr:this.selectedId
      }
      // 发送请求给后端 把选中的id一起发给后端
      batchdel(params)
      .then(res=>{
         let {code,reason}=res;
          if(code===0){
              this.$message({
                type:"success",
                message:reason
              })
              // 刷新列表
              this.getAccountListpage()
            }else if(code===1){
              // 弹出失败信息
              this.$message.err(reason)
            }        
      })
      .catch(err=>{
        console.log(err);
        
      })
      }).catch(()=>{  //取消
        this.$message({
          type:'info',
          message:'取消'
        })
      })
    
    },

    // 分页
    handleSizeChange(val) {
      // 赋值
      this.pageSize=val    
      // 调用分页  // 
      this.getAccountListpage()
    },
    // 当前的页码改变
    handleCurrentChange(val) {
      this.currentPage=val
      // 调用分页  // 
      this.getAccountListpage()
    }
  },
  // 钩子函数-vue实例对象创建完成，dom还没有生成
  created() {
    // 发送axios请求  请求所有的账号和数据
    this.getAccountListpage();
  },
  filters: {
    filterDate(time) {
      return moment(time).format("YYYY-MM-DD hh:mm:ss");
    }
  }
};
</script>

<style lang="less">
@import "./AccountManage.less";
</style>