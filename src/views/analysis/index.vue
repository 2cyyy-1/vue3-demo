<template>
  <div class="analysis">
    <top-bar :path="path"></top-bar>
    <div v-loading="!loadData" class="content">
      <div class="screen">
        <h2><span class="icon">&nbsp;</span>&nbsp;祈愿分析</h2>
        <div class="radioGroup">
          <el-radio-group
            v-model="screenItem1"
            @change="radioChange1"
            size="large"
          >
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="up">活动</el-radio-button>
            <el-radio-button label="arms">武器</el-radio-button>
            <el-radio-button label="permanent">常驻</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <el-divider />

      <div style="padding: 10px 0">
        <div class="row-box">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-card class="card" shadow="hover">
                <div class="text1-box">
                  <div class="card-text1 title">总计</div>
                  <!-- <div class="card-text1 tr">✦</div> -->
                </div>
                <div class="card-text2 count">
                  <countTo
                    :startVal="0"
                    :endVal="dataObj.all"
                    :duration="1200"
                  ></countTo>
                </div>
                <div class="text1-box">
                  <div
                    class="card-text1"
                    style="width: 100%; text-align: center"
                  >
                    {{ dataObj.time }}
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="card" shadow="hover">
                <div class="text1-box">
                  <div class="card-text1 king-star king">五星</div>
                  <div class="card-text1 tr king-star king">★★★★★</div>
                </div>
                <div class="card-text2 count">
                  <countTo
                    :startVal="0"
                    :endVal="dataObj.n5"
                    :duration="1200"
                  ></countTo>
                </div>
                <div class="text1-box">
                  <div class="card-text1">
                    平均:
                    <countTo
                      :startVal="0"
                      :endVal="dataObj.a5"
                      :duration="1200"
                      :decimals="2"
                    ></countTo>
                  </div>
                  <div class="card-text1 tr">
                    占比:
                    <countTo
                      :startVal="0"
                      :endVal="dataObj.p5"
                      :duration="1200"
                      :decimals="2"
                    ></countTo
                    >%
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="card" shadow="hover">
                <div class="text1-box">
                  <div class="card-text1 king-star purple">四星</div>
                  <div class="card-text1 tr king-star purple">★★★★</div>
                </div>
                <div class="card-text2 count">
                  <countTo
                    :startVal="0"
                    :endVal="dataObj.n4"
                    :duration="1200"
                  ></countTo>
                </div>
                <div class="text1-box">
                  <div class="card-text1">
                    平均:
                    <countTo
                      :startVal="0"
                      :endVal="dataObj.a4"
                      :duration="1200"
                      :decimals="2"
                    ></countTo>
                  </div>
                  <div class="card-text1 tr">
                    占比:
                    <countTo
                      :startVal="0"
                      :endVal="dataObj.p4"
                      :duration="1200"
                      :decimals="2"
                    ></countTo
                    >%
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="card" shadow="hover">
                <div class="text1-box">
                  <div class="card-text1 king-star blue">三星</div>
                  <div class="card-text1 tr king-star blue">★★★</div>
                </div>
                <div class="card-text2 count">
                  <countTo
                    :startVal="0"
                    :endVal="dataObj.n3"
                    :duration="1200"
                  ></countTo>
                </div>
                <div class="text1-box">
                  <div class="card-text1">
                    平均:
                    <countTo
                      :startVal="0"
                      :endVal="dataObj.a3"
                      :duration="1200"
                      :decimals="2"
                    ></countTo>
                  </div>
                  <div class="card-text1 tr">
                    占比:
                    <countTo
                      :startVal="0"
                      :endVal="dataObj.p3"
                      :duration="1200"
                      :decimals="2"
                    ></countTo
                    >%
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="row-box">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-card v-loading="!loadTableData" class="card2" shadow="always">
                <div class="text1-box">
                  <div class="card-text1 title h24">抽卡情况统计</div>
                  <div class="card-text1 title h24 lh0 tr">
                    <el-radio-group
                      v-model="screenItem2"
                      @change="radioChange2"
                      size="small"
                    >
                      <el-radio-button label="5">五星</el-radio-button>
                      <el-radio-button label="4">四星</el-radio-button>
                    </el-radio-group>
                  </div>
                </div>
                <br />
                <el-table :data="tableData" style="width: 100%" size="large">
                  <el-table-column
                    prop="pool"
                    label="卡池"
                    align="left"
                    width="60"
                  />
                  <el-table-column
                    prop="count"
                    label="距离保底"
                    align="right"
                    min-width="110"
                  />
                  <el-table-column
                    prop="current"
                    label="最近获取"
                    align="right"
                    min-width="110"
                    class-name="king"
                  >
                    <template #default="scope">
                      <span
                        :class="[
                          {
                            king:
                              (loadTableData && screenItem2 === '5') ||
                              (!loadTableData && screenItem2 === '4'),
                          },
                          {
                            purple:
                              (loadTableData && screenItem2 === '4') ||
                              (!loadTableData && screenItem2 === '5'),
                          },
                        ]"
                        >{{ scope.row.current }}</span
                      >
                    </template></el-table-column
                  >
                  <el-table-column
                    prop="time"
                    label="获取时间"
                    align="right"
                    min-width="110"
                  />
                </el-table>
                <!-- <div id="echart" class="echart"></div> -->
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="card2" shadow="always"> </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import store from "@/store";
import * as echarts from "echarts";
import topBar from "@/components/topBar.vue";
import countTo from "@/components/countTo/vue-countTo.vue";
import { formatDate } from "@/assets/method/utils";

