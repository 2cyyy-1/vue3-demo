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
          <el-card class="card-image">
            <div class="image"></div>
            <div class="logo"></div>
            <div class="text2-box">
              <div class="title">写在前面</div>
              <br />
              <div v-if="hasData" class="title">
                自
                <span style="color: #8ba3c7">{{
                  dataObj.time && toCNtime(dataObj.time.slice(0, 10))
                }}</span>
                起, 你已累计游玩
                <span style="color: #8ba3c7">{{
                  dataObj.time && toDays(dataObj.time.slice(0, 10)).toFixed(0)
                }}</span>
                天^ ^
              </div>
              <div class="title" style="margin-top: 5px">
                本祈愿模拟器基于浏览器, 请不要轻易更换浏览器或清除缓存,
                否则祈愿数据可能会丢失喔, 更多功能正在开发中~
              </div>
            </div>
          </el-card>
        </div>
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
                  <div class="card-text1 title">五星</div>
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
                  <div class="card-text1 title">四星</div>
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
                  <div class="card-text1 title">三星</div>
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
                  <div class="card-text1 title h24">祈愿情况统计</div>
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
                <div class="shadow"></div>
                <el-table
                  :data="tableData"
                  class="table"
                  style="width: 100%"
                  size="large"
                >
                  <el-table-column
                    prop="pool"
                    label="卡池"
                    align="left"
                    min-width="45"
                  />
                  <el-table-column
                    prop="count"
                    label="距离保底"
                    align="center"
                    min-width="76"
                  />
                  <el-table-column
                    prop="current"
                    label="最近获取"
                    align="center"
                    min-width="76"
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
                    min-width="60"
                  />
                </el-table>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="card2" shadow="always">
                <div class="text1-box">
                  <div class="card-text1 title h24">祈愿情况分析</div>
                </div>
                <div v-if="hasData" style="position: relative">
                  <div id="echart" class="echart"></div>
                  <transition-group name="pieText" appear>
                    <div v-if="!pieText" class="pie-text">欧气</div>
                    <div v-else class="pie-text">{{ pieText }}</div>
                  </transition-group>
                </div>
                <div v-else class="pie-no-data">暂无祈愿数据 T^T</div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
// import store from "@/store";
import * as echarts from "echarts";
import topBar from "@/components/topBar.vue";
import countTo from "@/components/countTo/vue-countTo.vue";
import { formatDate } from "@/assets/method/utils";
import { useStore } from "vuex";

