<template>
    <div class="member-manage">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h1>会员-账号管理</h1>
            </div>
            <div class="text item">
                <!-- 搜索 -->
                <el-form :inline="true" :model="MemberManageForm" class="demo-form-inline">
                    <el-form-item label="搜索" size="small">
                        <el-input v-model="MemberManageForm.user"></el-input>
                    </el-form-item>
                    <span class="text">会员卡，会员名，电话，手机</span>
                    <el-form-item>
                        <el-button type="success" @click="onSubmit" size="small">查询</el-button>
                    </el-form-item>
                </el-form>
                <!-- 表格 -->
                <el-table
                    :data="menberData"
                    style="width: 100%">
                    <el-table-column
                        prop="card"
                        label="会员卡卡号">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="会员姓名">
                    </el-table-column>
                    <el-table-column
                        prop="user_group"
                        label="会员等级">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="手机号码">
                    </el-table-column>
                    <el-table-column label="管理">
                        <el-button type="danger" size="mini"><i class="el-icon-edit"></i> 修改</el-button>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
      return {
        MemberManageForm: {
          user: ''
        },
        menberData:[
            {
                card: '45645646',
                name: '王小虎',
                user_group: '金牌会员',
                phone:'15631654565'
            }, 
            {
                card: '123113',
                name: '王小虎',
                user_group: '金牌会员',
                phone:'15631654565'
            }
        ],
        total:100,
        currentPage:1
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleSizeChange(){},
      handleCurrentChange(){}
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
