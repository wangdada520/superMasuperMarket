
<template>
    <div class="AddInventory">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h1>库存管理</h1>
            </div>
            <div class="text item">
                <!-- 查询 -->
                <el-form :inline="true" :model="AddInventoryForm" class="demo-form-inline">
                    <el-form-item label="分类" size="small" class="fenlei">
                        <el-select v-model="AddInventoryForm.region" placeholder="--选择分类--">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关键字">
                        <el-input v-model="AddInventoryForm.user" size="small"></el-input>
                    </el-form-item>
                    <span class="text">(商品名称，条形码)</span>
                    <el-form-item>
                        <el-button type="success" @click="onSubmit" size="small">查询</el-button>
                    </el-form-item>
                </el-form>
                <el-divider></el-divider>
                <!-- 表单 -->
                <el-table
                    :data="AddInventoryData"
                    style="width: 100%">
                    <el-table-column
                        prop="barcode"
                        label="商品条形码">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="商品名称">
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        label="进价(元)">
                    </el-table-column>
                    <el-table-column
                        prop="repertory"
                        label="库存">
                    </el-table-column>
                    <el-table-column
                        prop="sell"
                        label="已售">
                    </el-table-column>
                    <el-table-column label="管理">
                        <el-button type="primary" size="mini"><i class="el-icon-edit"></i> 修改</el-button>
                        <el-button type="danger" size="mini"><i class="el-icon-delete"></i> 删除</el-button>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="10"
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
        AddInventoryForm: {
          user: '',
          region: ''
        },
        AddInventoryData: [
            {
                barcode: '156151',
                name: '奥尔良鸡腿',
                price: 5,
                repertory:20,
                sell:5
            },
            {
                barcode: '156151',
                name: '奥尔良鸭腿',
                price: 5,
                repertory:20,
                sell:5
            },
            {
                barcode: '156151',
                name: '奥尔良火腿',
                price: 5,
                repertory:20,
                sell:5
            },
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
            .text{
                color: #666;
                display: inline-block;
                margin-top: 10px;
                margin-right: 10px;
            }
            .fenlei{
                margin-top: 5px;
            }
        }
        .el-divider--horizontal{
            height: 3px;
            border-radius: 3px;
        }
        .el-pagination{
            margin-top: 20px;
        }
    }
</style>