export default {
  name: "AnalysisView",
  components: { topBar, countTo },
  setup() {
    const route = useRoute();
    const store = useStore();

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
          current: "-",
          count: "-",
          time: "-",
        },
        {
          pool: "武器",
          current: "-",
          count: "-",
          time: "-",
        },
        {
          pool: "常驻",
          current: "-",
          count: "-",
          time: "-",
        },
      ],
      screenItem2: "5",
      pieChart: "",
      pieText: "",
      hasData: true,
      pieOption: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "28%",
          orient: "vertical",
          right: "10%",
          itemGap: 30,
          itemHeight: 14,
          itemWidth: 36,
          itemStyle: {
            borderColor: 0,
            borderWidth: 0,
            shadowBlur: 3,
            shadowColor: "#777",
          },
          textStyle: {
            color: "#515a68",
            fontSize: 14,
            padding: [0, 0, 0, 10],
            fontFamily: "hk4e_zh-cn",
          },
        },
        series: [
          {
            name: "祈愿情况",
            type: "pie",
            radius: ["50%", "80%"],
            right: "200px",
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 7,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: true,
              fontSize: 14,
              fontWeight: "normal",
              color: "#515a68",
              fontFamily: "hk4e_zh-cn",
              position: "outside",
            },
            labelLine: {
              show: true,
              length: 20,
              length2: 50,
              minTurnAngle: 120,
              lineStyle: {
                width: 1.5,
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
              },
              labelLine: {
                show: true,
                lineStyle: {
                  width: 2.5,
                },
              },
            },
            data: [
              { value: 0, name: "五星" },
              { value: 0, name: "四星" },
              { value: 0, name: "三星" },
            ],
          },
        ],
        color: ["#fac858", "#91cc75", "#5470c6"],
      },
    });

    const storeData = JSON.parse(JSON.stringify(store.state));

    watch(
      // 监听数据变化重新渲染饼图
      () => data.dataObj.n5,
      (newValue, oldValue) => {
        initEcharts();
      }
    );

    watch(
      // 饼图初始化时添加监听事件
      () => data.pieChart,
      (newValue, oldValue) => {
        // 监听鼠标移动事件
        document.addEventListener("mousemove", mmFunc);
      }
    );

    // 获取祈愿最早到最晚时间范围
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
    // 转成中文时间
    const toCNtime = (time) => {
      return (
        time.split("-")[0] +
        "年" +
        (time.split("-")[1].slice(0, 1) == 0
          ? time.split("-")[1].slice(1, 2)
          : time.split("-")[1]) +
        "月" +
        time.split("-")[2] +
        "日"
      );
    };
    // 计算天数
    const toDays = (time) => {
      let startTime = Date.parse(time);
      let endTime = new Date().getTime();
      let days =
        startTime === endTime
          ? 1
          : startTime > endTime
          ? 0
          : (endTime - startTime) / (1 * 24 * 60 * 60 * 1000);
      return days;
    };
    // 从祈愿列表检索最近抽取的5星/4星
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
      let upObj = getCurrentData("up");
      let armsObj = getCurrentData("arms");
      let permanentObj = getCurrentData("permanent");
      data.tableData[0] = upObj
        ? {
            pool: "活动",
            current: upObj.name,
            count:
              (data.screenItem2 === "5" ? 90 : 10) -
              storeData.info.up["c" + data.screenItem2] +
              "抽",
            time: formatDate(upObj.time).slice(0, 10),
          }
        : {
            pool: "活动",
            current: "-",
            count: "-",
            time: "-",
          };
      data.tableData[1] = armsObj
        ? {
            pool: "武器",
            current: armsObj.name,
            count:
              (data.screenItem2 === "5" ? 80 : 10) -
              storeData.info.arms["c" + data.screenItem2] +
              "抽",
            time: formatDate(armsObj.time).slice(0, 10),
          }
        : {
            pool: "武器",
            current: "-",
            count: "-",
            time: "-",
          };
      data.tableData[2] = permanentObj
        ? {
            pool: "常驻",
            current: permanentObj.name,
            count:
              (data.screenItem2 === "5" ? 90 : 10) -
              storeData.info.permanent["c" + data.screenItem2] +
              "抽",
            time: formatDate(permanentObj.time).slice(0, 10),
          }
        : {
            pool: "常驻",
            current: "-",
            count: "-",
            time: "-",
          };
    };
    // 初始化数据
    const optionData = () => {
      data.loadData = false;
      data.pieText = "";
      let obj = JSON.parse(JSON.stringify(data.dataObj));
      if (data.screenItem1 === "all") {
        if (
          storeData.info.up.all +
            storeData.info.arms.all +
            storeData.info.permanent.all !=
          0
        ) {
          obj = {
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
          obj = {
            time: getTime(storeData.info[data.screenItem1].allList),
            all: storeData.info[data.screenItem1].all,
            n5: storeData.info[data.screenItem1].n5,
            n4: storeData.info[data.screenItem1].n4,
          };
        }
      }
      obj["n3"] = obj.all - obj.n5 - obj.n4;
      obj["a5"] = obj.n5 ? obj.all / obj.n5 : 0;
      obj["a4"] = obj.n4 ? obj.all / obj.n4 : 0;
      obj["a3"] =
        obj.all != obj.n4 + obj.n5 ? obj.all / (obj.all - obj.n4 - obj.n5) : 0;
      obj["p5"] = obj.all ? (obj.n5 * 100) / obj.all : 0;
      obj["p4"] = obj.all ? (obj.n4 * 100) / obj.all : 0;
      obj["p3"] = obj.all ? 100 - obj.p5.toFixed(2) - obj.p4.toFixed(2) : 0;
      // 需要即时渲染的数据在这里
      data.hasData = !!obj.all;
      data.pieOption.series[0].data[0].value = obj.n5;
      data.pieOption.series[0].data[1].value = obj.n4;
      data.pieOption.series[0].data[2].value = obj.n3;
      setTimeout(() => {
        // 需要延时渲染的数据在这里
        data.dataObj = obj;
        data.pieText = !obj.n5
          ? ""
          : obj.a5 < 60
          ? "欧皇"
          : obj.a5 < 75
          ? "平平"
          : "非酋";
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

    // 渲染echarts
    const initEcharts = () => {
      data.pieChart = echarts.init(document.getElementById("echart"));
      setTimeout(() => {
        // data.pieChart.clear();
        data.pieChart.setOption(data.pieOption);
      }, 200);
      window.onresize = () => {
        data.pieChart.resize();
      };
    };
    // 当移动到echarts上时，重设光标样式
    let cursor = require("@/assets/image/cursor.png");
    const mmFunc = function () {
      document.getElementsByClassName(
        "echart"
      )[0].childNodes[0].style.cursor = `url(${cursor}), auto`;
    };

    onMounted(() => {});

    onUnmounted(() => {
      // 卸载时移除监听鼠标移动事件
      document.removeEventListener("mousemove", mmFunc);
    });

    return {
      ...toRefs(data),
      radioChange1,
      radioChange2,
      toCNtime,
      toDays,
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
      height: 325px;
      .shadow {
        position: absolute;
        height: 245px;
        width: calc(48.4% - 40px);
        background-color: #fff0;
        z-index: 1000;
      }
    }
    .card-image {
      position: relative;
      height: 120px;
      .image {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 120px;
        width: 100%;
        background-image: linear-gradient(to right, #ffffff, transparent),
          url("@/assets/image/card-image.png");
        background-size: 100% 100%;
        opacity: 60%;
      }
      .logo {
        position: absolute;
        top: 0;
        right: 0;
        height: 100px;
        width: 130px;
        background-image: url("@/assets/image/yuanshen.png");
        background-size: 100% 100%;
        margin: 10px 15px;
        opacity: 80%;
      }
      .text2-box {
        position: absolute;
        width: 80%;
      }
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
    :deep(.el-radio-button__inner) {
      cursor: url("@/assets/image/cursor.png"), auto;
    }
    // 表格
    .table {
      margin-top: 10px;
      :deep(th) {
        height: 60px;
      }
      :deep(td) {
        height: 60px;
      }
    }
    // 饼图中间文字
    .pie-text {
      position: absolute;
      top: 43%;
      right: calc(50% + 70px);
      font-size: 30px;
      color: #515a68;
    }
    // 饼图无数据
    .pie-no-data {
      text-align: center;
      height: 280px;
      line-height: 280px;
      color: #a0a4ad;
    }
  }
  .echart {
    width: 100%;
    height: 280px;
  }
  .pieText-enter-from {
    opacity: 0;
  }
  .pieText-enter-active {
    transition: all 0.3s ease 1s;
  }
  .pieText-leave-active {
    transition: all 0.3s ease 0.7s;
  }
  .pieText-leave-to {
    opacity: 0;
  }
}
</style>
