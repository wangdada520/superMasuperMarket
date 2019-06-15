<template>
    <div class="SalesList">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h1>销售明细</h1>
            </div>
            <div class="text item">
                <el-form ref="salesform" :model="salesform" label-width="80px">
                    <!-- 时间 -->
                    <el-form-item label="开始时间">
                        <el-col :span=3>
                        <el-date-picker type="date" v-model="salesform.date1" class="salesListwid"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span=2>结束时间</el-col>
                        <el-col :span=3>
                        <el-date-picker v-model="salesform.date2" class="salesListwid"></el-date-picker>
                        </el-col>
                        <span class="geshi">(格式：2019-12-03)</span>
                    </el-form-item>
                    
                    <!-- 关键词 -->
                    <div class="keyword">
                        关键字：<el-input size="small" v-model="input" placeholder="请输入内容" class="salesListwid"></el-input>
                        <span>商品名称，订单号，客户名字，会员卡号</span>
                        <el-button size="small" type="success">查询</el-button>
                    </div>
                    <el-divider></el-divider>
                    <!-- 表格 -->
                    <el-table
                        :data="salesData"
                        style="width: 100%">
                        <el-table-column
                            prop="order"
                            label="订单号">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="名称">
                        </el-table-column>
                        <el-table-column
                            prop="number"
                            label="数量">
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            label="实际售价">
                        </el-table-column>
                        <el-table-column
                            prop="date"
                            label="销售时间">
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
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
          salesform:{
              date1:'',
              date2:''
          },
          salesData: [
            {
                order: '0151516',
                name: '奥尔良鸡腿',
                number: '11',
                price:'50',
                date:'2019-06-15'
            },{
                order: '0151516',
                name: '奥尔良鸡腿',
                number: '11',
                price:'50',
                date:'2019-06-15'
            },{
                order: '0151516',
                name: '奥尔良鸡腿',
                number: '11',
                price:'50',
                date:'2019-06-15'
            },
          ],
          value1:'',
          value2:'',
          input:'',
          currentPage:1,
          total:100
        }
    },
    methods:{
        handleSizeChange(){},
        handleCurrentChange(){}
    }
}
</script>

<style lang="less">
    @import './SalesList.less';
</style>