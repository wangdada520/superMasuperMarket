<template>
  <div class="Goods-manage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>
      <div class="text item">
        <!-- 查询 -->
        <div>
          <el-form :inline="true" :model="serarchFrom" class="demo-form-inline">
            <!-- 分类 -->
            <el-form-item label="分类" prop="cate_id">
              <el-select v-model="serarchFrom.cate_id" placeholder="请选择分类">
                <el-option label="全部" value="全部"></el-option>
                <el-option label="电子类" value="电子类"></el-option>
                <el-option label="食品类" value="食品类"></el-option>
                <el-option label="烟酒类" value="烟酒类"></el-option>
                <el-option label="服装类" value="服装类"></el-option>
                <el-option label="肉类" value="肉类"></el-option>
                <el-option label="蔬菜类" value="蔬菜类"></el-option>
              </el-select>
            </el-form-item>
            <!-- 关键字 -->
            <el-form-item label="关键字">
              <el-input v-model="serarchFrom.keyword" placeholder="商品名称"></el-input>
            </el-form-item>
            <!-- 查询按钮 -->
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-form
          :inline="true"
          size="small"
          :model="goods"
          status-icon
          :rules="rules"
          :data="tableData"
          ref="goods"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div>
            <el-divider></el-divider>
          </div>

          <!-- 商品条形码 -->
          <el-table
            @selection-change="handleSelectionChange"
            :data="tableData"
            stripe
            style="width: 100%"
            ref="multipleTable"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="code" label="商品条形码"></el-table-column>
            <el-table-column prop="name" label="商品名称"></el-table-column>
            <el-table-column prop="cate_id" label="所属分类"></el-table-column>
            <el-table-column prop="seleprice" label="售价(元)"></el-table-column>
            <el-table-column prop="price" label="促销价(元)"></el-table-column>
            <el-table-column prop="seleprice" label="市场价(元)"></el-table-column>
            <el-table-column prop="num" label="库存"></el-table-column>
            <!-- 创建账号日期 -->
            <el-table-column label="日期">
              <template slot-scope="scope">{{ scope.row.intime | filterDate }}</template>
            </el-table-column>
            <!-- <el-table-column prop="amoun" label="库存总额(元)"></el-table-column>
            <el-table-column prop="total" label="销售总额(元)"></el-table-column>-->
            <!-- 管理 -->
            <el-table-column label="管理">
              <template slot-scope="scope">
                <el-button
                  @click="handleEdit(scope.row.id)"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                ></el-button>
                <el-button
                  @click="handleDelete(scope.row.id)"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <!-- 修改模态框 -->
        <el-dialog width="30%" title="修改商品" :visible.sync="dialogFormVisible">
          <el-form :model="editFrom" :rules="rules" ref="editFrom">
            <el-form-item
              prop="name"
              style="width:320px;"
              label="商品名"
              :label-width="formLabelWidth"
            >
              <el-input v-model="editFrom.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item prop="cate_id" label="选择分类" :label-width="formLabelWidth">
              <el-select v-model="editFrom.cate_id" placeholder="请选择分类">
                
                <el-option label="电子类" value="电子类"></el-option>
                <el-option label="食品类" value="食品类"></el-option>
                <el-option label="烟酒类" value="烟酒类"></el-option>
                <el-option label="服装类" value="服装类"></el-option>
                <el-option label="肉类" value="肉类"></el-option>
                <el-option label="蔬菜类" value="蔬菜类"></el-option>
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
          :page-sizes="[1, 2, 3, 4]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
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
// 引入时间格式化模块
import moment from "moment";
// 引入封装的请求函数
import {
  goodsPage,
  saveEditGoods,
  editaGoods,
  batchdel,
  delagooda,
  goodssearch
} from "@/api/goods";
export default {
  data() {
    return {
      // 查询
      serarchFrom: {
        cate_id: "",
        keyword: ""
      },
      goods: {
        region: ""
      },
      //表单数据
      tableData: [], //商品表单
      currentPage: 1, //当前页
      pageSize: 3, //每页的条数
      total: 2,
      editFrom: {
        //修改模态框的数据
        cate_id: "",
        name: ""
      },
      //修改模态框的显示和隐藏
      EditId: "",
      dialogFormVisible: false,
      formLabelWidth: "120px", //修改表单的宽度
      rules: {
        cate_id: [{ required: true, message: "请选择分类", trigger: "change" }],
        name: [{ required: true, message: "请输入商品名", trigger: "blur" }]
      },
      selectedId: [] //批量删除
    };
  },
  methods: {
    // // 查询按钮
     search(){
        // 调用分页函数
      this.goodstpage();

    //   //提交数据给后端
    //       let params = {
    //         catename: this.serarchFrom.catename,
    //         keyword: this.serarchFrom.keyword,
    //       };
    //       // 发送请求
    //        goodssearch(params)
    //        .then(res=>{
    //          this.tableData=res;

    //        })
    //        .catch(err=>{
    //          console.log(err);

    //        })

     },
    // 按照分页请求数据
    goodstpage() {
      // 收集参数
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        cate_id: this.serarchFrom.cate_id,
        keyword: this.serarchFrom.keyword
      };
      // console.log(params)
      // 请求数据
      goodsPage(params)
        .then(res => {
          // 接收后端数据
          let { total, data } = res;
          // 赋值给对应变量
          this.total = total;
          this.tableData = data;
          // 如果这一页已经没有数据了
          if (!data.length && this.currentPage !== 1) {
            // 回到上一页
            this.currentPage -= 1;
            // 调用自己
            this.goodstpage();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //    修改
    handleEdit(id) {
      // 显示模态框
      this.dialogFormVisible = true;
      // 保留id
      this.EditId = id;
      // 发送请求 把id发送给后端
      editaGoods({ id })
        .then(Response => {
          // let {data}=Response.data;
          console.log(Response);
          (this.editFrom.cate_id = Response[0].cate_id),
            (this.editFrom.name = Response[0].name);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除
    handleDelete(id) {
      //   发送ajax请求
      delagooda({ id })
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
            this.goodstpage();
          } else if (code === 1) {
            // 弹出失败提示
            this.$message.error("错了哦，这是一条错误消息");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 批量删除
    batchDel() {
      console.log(this.selectedId);

      if (!this.selectedId.length) {
        // 弹错误提示
        this.$message.error("请选择需要批量删除的用户！！");
        return;
      }

      // 删除提示
      this.$confirm("你确定要删除吗？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButttonText: "取消",
        type: "warning"
      })
        .then(() => {
          //确定
          // 收集id
          let params = {
            idArr: this.selectedId
          };
          // 发送请求给后端 把选中的id一起发给后端
          batchdel(params)
            .then(res => {
              let { code, reason } = res;
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });
                // 刷新列表
                this.goodstpage();
              } else if (code === 1) {
                // 弹出失败信息
                this.$message.err(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          //取消
          this.$message({
            type: "info",
            message: "取消"
          });
        });
    },
    // 选中选择框的状态，触发的的事件
    handleSelectionChange(val) {
      // 获取选中的id 放入一个数组
      this.selectedId = val.map(v => v.id); //循环选中的数据
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
    saveEdit() {
      this.$refs.editFrom.validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          //提交数据给后端
          let params = {
            cate_id: this.editFrom.cate_id,
            name: this.editFrom.name,
            EditId: this.EditId
          };
          //发送ajax请求，把数据发送给后端
          saveEditGoods(params)
            .then(res => {
              let { code, reason } = res;
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });
                // 刷新列表
                this.goodstpage();
              } else if (code === 1) {
                this.$message.err(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      // 赋值
      this.pageSize = val;
      // 调用分页  //
      this.goodstpage();
    },
    // 当前的页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      // 调用分页  //
      this.goodstpage();
    }
  },
  // 钩子函数-vue实例对象创建完成，dom还没有生成
  created() {
    // 发送axios请求  请求所有的账号和数据
    this.goodstpage();
  },
  filters: {
    filterDate(ctime) {
      // 过滤时间格式
      return moment(ctime).format("YYYY-MM-DD");
    }
  }
};
</script>

<style lang="less">
.Goods-Add {
  .el-card {
    .el-card__header {
      font-size: 22px;
      font-weight: 600;
    }
  }
}
</style>