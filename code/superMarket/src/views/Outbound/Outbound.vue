 <template>
    <div class="Outbound">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h1>商品销售</h1>
            </div>
            <div class="text item">
                <el-form :model="outBoundForm" :rules="rules" ref="outBoundForm" label-width="100px" class="demo-ruleForm" label-position="top">
                    <el-form-item label="商品条形码" prop="name" size="mini">
                        <el-input v-model="outBoundForm.name" class="outBoundWid"></el-input>
                    </el-form-item>
                    <el-form-item label="数量" prop="number" size="mini">
                        <el-input v-model="outBoundForm.number" class="number"></el-input>
                        <span class="text">计重商品单位为千克</span>
                    </el-form-item>
                    <el-button type="success" size="mini">加入订单</el-button>
                    <el-button type="success" size="mini">重新入库</el-button>                    
                    <el-divider></el-divider>
                    <!-- 表格 -->
                    <el-table
                        :data="salesData"
                        style="width: 100%">
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
                            label="单价">
                        </el-table-column>
                        <el-table-column
                            prop="totalPrice"
                            label="总价">
                        </el-table-column>
                    </el-table>
                    <el-form-item label="会员卡号" prop="card" size="mini" class="card">
                        <el-input v-model="outBoundForm.card" class="outBoundWid"></el-input>
                        <p class="text">填写会员卡卡号</p>
                    </el-form-item>
                    <el-button type="success">确认提交</el-button>
                </el-form>
            </div>
        </el-card>
    </div>

</template>

<script>
export default {
    data(){
        return {
            outBoundForm:{
                name:'',
                number:'',
                card:''
            },
            salesData: [
                {
                    name: '奥尔良鸡腿',
                    number: '11',
                    price:'50',
                    totalPrice:'200'
                },{
                    name: '奥尔良鸡腿',
                    number: '11',
                    price:'50',
                    totalPrice:'200'
                }
            ],
             rules: {
                name: [
                    { required: true, message: '请输入条形码', trigger: 'blur' }
                ],
                number: [
                    { required: true, message: '请选择数量', trigger: 'blur' }
                ],
                card: [
                    { required: true, message: '请选择卡号', trigger: 'blur' }
                ]
            }
        }
    }
}
</script>

<style lang="less">
    @import './Outbound.less';
</style>