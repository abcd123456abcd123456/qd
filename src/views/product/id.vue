<template>
  <div class="product-detail">
    <h2>详情页</h2>
    <ul>
      <li>产品编号：{{ form.fundId }}</li>
      <li>
        产品名称：{{ form.fundName}}
      </li>
    </ul>
    <div
      id="lineEchart"
      class="line-echart"
    ></div>
  </div>
</template>

<script>
import core from "@hsui/core";
import { PRODUCT_TYPE_ORM, PRODUCT_STATUS_ORM } from "../../constant";

export default {
  data () {
    this.productTypeOrm = PRODUCT_TYPE_ORM;
    this.productStatusOrm = PRODUCT_STATUS_ORM;
    return {
      data: [],
      form: {
        fundId: '',
        fundName: '',
      }
    };
  },
  created () {
    const { params: { id } = {} } = this.$route;
    if (id == '' || id == undefined) {
      id = window.sessionStorage.getItem('fundId')
    }
    core
      .fetch({
        method: "get",
        url: '/purchase/liquidation/getNavListById',
        data: {
          fundId: id
        }
      })
      .then((res) => {
        if (res.code == '10000') {
          this.data = res.data;
          this.form = res.data[0];
        }
        else {
          this.$hMessage.error(res.msg)
        }
      })
      .catach(() => {
        this.$hMessage.error('获取净值信息出错')
      })
  },
  mounted () {
    this.drawLineEchart();
  },
  methods: {
    drawLineEchart () {
      // 基于准备好的dom，初始化echarts实例
      const echart = this.$echarts.init(document.getElementById("lineEchart"));
      let date = [];
      let nav = [];
      for (const item of this.data) {
        date.push(item.date);
      }
      for (const item of this.data) {
        nav.push(item.nav);
      }
      // 指定图表的配置项和数据
      const option = {
        title: {
          text: '基金净值走势图'
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["净值"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "基金1",
            type: "line",
            stack: "Total",
            data: nav,
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      echart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.product-detail {
  background-color: #fff;
  padding-left: 20px;
  h2 {
    font-size: 18px;
    margin-bottom: 24px;
  }

  ul {
    margin-bottom: 24px;
  }

  li {
    line-height: 30px;
  }
}

.line-echart {
  width: 600px;
  height: 400px;
}
</style>
