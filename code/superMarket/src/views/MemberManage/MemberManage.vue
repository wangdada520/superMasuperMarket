<template>
    <div class="member-manage">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h1>会员-账号管理</h1>
            </div>
            <div class="text item">
                <!-- 搜索 -->
                <el-form :inline="true" :model="MemberManageForm" class="demo-form-inline">
                    <el-form-item label="搜索" size="small" prop="user">
                        <el-input v-model="MemberManageForm.user"></el-input>
                    </el-form-item>
                    <span class="text">会员卡，会员名</span>
                    <el-form-item>
                        <el-button type="success" @click="onSubmit" size="small">查询</el-button>
                    </el-form-item>
                </el-form>
                <!-- 表格 -->
                <el-table
                    ref="multipleTable"
                    :data="menberData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="会员姓名">
                        </el-table-column>
                        <el-table-column
                            prop="card"
                            label="会员卡卡号">
                        </el-table-column>
                        <el-table-column
                            prop="user_group"
                            label="会员等级">
                        </el-table-column>
                        <el-table-column
                            prop="state"
                            label="用户状态">
                        </el-table-column>
                        <el-table-column label="管理">
                            <template slot-scope="scope">
                                <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)"><i class="el-icon-edit"></i> 修改</el-button>
                                <el-button type="danger" size="mini" @click="delOnedata(scope.row.id)"><i class="el-icon-delete"></i> 删除</el-button>
                            </template>
                        </el-table-column>
                </el-table>
                <!-- 多选 -->
                <div style="margin-top: 20px">
                    <el-button type="danger" @click="deldata">批量删除</el-button>
                    <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
                </div>
                <!-- 分页 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[1, 3, 5, 8]"
                    :page-size="3"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
                <!-- 模态框 -->
                <el-dialog title="修改" :visible.sync="dialogFormVisible" width="30%">
                    <el-form :model="form" style="width:316px;" :rules="rules"  ref="form">
                        <el-form-item label="会员姓名" :label-width="formLabelWidth" prop="name">
                            <el-input v-model="form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="会员等级" :label-width="formLabelWidth" prop="user_group">
                            <el-select v-model="form.user_group" placeholder="请选择等级">
                                <el-option label="金牌管理员" value="金牌管理员"></el-option>
                                <el-option label="银牌管理员" value="银牌管理员"></el-option>
                                <el-option label="铜牌管理员" value="铜牌管理员"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="saveEdit">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </el-card>
    </div>
</template>

<script>
import {getmemberPage,batchdel,delOnedata,editmember,saveEditmember} from '@/api/member';
export default {
    data() {
      return {
        //   查询
        MemberManageForm: {
          user: ''
        },
        menberData:[],
        total:10,
        pageSize:3,
        currentPage:1,
        idArr:[],
        EditId:'',
        dialogFormVisible: false,
        form: {
            name: '',
            user_group: ''
        },
        formLabelWidth: '120px',
        rules:{
            name:[
                {required:true,message:"请输入账户",trigger:"blur"},
                {min:3,max:6,message:"请输入 3~6 位",trigger:"change"}
            ]
        },
      }
    },
    methods: {
      onSubmit() {
        this.getmemberPage();
      },
      // 每页显示条数  
      handleSizeChange(v){
        this.pageSize = v;
        this.getmemberPage();
      },
      // 当前页
      handleCurrentChange(v){
        this.currentPage = v;
        this.getmemberPage();
      },
      // 分页
      getmemberPage(){
        //   收集数据
        let params = {
            pageSize: this.pageSize,
            currentPage: this.currentPage,
            user:this.MemberManageForm.user
        }
        // 发送请求
        getmemberPage(params)
            .then(res => {
                let {data,total} = res;
                this.menberData = data;
                this.total = total;
                // 如果这一页已经没有数据了
                if (!data.length && this.currentPage !== 1) {
                    // 回到上一页
                    this.currentPage -= 1;
                    // 调用自己
                    this.getmemberPage();
                }
            })
            .catch(err => {
                console.log(err)
            })
      },
      //取消选择   
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      //批量删除
      deldata(id){
          if(!this.idArr.length){
                // 弹错误提示
                this.$message.error('请选择需要批量删除的用户！！')
                return
            }
          let params ={
            idArr:this.idArr
          }
          console.log(params)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //   发送ajax请求
                    batchdel(params)
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
                            this.getmemberPage();
                        }else if(code === 1){
                            // 弹出失败提示
                            this.$message.error('错了哦，这是一条错误消息');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                }); 
            })
      },
      handleSelectionChange(val) {
        //   console.log(val)
            this.idArr = val.map(v => v.id);
      },
      // 删除一条数据
      delOnedata(id){
          let params = {id}
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                //   发送ajax请求
                delOnedata(params)
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
                        this.getmemberPage();
                    }else if(code === 1){
                        // 弹出失败提示
                        this.$message.error('错了哦，这是一条错误消息');
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                }); 
            })
      },
      //修改
      handleEdit(id){
        let params = {id}
        // 保存id
        this.EditId = id;
        // 弹出模态框
        this.dialogFormVisible = true;
        // 发送请求
        editmember(params)
            .then(res => {
                this.form.name = res[0].name;
                this.form.user_group = res[0].user_group;
            })
            .catch(err => {
                console.log(err);
            })
      },
      //保存修改
      saveEdit(){
          this.$refs.form.validate(valid => {
                if(valid){
                    this.dialogFormVisible = false;
                    // 收集数据
                    let params = {
                        name:this.form.name,
                        user_group:this.form.user_group,
                        EditId:this.EditId,
                    }
                    // console.log(params)
                    // 发送请求
                    saveEditmember(params)
                        .then(res => {
                            let {code,reason} = res;
                            if(code===0){
                            this.$message({
                                type:"success",
                                message:reason
                            })
                            this.getmemberPage();
                            }else if(code===1){
                            this.$message.err(reason)
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }else{
                    return false;
                }
            })
      }
    },
    created(){
        this.getmemberPage();
    }
}
</script>

<style lang="less">
    .el-card__body{
        .el-form{
            .el-form-item--small{
                margin-top: 5px;
            }
            .text{
                display: inline-block;
                font-size: 12px;
                margin-right: 10px;
                margin-top: 12px;
                color: rgb(143, 139, 139);
            }
        }
        .el-pagination{
            margin-top: 20px;
        }
    }
</style>
