
<template>
    <div class="GoodsReturn">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h1>商品退货</h1>
            </div>
            <div class="text item">
                <el-form :inline="true" :model="returnForm" class="demo-form-inline">
                    <el-form-item label="订单号" size="mini">
                        <el-input v-model="returnForm.card" class="returnWid"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" size="mini" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
   
    </div>

</template>

<script>
export default {
    data() {
      return {
        returnForm: {
          card: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
}
</script>

<style lang="less">
    .el-card__body{
        .el-form{
            .el-form-item--mini{
                margin-top: 6px;
            }
            .returnWid{
                width: 100% !important;
            }
        }   
    }
</style>