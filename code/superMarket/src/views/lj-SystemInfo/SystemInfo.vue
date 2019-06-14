<template>
    <div class="system-info">
        <el-card class="box-card">
            <!-- 标题 -->
            <div slot="header" class="clearfix">
                <h2>系统信息</h2>
            </div>
            <!-- 内容 -->
            <div class="text item">
                <!-- 提示信息 -->
                <el-alert
                    title="成功提示的文案"
                    type="success"
                    show-icon>
                </el-alert>
                <el-alert
                    title="消息提示的文案"
                    type="info"
                    show-icon>
                </el-alert>
                <el-row :gutter="20">
                    <!-- 销售排行 -->
                    <el-col :span="12">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <h3>销售排行</h3>
                            </div>
                            <div class="text item">
                                <el-table
                                    :data="salesData"
                                    style="width: 100%">
                                    <el-table-column
                                        prop="productName"
                                        label="商品名称">
                                    </el-table-column>
                                    <el-table-column
                                        prop="sales"
                                        label="销量">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                    </el-col>
                    <!-- 缺货商品 -->
                    <el-col :span="12">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <h3>缺货的商品</h3>
                            </div>
                            <div class="text item">
                                <el-table
                                    :data="productData"
                                    style="width: 100%">
                                    <el-table-column
                                        prop="productName"
                                        label="商品名称">
                                    </el-table-column>
                                    <el-table-column
                                        prop="inventory"
                                        label="库存">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            salesData:[
                {
                    productName:'奥尔良鸡腿',
                    sales:50
                },
                {
                    productName:'奥尔良鸭腿',
                    sales:50
                },
                {
                    productName:'奥尔良火腿',
                    sales:50
                },
            ],
            productData:[
                {
                    productName:'奥尔良鸡腿',
                    inventory:5
                }
            ]
        }
    }
}
</script>

<style lang="less">
    @import './SystemInfo.less';
</style>
