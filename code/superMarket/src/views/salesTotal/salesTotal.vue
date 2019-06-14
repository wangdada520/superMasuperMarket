<template>
  <div class="sales-total">
    <!-- 面板内容 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>销售数据统计</span>
      </div>
      <!-- 内容 -->
      <!-- 时间日期 -->
      <div class="block">
        <!-- 开始时间 -->
        <span class="demonstration">时间：</span>
        <el-date-picker style="width:150px" size="small" v-model="value1" type="date" placeholder="2019-4-1"></el-date-picker>
        <!-- 结束时间 -->
        --
        <el-date-picker
        style="width:150px"
          size="small"
          v-model="value2"
          align="right"
          type="date"
          placeholder="2019-6-14"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-select style="width:150px;margin:0 5px;"  size="small" v-model="value" placeholder="销售统计情况">
          <el-option
           
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button size="small" type="success">提交</el-button>
      </div>
      <div class="text item">
        <!-- 准备一个容器 -->
        <div id="box" style="height:400px"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
       value1: "",
      value2: "",
       options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
     
    };
  },
  // 钩子函数
  mounted() {
    // 基于准备好的dom，初始化echarts图表
    var myChart = this.echarts.init(document.getElementById("box"));

    var option = {
      tooltip: {
        show: true
      },
      legend: {
        data: ["销量"]
      },
      xAxis: [
        {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "销量",
          type: "line",
          data: [5, 20, 40, 10, 10, 20, 30, 40, 30, 10, 20, 39]
        }
      ]
    };
    //   使用配置生成报表
    myChart.setOption(option);
  }
};
</script>

<style lang="less">
@import "./salesTotal.less";
</style>