export default {
  name: "AnalysisView",
  components: { topBar, countTo },
  setup() {
    const route = useRoute();
    let data = reactive({
      path: route.path,
      loadData: true,
      loadTableData: true,
      dataObj: {
        time: "",
        all: 0,
        n5: 0,
        n4: 0,
        n3: 0,
        a5: 0,
        a4: 0,
        a3: 0,
        p5: 0,
        p4: 0,
        p3: 0,
      },
      screenItem1: "all",
      tableData: [
        {
          pool: "活动",
        },
        {
          pool: "武器",
        },
        {
          pool: "常驻",
        },
      ],
      screenItem2: "5",
    });

    const storeData = JSON.parse(JSON.stringify(store.state));

    const columnClassName = () => {
      return data.screenItem2 === "5" ? "king" : "purple";
    };
    // 获取抽卡最早到最晚时间范围
    const getTime = (list) => {
      if (data.screenItem1 === "all") {
        let list1 = storeData.info.up.allList;
        let list2 = storeData.info.arms.allList;
        let list3 = storeData.info.permanent.allList;
        let arr1 = [list1[0].time, list2[0].time, list3[0].time];
        let arr2 = [
          list1[list1.length - 1].time,
          list2[list2.length - 1].time,
          list3[list3.length - 1].time,
        ];
        let startTime = arr1[0];
        let endTime = arr2[0];
        for (let i = 0; i < 3; i++) {
          if (arr1[i].time > startTime) {
            startTime = arr1[i].time;
          }
          if (arr2[i].time < startTime) {
            endTime = arr2[i].time;
          }
        }
        return (
          formatDate(endTime).slice(0, 10) +
          " ~ " +
          formatDate(startTime).slice(0, 10)
        );
      } else {
        return (
          formatDate(list[list.length - 1].time).slice(0, 10) +
          " ~ " +
          formatDate(list[0].time).slice(0, 10)
        );
      }
    };
    // 从抽卡列表检索最近抽取的5星/4星
    const getCurrentData = (type) => {
      const arr = storeData.info[type].allList;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].star == data.screenItem2) {
          return arr[i];
        }
      }
    };
    // 初始化首页表格数据
    const optionTableData = () => {
      const upObj = getCurrentData("up");
      const armsObj = getCurrentData("arms");
      const permanentObj = getCurrentData("permanent");
      data.tableData = [
        {
          pool: "活动",
          current: upObj.name,
          count:
            (data.screenItem2 === "5" ? 90 : 10) -
            storeData.info.up["c" + data.screenItem2] +
            "抽",
          time: formatDate(upObj.time).slice(0, 10),
        },
        {
          pool: "武器",
          current: armsObj.name,
          count:
            (data.screenItem2 === "5" ? 80 : 10) -
            storeData.info.up["c" + data.screenItem2] +
            "抽",
          time: formatDate(armsObj.time).slice(0, 10),
        },
        {
          pool: "常驻",
          current: permanentObj.name,
          count:
            (data.screenItem2 === "5" ? 90 : 10) -
            storeData.info.up["c" + data.screenItem2] +
            "抽",
          time: formatDate(permanentObj.time).slice(0, 10),
        },
      ];
    };
    // 初始化数据
    const optionData = () => {
      data.loadData = false;
      setTimeout(() => {
        if (data.screenItem1 === "all") {
          if (
            storeData.info.up.all +
              storeData.info.arms.all +
              storeData.info.permanent.all !=
            0
          ) {
            data.dataObj = {
              time: getTime(),
              all:
                storeData.info.up.all +
                storeData.info.arms.all +
                storeData.info.permanent.all,
              n5:
                storeData.info.up.n5 +
                storeData.info.arms.n5 +
                storeData.info.permanent.n5,
              n4:
                storeData.info.up.n4 +
                storeData.info.arms.n4 +
                storeData.info.permanent.n4,
            };
            optionTableData();
          }
        } else {
          if (storeData.info[data.screenItem1].all != 0) {
            data.dataObj = {
              time: getTime(storeData.info[data.screenItem1].allList),
              all: storeData.info[data.screenItem1].all,
              n5: storeData.info[data.screenItem1].n5,
              n4: storeData.info[data.screenItem1].n4,
            };
          }
        }
        data.dataObj["n3"] =
          data.dataObj.all - data.dataObj.n5 - data.dataObj.n4;
        data.dataObj["a5"] = data.dataObj.n5
          ? data.dataObj.all / data.dataObj.n5
          : 0;
        data.dataObj["a4"] = data.dataObj.n4
          ? data.dataObj.all / data.dataObj.n4
          : 0;
        data.dataObj["a3"] =
          data.dataObj.all != data.dataObj.n4 + data.dataObj.n5
            ? data.dataObj.all /
              (data.dataObj.all - data.dataObj.n4 - data.dataObj.n5)
            : 0;
        data.dataObj["p5"] = data.dataObj.all
          ? (data.dataObj.n5 * 100) / data.dataObj.all
          : 0;
        data.dataObj["p4"] = data.dataObj.all
          ? (data.dataObj.n4 * 100) / data.dataObj.all
          : 0;
        data.dataObj["p3"] =
          100 - data.dataObj.p5.toFixed(2) - data.dataObj.p4.toFixed(2);
        data.loadData = true;
      }, (Math.floor(Math.random() * 3) + 3) * 100);
    };

    // 主页单选框切换事件
    const radioChange1 = () => {
      optionData();
    };

    optionData();

    // 首页情况统计单选框切换事件 切换的时候加loading，初始加载的时候外边有一层，就不加了
    const radioChange2 = () => {
      data.loadTableData = false;
      setTimeout(() => {
        optionTableData();
        data.loadTableData = true;
      }, (Math.floor(Math.random() * 3) + 3) * 100);
    };
    const initEcharts = () => {
      let myChart = echarts.init(document.getElementById("echart"));
      let option1 = {
        graphic: {
          elements: [
            {
              type: "text",
              left: "center",
              top: "center",
              style: {
                text: "Wish Analysis Histogram",
                fontSize: 80,
                fontWeight: "bold",
                lineDash: [0, 200],
                lineDashOffset: 0,
                fill: "transparent",
                stroke: "#ccc",
                lineWidth: 1,
              },
              keyframeAnimation: {
                duration: 2000,
                loop: false,
                keyframes: [
                  {
                    percent: 0.6,
                    style: {
                      fill: "transparent",
                      lineDashOffset: 200,
                      lineDash: [200, 0],
                    },
                  },
                  {
                    // Stop for a while.
                    percent: 0.6,
                    style: {
                      stroke: "#eee",
                      fill: "#fff",
                    },
                  },
                  {
                    percent: 1,
                    style: {
                      stroke: "#eee",
                      fill: "#eee",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      let option2 = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220],
          },
        ],
      };
      setTimeout(() => {
        // myChart.clear();
        myChart.setOption(option1);
      }, 500);
      setTimeout(() => {
        // myChart.clear();
        myChart.setOption(option2);
      }, 1500);
      window.onresize = () => {
        myChart.resize();
      };
    };
    // 当移动到echarts上时，重设光标样式
    let cursor = require("@/assets/image/cursor.png");
    const mmFunc = function () {
      document.getElementsByClassName(
        "echart"
      )[0].childNodes[0].style.cursor = `url(${cursor}), auto`;
    };

    onMounted(() => {
      // initEcharts();
      // 监听鼠标移动事件
      // document.addEventListener("mousemove", mmFunc);
    });

    onUnmounted(() => {
      // 卸载时移除监听鼠标移动事件
      // document.removeEventListener("mousemove", mmFunc);
    });

    return {
      ...toRefs(data),
      columnClassName,
      radioChange1,
      radioChange2,
    };
  },
};
</script>

<style scoped lang="scss">
.analysis {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #fafafa;
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  .title {
    color: #515a68 !important;
    font-size: 1rem !important;
  }
  .count {
    color: rgba($color: #515a68, $alpha: 1) !important;
  }
  .king {
    color: rgba($color: #ef8123, $alpha: 0.8) !important;
  }
  .purple {
    color: rgba($color: #a256e1, $alpha: 0.8) !important;
  }
  .blue {
    color: rgba($color: #00a8f3, $alpha: 0.8) !important;
  }
  .king-star {
    font-size: 1rem !important;
  }
  .content {
    width: 100vw;
    height: calc(100vh - 59px);
    overflow: auto;
    text-align: left;
    box-sizing: border-box;
    padding: 0 5%;
    .screen {
      display: flex;
      justify-content: space-between;
      h2 {
        height: 35px;
        line-height: 40px;
        margin: 15px 0 10px;
        font-size: 1rem;
        font-weight: normal;
        .icon {
          background-color: #8ba3c7;
        }
      }
      :deep(.el-radio-button__inner) {
        cursor: url("@/assets/image/cursor.png"), auto;
      }
      :deep(.el-radio-button:first-child .el-radio-button__inner) {
        border-radius: 20px 0 0 20px;
      }
      :deep(.el-radio-button:current-child .el-radio-button__inner) {
        border-radius: 0 20px 20px 0;
      }
    }
    .radioGroup {
      margin-top: 15px;
    }
    // 分割线
    :deep(.el-divider--horizontal) {
      margin: 10px 0;
    }
    .row-box {
      margin-bottom: 20px;
    }
    .card {
      height: 180px;
    }
    .card2 {
      height: 280px;
    }
    .text1-box {
      display: flex;
      justify-content: space-between;
    }
    .card-text1 {
      height: 20px;
      line-height: 20px;
      color: #aaaaaa;
      font-size: 0.8rem;
      width: 50%;
      overflow: hidden;
      text-overflow: clip;
    }
    .tr {
      text-align: right;
    }
    .card-text2 {
      z-index: 100;
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 3rem;
    }
    .h24 {
      height: 24px;
      line-height: 20px;
    }
    .lh0 {
      line-height: 0;
    }
  }
  .echart {
    width: 100%;
    height: 360px;
  }
}
</style>
