<template>
  <div class="System-Info">
    <!-- 面板 -->
    <el-card class="box-card">
      <!-- 系统信息 -->
      <div slot="header" class="clearfix">
        <span>系统信息</span>
      </div>
      <!-- 内容 -->
      <div class="text item">
        <!-- 商品总数 -->
        <el-alert title="消息提示的文案" type="info" show-icon style="margin-top: 20px"></el-alert>
        <!-- 导入数据 -->
        <el-alert title="导入数据" type="success" show-icon :closable="false" style="margin-top: 20px"></el-alert>
        <el-row :gutter="24">
          <!-- 销售排行 -->
          <el-col :span="12" style="margin-top: 20px">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>销售排行</span>
              </div>
              <!-- 商品的名称 -->
              <div class="text item">
                <el-table :data="tableData" stripe style="width: 100%">
                  <el-table-column prop="systeminfoname" label="商品名称"></el-table-column>
                  <el-table-column prop="number" label="销量"></el-table-column>
                 
                </el-table>
              </div>
            </el-card>
          </el-col>
          <!-- 缺货的商品 -->
          <el-col :span="12" style="margin-top: 20px">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>缺货的商品</span>
              </div>
              <div class="text item">
                  <el-table :data="systeminfonData" stripe style="width: 100%">
                  <el-table-column prop="systeminfon" label="商品名称" width="180"></el-table-column>
                  <el-table-column prop="repertory" label="库存" width="180"></el-table-column>
                  <el-table-column prop="operation" label="操作"></el-table-column>
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
     data() {
      return {
        tableData: [
            {
          systeminfoname: '海飞丝去屑洗发水',
          number: '3',
         
        }, 
            {
          systeminfoname: '哇哈哈',
          number: '9',
         
        }, 
            {
          systeminfoname: '爽歪歪',
          number: '9',
         
        }, 
        ],
        systeminfonData:[
            {
                systeminfon:'我的优乐美',
                repertory:'4',
                operation:'入库'

            },
        ]
      }
    }
};
</script>

<style lang="less">
@import "./SystemInfo.less";
</style>



