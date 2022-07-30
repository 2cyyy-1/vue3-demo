<template>
  <div class="wish">
    <!-- 顶部栏 -->
    <transition name="top" appear>
      <div v-if="show" class="tab">
        <!-- 面包屑 -->
        <div class="star"></div>
        <div class="title-text">祈愿</div>
        <!-- 卡池切换 -->
        <div
          :class="tabIndex === 1 ? 'tab-item-1-select' : 'tab-item-1'"
          @click="tabChange(1)"
        ></div>
        <div
          :class="tabIndex === 2 ? 'tab-item-2-select' : 'tab-item-2'"
          @click="tabChange(2)"
        ></div>
        <div
          :class="tabIndex === 3 ? 'tab-item-3-select' : 'tab-item-3'"
          @click="tabChange(3)"
        ></div>
        <div
          :class="tabIndex === 4 ? 'tab-item-4-select' : 'tab-item-4'"
          @click="tabChange(4)"
        ></div>
        <!-- 清除按钮 -->
        <!-- <transition name="statistics" appear>
          <div class="statistics" @click="clear()">清除全部数据</div>
        </transition> -->
      </div>
    </transition>
    <!-- 卡池背景 -->
    <transition name="center" appear>
      <div v-if="show" class="show-box">
        <transition name="icon" appear>
          <div class="tab-left" @click="tabChange('left')"></div>
        </transition>
        <transition name="icon" appear>
          <div class="tab-right" @click="tabChange('right')"></div>
        </transition>
        <transition v-for="i in 4" :key="i" name="slide-fade" appear>
          <div
            v-if="tabIndex === i"
            :class="'show' + i"
            :key="'show' + i"
          ></div>
        </transition>
      </div>
    </transition>
    <!-- 底部按钮 -->
    <transition name="bottom" appear>
      <div v-if="show" class="btn-box">
        <div class="btn-left btn-analysis" @click="toPath('/analysis')">
          祈愿分析
          <div>
            <div class="border-inside"></div>
            <div class="border-outside"></div>
          </div>
        </div>
        <div class="btn-left btn-detail" @click="toPath('/detail')">
          详情
          <div>
            <div class="border-inside"></div>
            <div class="border-outside"></div>
          </div>
        </div>
        <div class="btn-left btn-history" @click="toPath('/history')">
          历史记录
          <div>
            <div class="border-inside"></div>
            <div class="border-outside"></div>
          </div>
        </div>
        <div
          v-if="tabIndex === 4"
          class="btn-right btn1-permanent"
          @click="wish(1)"
        ></div>
        <div v-else class="btn-right btn1-up" @click="wish(1)"></div>
        <div
          v-if="tabIndex === 4"
          class="btn-right btn10-permanent"
          @click="wish(10)"
        ></div>
        <div v-else class="btn-right btn10-up" @click="wish(10)"></div>
      </div>
    </transition>
    <!-- 定规按钮 -->
    <div v-if="tabIndex === 3" class="reg-btn" @click="regDialog = true">
      <div v-if="realRegulation === false" class="reg-btn-text">神铸定轨</div>
      <div v-else class="reg-btn-text">
        <span class="orange1">{{ regCount }}</span
        >/2
      </div>
    </div>
    <!-- 定规页面 -->
    <reg-dialog
      :regDialog="regDialog"
      @closeDialog="regDialog = false"
      @orbit="regetStore()"
      @cancelOrbit="regetStore()"
    ></reg-dialog>
  </div>
</template>

