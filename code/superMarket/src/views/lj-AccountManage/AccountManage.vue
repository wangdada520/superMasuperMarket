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
                @selection-change="handleSelectionChange"
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
                <el-button type="danger" @click="batchDel">批量删除</el-button>
                <el-button @click="toggleSelection()" type="primary">取消选择</el-button>
            </div>
            <!-- 模态框 -->
            <el-dialog title="修改账户" :visible.sync="dialogFormVisible" width="30%">
                <el-form :model="form" style="width:316px;" :rules="rules"  ref="form">
                    <el-form-item label="账户" :label-width="formLabelWidth" prop="account">
                        <el-input v-model="form.account" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户组" :label-width="formLabelWidth" prop="user_group">
                        <el-select v-model="form.user_group" placeholder="请选择用户组">
                            <el-option label="管理员" value="管理员"></el-option>
                            <el-option label="员工" value="员工"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </div>
            </el-dialog>

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
            total:100,
            dialogFormVisible: false,
            form: {
                account: '',
                user_group: ''
            },
            formLabelWidth: '120px',
            rules:{
                account:[
                    {required:true,message:"请输入账户",trigger:"blur"},
                    {min:3,max:6,message:"请输入 3~6 位",trigger:"change"}
                ]
            },
            EditId:'',
            selectId:[]
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
            // 保存id
            this.EditId = id;
            // 弹出模态框
            this.dialogFormVisible = true;
            // 发送请求
            this.request.get('/account/editaccount',params)
                .then(res => {
                    // console.log(res);
                    this.form.account = res[0].account;
                    this.form.user_group = res[0].user_group;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        // 保存修改
        saveEdit(){
            this.$refs.form.validate(valid => {
                if(valid){
                    this.dialogFormVisible = false;
                    // 收集数据
                    let params = {
                        account:this.form.account,
                        user_group:this.form.user_group,
                        EditId:this.EditId,
                    }
                    console.log(params)
                    // 发送请求
                    this.request.post('/account/saveEditaccount',params)
                        .then(res => {
                            let {code,reason} = res;
                            if(code===0){
                            this.$message({
                                type:"success",
                                message:reason
                            })
                            this.getAccountList()
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
        },
        // 删除
        handleDelete(id) {
            // 接受参数
            let params = { id };
            // console.log(params)
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
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                }); 
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
        // 总页数
        handleSizeChange(){},
        // 当前页
        handleCurrentChange(){},
        // 保存全选的id
        handleSelectionChange(val){
            // console.log(val)
            // 保存val
            this.selectId = val.map(v => v.id);
            console.log(this.selectId)
        },
        // 批量删除
        batchDel(){
            let params = {
                idArr:this.selectId
            }
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
                    this.request.get('/account/batchdel',params)
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
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                }); 
            })
        }
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