<script>
import { reactive, toRefs, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { getItem } from "../../assets/method/wish.js";
import store from "@/store";
import RegDialog from "@/components/regDialog.vue";

export default {
  name: "WishView",
  components: { RegDialog },
  setup() {
    const router = useRouter();
    const { proxy } = getCurrentInstance();

    const storeData = JSON.parse(JSON.stringify(store.state))

    let data = reactive({
      tabIndex: storeData.type,
      show: true,
      dataList: null,
      regDialog: false,
      realRegulation: storeData.reg.regulation,
      regCount: storeData.reg.count,
    });

    const toPath = (url, query) => {
      data.show = false;
      setTimeout(() => {
        router.push({ path: url, query: query });
      }, 600);
    };
    // 祈愿
    const wish = (times) => {
      let dataList = getItem(times, data.tabIndex);
      // console.log("抽卡数据====", dataList);
      data.dataList = dataList;
      let query;
      if (times === 10) {
        query = { video: "10p" };
        dataList.forEach((item) => {
          if (item.star === 5) {
            query = { video: "10k" };
          }
        });
      } else if (times === 1) {
        query = { video: "1b" };
        //只有一次循环，所以可以在循环里面判断
        dataList.forEach((item) => {
          if (item.star === 4) {
            query = { video: "1p" };
          } else if (item.star === 5) {
            query = { video: "1k" };
          }
        });
      }
      toPath("/goWish", query);
    };
    // tab切换事件
    const tabChange = (val) => {
      if (val === "left") {
        if (data.tabIndex > 1) {
          data.tabIndex -= 1;
        } else {
          data.tabIndex = 4;
        }
      } else if (val === "right") {
        if (data.tabIndex < 4) {
          data.tabIndex += 1;
        } else {
          data.tabIndex = 1;
        }
      } else {
        data.tabIndex = val;
      }
      store.commit("setType", data.tabIndex);
    };
    // 重新获取store中的值，用于页面动态刷新
    const regetStore = () => {
      data.realRegulation = JSON.parse(JSON.stringify(store.state)).reg.regulation;
      data.regCount = JSON.parse(JSON.stringify(store.state)).reg.count;
    };
    // 清除抽卡数据
    const clear = () => {
      proxy
        .$confirm("此操作将永久清除全部抽卡数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          store.commit("setInitialization");
          proxy.$message({
            type: "success",
            message: "清除成功!",
          });
        })
        .catch(() => {
          // proxy.$message({
          //   type: "info",
          //   message: "已取消清除",
          // });
        });
    };
    return {
      ...toRefs(data),
      tabChange,
      toPath,
      wish,
      regetStore,
      clear,
    };
  },
};
</script>

<style scoped lang="scss">
//尺寸稿1536*864
// 背景样式
.wish {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url("../../assets/image/wishBg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  // 头部栏
  .tab {
    margin: 0 auto;
    width: 50%;
    position: relative;
    // 标签通用样式（会影响到title，但无所谓）
    div {
      position: absolute;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      transition: all 0.1s ease;
      -webkit-transition: all 0.1s ease;
    }
    // title图标
    .star {
      top: 1.95vh;
      left: -22.4vw;
      width: 2.8vw;
      height: 5vh;
      background-image: url("../../assets/image/iconStar.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    // title文字
    .title-text {
      top: 3.12vh;
      left: -17.5vw;
      font-size: 1.2em;
      font-weight: 500;
      color: #f6f2ee;
      text-shadow: 0 0 2px #222222;
    }
    /** version:2.5 start 以下内容随版本更新 */
    // tab默认样式
    .tab-item-1 {
      top: 1.48vh;
      left: 5.66vw;
      height: 7.25vh;
      width: 8.3vw;
      background-image: url("../../assets/image/upTab.png");
    }
    // tab鼠标移入样式
    .tab-item-1:hover {
      top: 1.02vh;
      left: 5.2vw;
      height: 7.98vh;
      width: 9.25vw;
    }
    // tab选中样式
    .tab-item-1-select {
      top: 0.15vh;
      left: 5.2vw;
      height: 8.85vh;
      width: 9.25vw;
      background-image: url("../../assets/image/upTabSelect.png");
    }
    .tab-item-2 {
      top: 1.53vh;
      left: 15.76vw;
      height: 7.22vh;
      width: 8.33vw;
      background-image: url("../../assets/image/upTab2.png");
    }
    .tab-item-2:hover {
      top: 1.11vh;
      left: 15.31vw;
      height: 7.89vh;
      width: 9.26vw;
    }
    .tab-item-2-select {
      top: 0.15vh;
      left: 15.31vw;
      height: 8.84vh;
      width: 9.2vw;
      background-image: url("../../assets/image/upTabSelect2.png");
    }
    .tab-item-3 {
      top: 1.44vh;
      left: 25.86vw;
      height: 7.24vh;
      width: 8.38vw;
      background-image: url("../../assets/image/armsTab.png");
    }
    .tab-item-3:hover {
      top: 1.04vh;
      left: 25.41vw;
      height: 7.94vh;
      width: 9.26vw;
    }
    .tab-item-3-select {
      top: 0.2vh;
      left: 25.46vw;
      height: 8.77vh;
      width: 9.23vw;
      background-image: url("../../assets/image/armsTabSelect.png");
    }
    /** version:2.5 end 以上内容随版本更新 */
    .tab-item-4 {
      top: 1.55vh;
      left: 36.03vw;
      height: 7.16vh;
      width: 8.29vw;
      background-image: url("../../assets/image/permanentTab.png");
    }
    .tab-item-4:hover {
      top: 1.08vh;
      left: 35.57vw;
      height: 7.94vh;
      width: 9.23vw;
    }
    .tab-item-4-select {
      top: 0.13vh;
      left: 35.56vw;
      height: 8.86vh;
      width: 9.23vw;
      background-image: url("../../assets/image/permanentTabSelect.png");
    }
    // 抽卡统计信息 暂时注释
    .statistics {
      right: -25vw;
      top: 0;
      height: 4vh;
      line-height: 4.1vh;
      width: 8vw;
      background-color: #8ba3c7;
      border-radius: 0 0 0 5px;
      color: #ffffff;
      font-size: 0.9em;
      // 字体超出隐藏 分辨率适配
      overflow: hidden;
      text-overflow: clip;
    }
  }
  // 卡池信息展示样式
  .show-box {
    position: relative;
    margin-left: 15.85vw;
    // 卡池图片通用样式
    div {
      position: absolute;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    // 翻页（左）
    .tab-left {
      top: 48vh;
      left: -12.9vw;
      height: 4.1vh;
      width: 1.8vw;
      background-image: url("../../assets/image/icon-left.png");
    }
    // 翻页（右）
    .tab-right {
      top: 48vh;
      right: 2.94vw;
      height: 4.1vh;
      width: 1.8vw;
      background-image: url("../../assets/image/icon-right.png");
    }
    // 翻页键按下样式
    .tab-left:active,
    .tab-right:active {
      transition: opacity 0.15s;
      opacity: 0.5;
    }
    // 卡池图片样式
    .show1 {
      top: 19.44vh;
      height: 63.08vh;
      width: 68.03vw;
      background-image: url("../../assets/image/upShow.png");
    }
    .show2 {
      margin-left: 0.07vw;
      top: 19.66vh;
      height: 62.88vh;
      width: 68vw;
      background-image: url("../../assets/image/upShow2.png");
    }
    .show3 {
      top: 16.79vh;
      height: 74.92vh;
      width: 68.03vw;
      background-image: url("../../assets/image/armsShow.png");
    }
    .show4 {
      top: 13.55vh;
      height: 68.88vh;
      width: 68.09vw;
      background-image: url("../../assets/image/permanentShow.png");
    }
  }
  //定轨按钮样式
  .reg-btn {
    position: absolute;
    top: 72.2vh;
    left: 3vw;
    height: 14.3vh;
    width: 9.95vw;
    background-image: url("../../assets/image/regulationBtn.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    filter: drop-shadow(0 0 5px #999999);
    transition: all 0.2s ease-out;
    &:hover {
      transition: all 0.1s ease-out;
      transform: scale(1.03);
      filter: drop-shadow(0 0 5px #999999) brightness(1.05);
    }
    // 定轨按钮文字
    .reg-btn-text {
      position: absolute;
      top: 10vh;
      left: 1vw;
      height: 4vh;
      width: 7.95vw;
      line-height: 4.1vh;
      padding-top: 0.07vh;
      padding-left: 0.01vw;
      font-size: 1.2em;
    }
  }
  // 底部栏样式
  .btn-box {
    position: relative;
    top: 89.65vh;
    // 左侧祈愿分析/详情/历史记录按钮通用样式（手写）
    .btn-left {
      position: absolute;
      margin-top: 2.9vh;
      height: 4vh;
      width: 9vw;
      border-radius: 3vh;
      color: #3b4255cb;
      line-height: 4.35vh;
      font-size: 1.08em;
      font-weight: 500;
      text-shadow: 0 0 0.04em #3b4255cb;
      box-shadow: 0 0 5px #999999;
      // // 字体超出隐藏 分辨率适配 border也会被隐藏 暂时注释
      // overflow: hidden;
      // text-overflow: clip;

      background-color: #e1ded5;
      transition: all 0.2s ease;
      -webkit-transition: all 0.2s ease;
      // 左侧按钮边框样式
      // border从无到有，transition属性会出现bug，因此border设置为透明色而不是无边框
      div {
        // 外边框默认样式
        .border-outside {
          position: absolute;
          top: -0.07vh;
          left: -0.05vw;
          height: 4.2vh;
          width: 9.1vw;
          border-radius: 3vh;

          border: 3px solid rgba(255, 255, 255, 0);
          box-sizing: border-box;
          transition: all 0.2s ease;
          -webkit-transition: all 0.2s ease;
        }
        // 内边框默认样式
        .border-inside {
          position: absolute;
          top: 0.1vh;
          left: 0.05vw;
          height: 3.8vh;
          width: 8.9vw;
          border-radius: 3vh;

          border: 3px solid rgba(255, 255, 255, 0);
          box-sizing: border-box;
          transition: all 0.2s ease;
          -webkit-transition: all 0.2s ease;
        }
      }
    }
    // 左侧按钮鼠标移入样式
    .btn-left:hover {
      background-color: #ece5d8;
      div {
        // 外边框鼠标移入样式
        .border-outside {
          box-shadow: 0 0 3px #ffffff, 0 0 1px #ffffff inset;
          border: 3px solid #ffffff;
        }
        // 内边框鼠标移入样式
        .border-inside {
          box-shadow: 0 0 1px #d4cec5 inset;
          border: 0.15em solid #d4cec5;
        }
      }
    }
    .btn-left:active {
      transform: scale(0.97);
      opacity: 0.8;
      color: #fff;
      background-color: rgb(231, 220, 201);
      font-weight: 700;
    }
    .btn-left:active .border-outside {
      border-color: #aaa !important;
    }
    // 右侧按钮样式（图片）
    .btn-right {
      position: absolute;
      height: 7.29vh;
      width: 17.97vw;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      transition: all 0.1s ease-out;
      &:active {
        filter: contrast(0.8);
      }
    }
    // 全部按钮位置
    .btn-analysis {
      left: 3.5vw;
    }
    .btn-detail {
      left: 13.5vw;
    }
    .btn-history {
      left: 23.5vw;
    }
    .btn1-up {
      right: 22.4vw;
      background-image: url("../../assets/image/upWish1.png");
    }
    .btn10-up {
      right: 2.9vw;
      background-image: url("../../assets/image/upWish10.png");
    }
    .btn1-permanent {
      right: 22.4vw;
      background-image: url("../../assets/image/permanentWish1.png");
    }
    .btn10-permanent {
      right: 2.9vw;
      background-image: url("../../assets/image/permanentWish10.png");
    }
  }
}
/** vue transition标签渐入渐出样式 start */
// 顶部栏整体
.top-enter-from {
  transform: translateY(-5vh);
  opacity: 0;
}
.top-enter-active {
  transition: all 0.3s ease 0.2s;
}
.top-leave-active {
  transition: all 0.3s ease 0.2s;
}
.top-leave-to {
  transform: translateY(-5vh);
  opacity: 0;
}
// 中间卡池整体
.center-leave-active {
  transition: all 0.3s ease 0.2s;
}
.center-leave-to {
  opacity: 0;
}
// 底部整体
.bottom-enter-from {
  transform: translateY(5vh);
  opacity: 0;
}
.bottom-enter-active {
  transition: all 0.3s ease 0.2s;
}
.bottom-leave-active {
  transition: all 0.3s ease 0.2s;
}
.bottom-leave-to {
  opacity: 0;
  transform: translateY(5vh);
}
// 卡池切换
.icon-enter-from {
  opacity: 0;
}
.icon-enter-active {
  transition: all 0.2s ease-out 0.5s;
}
// 左右翻页
.slide-fade-enter-from {
  transform: translateX(1.2vw);
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 0.4s ease-out 0.2s;
}
.slide-fade-leave-active {
  transition: all 0.1s ease-in;
}
.slide-fade-leave-to {
  // transform: translateX(1.2vw);
  opacity: 0;
}
/** vue transition标签渐入渐出样式 end */
.change {
  font-size: 20px;
  color: #0cf;
}
</style>