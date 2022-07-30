<template>
  <transition name="wish-result" appear>
    <div class="wish-result">
      <p class="back-btn" @click="toPath('/wish')"></p>
      <template v-for="item in itemList" :key="item.label">
        <transition :name="'wish-item' + item.label" appear>
          <div
            :class="'item-box wish-item' + item.label"
            :id="'item' + item.label"
          >
            <img class="item-image" :src="item.url" />
          </div>
        </transition>
        <transition :name="'wish-item-bg' + item.label" appear>
          <div
            v-if="item.star === 3"
            :class="'item-box-bg wish-item-bg' + item.label"
            :id="'bg' + item.label"
          >
            <div class="bg2-blue"></div>
            <div class="bg1-blue">
              <div class="bg1-blue-left"></div>
              <div class="bg1-blue-right"></div>
            </div>
          </div>
          <div
            v-else-if="item.star === 4"
            :class="'item-box-bg wish-item-bg' + item.label"
            :id="'bg' + item.label"
          >
            <div class="bg-purple">
              <div class="bg2-purple">
                <div class="bg2-purple-left"></div>
                <div class="bg2-purple-right"></div>
              </div>
              <div class="bg1-purple">
                <div class="bg1-purple-left"></div>
                <div class="bg1-purple-right"></div>
              </div>
              <div class="bg3-purple"></div>
            </div>
            <div class="bg-purple-vertical">
              <div class="bg-purple-vertical-left"></div>
              <div class="bg-purple-vertical-right"></div>
            </div>
            <div class="purple-particle">
              <div class="purple-star-up-1">✦</div>
              <div class="purple-point-up-1">·</div>
              <div class="purple-star-up-2">✦</div>
              <div class="purple-star-up-3">✦</div>
              <div class="purple-cusp-up-1"></div>
              <div class="purple-cusp-up-2"></div>
              <div class="purple-cusp-up-3"></div>
              <div class="purple-star-down-1">✦</div>
              <div class="purple-point-down-1">·</div>
              <div class="purple-star-down-2">✦</div>
              <div class="purple-cusp-down-1"></div>
              <div class="purple-cusp-down-2"></div>
            </div>
          </div>
          <div
            v-else
            :class="'item-box-bg wish-item-bg' + item.label"
            :id="'bg' + item.label"
          >
            <div class="bg-king-vertical">
              <div class="bg-king-vertical-left"></div>
              <div class="bg-king-vertical-right"></div>
            </div>
            <div class="bg-king">
              <div class="bg1-king">
                <div class="bg1-king-left"></div>
                <div class="bg1-king-right"></div>
              </div>
              <div class="bg2-king"></div>
            </div>
            <div class="king-particle">
              <div class="king-star-up-1">✦</div>
              <div class="king-star-up-2">✦</div>
              <div class="king-star-up-3">✦</div>
              <div class="king-star-up-4">✦</div>
              <div class="king-star-up-5">✦</div>
              <div class="king-point-up-1">·</div>
              <div class="king-point-up-2">·</div>
              <div class="king-point-up-3">·</div>
              <div class="king-point-up-4">·</div>
              <div class="king-point-up-5">·</div>
              <div class="king-point-up-6">·</div>
              <div class="king-point-up-7">·</div>
              <div class="king-point-up-8">·</div>
              <div class="king-point-up-9">·</div>
              <div class="king-cusp-up-1"></div>
              <div class="king-cusp-up-2"></div>
              <div class="king-star-down-1">✦</div>
              <div class="king-star-down-2">✦</div>
              <div class="king-star-down-3">✦</div>
              <div class="king-star-down-4">✦</div>
              <div class="king-star-down-5">✦</div>
              <div class="king-point-down-1">·</div>
              <div class="king-point-down-2">·</div>
              <div class="king-point-down-3">·</div>
              <div class="king-point-down-4">·</div>
              <div class="king-point-down-5">·</div>
              <div class="king-point-down-6">·</div>
              <div class="king-point-down-7">·</div>
              <div class="king-cusp-down-1"></div>
              <div class="king-cusp-down-2"></div>
            </div>
          </div>
        </transition>
      </template>
    </div>
  </transition>
  <!-- 从抽卡动画过渡 -->
  <div class="mask"></div>
  <!-- 进入页面前防点击遮罩 -->
  <div class="mask transparent" id="transparent"></div>
</template>

<script>
import { reactive, toRefs, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "WishResultView",
  setup() {
    const router = useRouter();
    const store = useStore();

    // js控制进入页面一段时间加一层透明遮罩，之后添加wish-item渐变效果，否则vue的transition标签和css的transition属性有冲突
    const t = setTimeout(() => {
      document
        .getElementsByClassName("wish-result")[0]
        .childNodes.forEach((item) => {
          if (item.localName === "div") {
            // TODO 换成类名检索会更好
            item.style.transition = "transform 0.2s ease";
          }
        });
      document.getElementById("transparent").style.zIndex = -100;
    }, 1200);

    let data = reactive({
      itemList: [],
    });
    //令人疑惑的影响，直接赋值后下面添加label和url的操作会影响到store.state.recentList
    data.itemList = JSON.parse(JSON.stringify(store.state.recentList));
    //按星级排序
    data.itemList.sort(function (a, b) {
      return b.star - a.star;
    });
    //label和url
    data.itemList.forEach((item, index) => {
      item.label = index + 1;
      item.url = require("../../assets/image/item/" + item.name + ".png");
    });
    console.log(
      "\t*********************本次抽卡数据*********************\n",
      JSON.parse(JSON.stringify(store.state.recentList))
    );

    const toPath = (url) => {
      router.push({ path: url });
    };

    onMounted(() => {
      // 单抽位置
      if (data.itemList.length === 1) {
        document.getElementById("item1").style.left = "46.3vw";
        document.getElementById("bg1").style.left = "46.6vw";
      }
      // 十抽位置
      else {
        data.itemList.forEach((item, index) => {
          document.getElementById("bg" + (index + 1)).style.left =
            12.85 + 7.5 * index + "vw";
        });
      }
    });

    onUnmounted(() => {
      clearTimeout(t); // 卸载时清除定时防止继续添加渐变样式
    });

    return {
      ...toRefs(data),
      toPath,
    };
  },
};
</script>

<style scoped lang="scss">
// 渐入遮罩
.mask {
  width: 100vw;
  height: 100vh;
  background-color: #000;
}
// 防点击透明遮罩
.transparent {
  position: absolute;
  top: 10vh;
  height: 90vh;
  background-color: rgba($color: #ffffff, $alpha: 0);
  z-index: 100;
}
// 页面背景样式
.wish-result {
  overflow: hidden;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/image/wishResultBg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  // 返回按钮样式
  .back-btn {
    top: 1.8vh;
    right: 2.5vw;
    position: absolute;
    height: 5.4vh;
    width: 5.4vh;
    background-image: url("../../assets/image/icon-back.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 2.7vh;
    transition: all 0.2s ease;
    &:hover {
      box-shadow: 0 0 10px #fff inset,
        0 0 5px rgba($color: #ffffff, $alpha: 0.7);
    }
    &:active {
      opacity: 0.8;
    }
  }
  // 抽卡物品通用样式 z-index防止背部特效穿模
  .item-box {
    z-index: 11; // test
    position: absolute;
    top: 22vh;
    background-color: rgba($color: #ffffff, $alpha: 0);
    box-sizing: border-box;
    // border: 5px solid #fff inset;
    &:hover {
      transform: scale(1.06);
    }
    // 鼠标移入时背部特效一起放大
    &:hover + .item-box-bg {
      transform: scale(1.06);
    }
    // 抽卡物品图片样式
    .item-image {
      height: 56.8vh;
      width: 7.4vw;
      object-fit: fill;
    }
  }
  // 抽卡物品位置
  .wish-item1 {
    left: 12.55vw;
  }
  .wish-item2 {
    left: 20.05vw;
  }
  .wish-item3 {
    left: 27.55vw;
  }
  .wish-item4 {
    left: 35.05vw;
  }
  .wish-item5 {
    left: 42.55vw;
  }
  .wish-item6 {
    left: 50.05vw;
  }
  .wish-item7 {
    left: 57.55vw;
  }
  .wish-item8 {
    left: 65.05vw;
  }
  .wish-item9 {
    left: 72.55vw;
  }
  .wish-item10 {
    left: 80.05vw;
  }
  // 抽卡物品特效通用样式
  .item-box-bg {
    position: absolute;
    top: 23vh;
    height: 52vh;
    width: 6.8vw;
    div {
      position: absolute;
    }
    .bg1-blue {
      filter: drop-shadow(0 50px 5px #fff) drop-shadow(0 -50px 5px #fff)
        drop-shadow(0 40px 7px #2877ff) drop-shadow(0 -40px 7px #2877ff);
      div {
        top: 2.8vh;
        height: 14vh;
        width: 0.5vw;
        border-top: 18vh solid transparent;
        border-bottom: 18vh solid transparent;
      }
      .bg1-blue-left {
        right: -3.4vw;
        border-right: 0.5vw solid #fff;
        border-left: 0.5vw solid transparent;
      }
      .bg1-blue-right {
        left: 3.4vw;
        border-right: 0.5vw solid transparent;
        border-left: 0.5vw solid #fff;
      }
    }
    .bg2-blue {
      top: 0.8vh;
      height: 54vh;
      width: 6.8vw;
      border-radius: 50%;
      background-color: #fff;
      filter: drop-shadow(0 0 5px #fff) drop-shadow(0 0 7px #2e7bff)
        drop-shadow(0 0 16px #3a82ff);
    }

    .bg-purple {
      filter: drop-shadow(0 0 0.5px rgba(255, 255, 255))
        drop-shadow(0 0 2px rgba(255, 255, 255))
        drop-shadow(0 0 3px rgba(255, 255, 255))
        drop-shadow(0 0 5px rgba(255, 255, 255))
        drop-shadow(0 -5px 5px rgba(187, 143, 253, 0.8))
        drop-shadow(0 5px 5px rgba(187, 143, 253, 0.8))
        drop-shadow(0 -10px 7px rgba(141, 118, 255, 0.6))
        drop-shadow(0 10px 7px rgba(141, 118, 255, 0.6))
        drop-shadow(0 -20px 7px rgba(114, 85, 255, 0.4))
        drop-shadow(0 20px 7px rgba(114, 85, 255, 0.4))
        drop-shadow(0 -20px 7px rgba(95, 63, 255, 0.2))
        drop-shadow(0 20px 7px rgba(95, 63, 255, 0.2))
        drop-shadow(0 -50px 5px rgba(99, 69, 249, 0.2))
        drop-shadow(0 50px 5px rgba(99, 69, 249, 0.2));
      // 锥形
      .bg1-purple {
        div {
          top: -1.8vh;
          height: 47vh;
          width: 0.5vw;
          border-top: 6vh solid transparent;
          border-bottom: 6vh solid transparent;
        }
        .bg1-purple-right {
          left: 3.35vw;
          border-right: 2.5vw solid transparent;
          border-left: 2.5vw solid #fff;
        }
        .bg1-purple-left {
          right: -3.35vw;
          border-right: 2.5vw solid #fff;
          border-left: 2.5vw solid transparent;
        }
      }
      // 尖锐状
      .bg2-purple {
        div {
          top: -2.6vh;
          height: 33.5vh;
          width: 0.5vw;
          border-top: 14vh solid transparent;
          border-bottom: 14vh solid transparent;
        }
        .bg2-purple-right {
          left: 3.35vw;
          border-right: 1vw solid transparent;
          border-left: 1vw solid #fff;
        }
        .bg2-purple-left {
          right: -3.35vw;
          border-right: 1vw solid #fff;
          border-left: 1vw solid transparent;
        }
      }
      // 椭圆状
      .bg3-purple {
        top: 0.8vh;
        height: 54vh;
        width: 6.8vw;
        border-radius: 50%;
        background-color: #fff;
      }
    }
    // 垂直的纤细白色光影
    .bg-purple-vertical {
      filter: drop-shadow(0 0 0.5px rgba(255, 255, 255))
        drop-shadow(0 0 1px rgba(255, 255, 255))
        drop-shadow(0 0 2px rgba(255, 255, 255))
        drop-shadow(0 -30px 3px rgba(255, 255, 255, 0.7))
        drop-shadow(0 30px 3px rgba(255, 255, 255, 0.7))
        drop-shadow(0 -40px 3px rgba(255, 255, 255, 0.5))
        drop-shadow(0 40px 3px rgba(255, 255, 255, 0.5))
        drop-shadow(0 -100px 5px rgba(95, 63, 255, 0.3))
        drop-shadow(0 100px 5px rgba(95, 63, 255, 0.3));
      div {
        top: -2.5vh;
        height: 33.5vh;
        width: 0.5vw;
        border-top: 14vh solid transparent;
        border-bottom: 14vh solid transparent;
      }
      .bg-purple-vertical-right {
        left: 3.35vw;
        border-right: 0.5vw solid transparent;
        border-left: 0.5vw solid rgba(255, 255, 255, 0.1);
      }
      .bg-purple-vertical-left {
        right: -3.35vw;
        border-right: 0.5vw solid rgba(255, 255, 255, 0.1);
        border-left: 0.5vw solid transparent;
      }
    }
    // 背景特效-粒子
    .purple-particle {
      height: 100%;
      width: 100%;
      div {
        color: rgba(255, 255, 255, 0);
      }
      .purple-star-up-1 {
        top: -8.25vh;
        left: 0.8vw;
        font-size: 1em;
        text-shadow: 0 0 2px rgba(255, 255, 255, 0.9);
      }
      .purple-point-up-1 {
        top: -6.5vh;
        left: 2.8vw;
        font-size: 1.5em;
        text-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
      }
      .purple-star-up-2 {
        top: -4.5vh;
        left: 4.6vw;
        font-size: 1em;
        text-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
      }
      .purple-star-up-3 {
        top: 0.5vh;
        left: 5.8vw;
        font-size: 0.2em;
        text-shadow: 0 0 2px rgba(255, 255, 255, 1);
      }
      .purple-cusp-up-1 {
        top: 0vh;
        left: 0.43vw;
        height: 16px;
        width: 14px;
        background-color: rgba(255, 255, 255, 0.7);
        transform: rotate(45deg) skew(36deg, 37deg);
        filter: drop-shadow(3px 0 2px #fff) drop-shadow(-3px 0 2px #fff);
      }
      .purple-cusp-up-2 {
        top: 0.6vh;
        left: 1.9vw;
        height: 16px;
        width: 14px;
        background-color: rgba(255, 255, 255, 0.7);
        transform: rotate(45deg) skew(36deg, 37deg);
        filter: drop-shadow(3px 0 2px #fff) drop-shadow(-3px 0 2px #fff);
      }
      .purple-cusp-up-3 {
        top: -3.53vh;
        left: 5.74vw;
        height: 8px;
        width: 8px;
        background-color: rgba(255, 255, 255, 0.7);
        transform: rotate(45deg) skew(40deg, 40deg);
      }
      .purple-star-down-1 {
        bottom: -6.5vh;
        left: 1.5vw;
        font-size: 0.1em;
        text-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
      }
      .purple-point-down-1 {
        bottom: -8vh;
        left: 5.4vw;
        font-size: 1.3em;
        text-shadow: 0 0 1px rgba(255, 255, 255, 0.8);
      }
      .purple-star-down-2 {
        bottom: -0.4vh;
        left: 6vw;
        font-size: 0.8em;
        text-shadow: 0 0 1px rgba(255, 255, 255, 0.8);
      }
      .purple-cusp-down-1 {
        bottom: -0.5vh;
        left: 1vw;
        height: 16px;
        width: 14px;
        background-color: rgba(255, 255, 255, 0.7);
        transform: rotate(45deg) skew(36deg, 37deg);
        filter: drop-shadow(3px 0 1px #fff) drop-shadow(-3px 0 1px #fff);
      }
      .purple-cusp-down-2 {
        bottom: -5.3vh;
        left: 5.2vw;
        height: 8px;
        width: 8px;
        background-color: rgba(255, 255, 255, 0.7);
        transform: rotate(45deg) skew(40deg, 40deg);
      }
    }

    .bg-king {
      filter: drop-shadow(0 0 0.5px rgb(255, 253, 225))
        drop-shadow(0 0 2px rgb(255, 253, 225))
        drop-shadow(0 0 3px rgb(255, 251, 200))
        drop-shadow(0 0 5px rgb(255, 251, 200))
        drop-shadow(0 -5px 5px rgb(255, 224, 100))
        drop-shadow(0 5px 5px rgb(255, 224, 100))
        drop-shadow(0 0 10px rgb(255, 173, 85))
        drop-shadow(0 -10px 5px rgba(191, 131, 65, 0.6))
        drop-shadow(0 10px 5px rgba(191, 131, 65, 0.6))
        drop-shadow(0 -30px 10px rgba(232, 170, 104, 0.2))
        drop-shadow(0 30px 10px rgba(232, 170, 104, 0.2))
        drop-shadow(0 -70px 15px rgba(255, 174, 87, 0.2))
        drop-shadow(0 70px 15px rgba(255, 174, 87, 0.2));
      // 锥形
      .bg1-king {
        div {
          top: -3.6vh;
          height: 44vh;
          width: 0.5vw;
          border-top: 9vh solid transparent;
          border-bottom: 9vh solid transparent;
        }
        .bg1-king-right {
          left: 3.35vw;
          border-right: 2.5vw solid transparent;
          border-left: 2.5vw solid rgb(255, 253, 235);
        }
        .bg1-king-left {
          right: -3.35vw;
          border-right: 2.5vw solid rgb(255, 253, 235);
          border-left: 2.5vw solid transparent;
        }
      }
      // 椭圆状
      .bg2-king {
        top: 0.8vh;
        height: 54vh;
        width: 6.8vw;
        border-radius: 50%;
        background-color: #fff;
      }
    }
    // 垂直的纤细白色光影
    .bg-king-vertical {
      filter: drop-shadow(0 0 0.5px rgba(255, 255, 255))
        drop-shadow(0 0 2px rgb(255, 253, 225))
        drop-shadow(0 0 3px rgb(255, 251, 200))
        drop-shadow(0 -30px 5px rgba(255, 181, 77, 0.5))
        drop-shadow(0 30px 5px rgba(255, 181, 77, 0.5))
        drop-shadow(0 -40px 5px rgba(255, 183, 100, 0.3))
        drop-shadow(0 40px 5px rgba(255, 183, 100, 0.3))
        drop-shadow(0 -100px 5px rgba(191, 104, 65, 0.2))
        drop-shadow(0 100px 5px rgba(191, 104, 65, 0.2));
      div {
        top: -4.5vh;
        height: 56.5vh;
        width: 0.5vw;
        border-top: 4vh solid transparent;
        border-bottom: 4vh solid transparent;
      }
      .bg-king-vertical-right {
        left: 3.4vw;
        border-right: 0.5vw solid transparent;
        border-left: 0.5vw solid rgba(255, 255, 255, 0.8);
      }
      .bg-king-vertical-left {
        right: -3.4vw;
        border-right: 0.5vw solid rgba(255, 255, 255, 0.8);
        border-left: 0.5vw solid transparent;
      }
    }
    // 背景特效-粒子
    .king-particle {
      height: 100%;
      width: 100%;
      div {
        color: rgba(255, 255, 255, 0);
      }
      .king-star-up-1 {
        top: 1.85vh;
        left: 0.4vw;
        font-size: 0.8em;
        text-shadow: 0 0 3px rgba(255, 255, 255, 1);
      }
      .king-star-up-2 {
        top: -10.7vh;
        left: 0.8vw;
        font-size: 1em;
        text-shadow: 0 0 3px rgba(255, 255, 255, 1);
      }
      .king-star-up-3 {
        top: -3.55vh;
        left: 0.9vw;
        font-size: 1.3em;
        text-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
      }
      .king-star-up-4 {
        top: -6.5vh;
        left: 1.2vw;
        font-size: 0.9em;
        text-shadow: 0 0 2px rgba(255, 255, 255, 1);
      }
      .king-star-up-5 {
        top: -5.1vh;
        left: 3.6vw;
        font-size: 2.7em;
        text-shadow: 0 0 2px rgba(255, 255, 255, 1);
      }
      .king-point-up-1 {
        top: 0vh;
        left: -0.3vw;
        font-size: 1.2em;
        text-shadow: 0 0 1px rgba(255, 255, 255, 0.8);
      }
      .king-point-up-2 {
        top: -10.4vh;
        left: 0.3vw;
        font-size: 1.2em;
        text-shadow: 0 0 1px rgba(255, 255, 255, 0.8);
      }
      .king-point-up-3 {
        top: -7.5vh;
        left: 0.5vw;
        font-size: 2em;
        text-shadow: 0 0 2px rgba(255, 255, 255, 1);
      }
      .king-point-up-4 {
        top: -12vh;
        left: 3.5vw;
        font-size: 2em;
        text-shadow: 0 0 2px rgba(255, 255, 255, 1);
      }
      .king-point-up-5 {
        top: -12.2vh;
        left: 4.4vw;
        font-size: 1.5em;
        text-shadow: 0 0 2px rgba(255, 255, 255, 1);
      }
      .king-point-up-6 {
        top: -9vh;
        left: 4.8vw;
        font-size: 1.3em;
        text-shadow: 0 0 1px rgba(255, 255, 255, 1);
      }
      .king-point-up-7 {
        top: -7vh;
        left: 4.9vw;
        font-size: 2em;
        text-shadow: 0 0 2px rgba(255, 255, 255, 1);
      }
      .king-point-up-8 {
        top: -11.7vh;
        left: 5.2vw;
        font-size: 2.3em;
        text-shadow: 0 0 2px rgba(255, 255, 255, 1);
      }
      .king-point-up-9 {
        top: -3.2vh;
        left: 6vw;
        font-size: 1.7em;
        text-shadow: 0 0 1px rgba(255, 255, 255, 0.8);
      }
      .king-cusp-up-1 {
        top: -1.5vh;
        left: 0.32vw;
        height: 6px;
        width: 6px;
        background-color: rgba(255, 243, 197, 0.7);
        transform: rotate(45deg) skew(38deg, 38deg);
        filter: drop-shadow(2px -2px 1px #fff) drop-shadow(-2px 2px 1px #fff);
      }
      .king-cusp-up-2 {
        top: -17vh;
        left: 2vw;
        height: 6px;
        width: 6px;
        background-color: rgba(255, 241, 187, 0.7);
        transform: rotate(45deg) skew(40deg, 40deg);
        filter: drop-shadow(2px -2px 1px #fff) drop-shadow(-2px 2px 1px #fff);
      }
      .king-star-down-1 {
        bottom: -1vh;
        left: 0.7vw;
        font-size: 0.8em;
        text-shadow: 0 0 3px rgba(255, 255, 255, 1);
      }
      .king-star-down-2 {
        bottom: -4vh;
        left: 0.9vw;
        font-size: 1em;
        text-shadow: 0 0 1px rgba(255, 255, 255, 1);
      }
      .king-star-down-3 {
        bottom: -12.05vh;
        left: 1vw;
        font-size: 1em;
        text-shadow: 0 0 3px rgba(255, 251, 227, 1);
      }
      .king-star-down-4 {
        bottom: -5.2vh;
        left: 1.5vw;
        font-size: 1em;
        text-shadow: 0 0 2px rgba(255, 255, 255, 1);
      }
      .king-star-down-5 {
        bottom: -3.4vh;
        left: 5.35vw;
        font-size: 1.1em;
        text-shadow: 0 0 2px rgba(255, 255, 255, 1);
      }
      .king-point-down-1 {
        bottom: -9vh;
        left: 0.2vw;
        font-size: 2em;
        text-shadow: 0 0 2px rgb(255, 241, 210);
      }
      .king-point-down-2 {
        bottom: -10.05vh;
        left: 0.9vw;
        font-size: 1.8em;
        text-shadow: 0 0 2px rgba(255, 255, 255, 1);
      }
      .king-point-down-3 {
        bottom: -9.65vh;
        left: 1.5vw;
        font-size: 2em;
        text-shadow: 0 0 1.5px rgb(255, 246, 202);
      }
      .king-point-down-4 {
        bottom: -14vh;
        left: 3.5vw;
        font-size: 2em;
        text-shadow: 0 0 2px rgba(255, 255, 255, 1);
      }
      .king-point-down-5 {
        bottom: -13.2vh;
        left: 5.1vw;
        font-size: 2em;
        text-shadow: 0 0 1.5px rgba(255, 255, 255, 1);
      }
      .king-point-down-6 {
        bottom: -7vh;
        left: 4.9vw;
        font-size: 2em;
        text-shadow: 0 0 2px rgba(255, 255, 255, 1);
      }
      .king-point-down-7 {
        bottom: -6.05vh;
        left: 6vw;
        font-size: 1.3em;
        text-shadow: 0 0 2px rgba(255, 255, 255, 1);
      }
      .king-cusp-down-1 {
        bottom: -6.3vh;
        left: 0.7vw;
        height: 10px;
        width: 10px;
        background-color: rgba(255, 237, 163, 0.7);
        transform: rotate(45deg) skew(40deg, 40deg);
        filter: drop-shadow(2px -2px 1px rgb(255, 255, 255))
          drop-shadow(-2px 2px 1px rgb(255, 255, 255));
      }
      .king-cusp-down-2 {
        bottom: -4.3vh;
        left: 4vw;
        height: 8px;
        width: 8px;
        background-color: rgb(255, 247, 215);
        transform: rotate(45deg) skew(40deg, 40deg);
        filter: drop-shadow(2px -2px 1px rgb(255, 250, 208))
          drop-shadow(-2px 2px 1px rgb(255, 250, 208));
      }
    }
  }
  // 抽卡物品特效位置和颜色 z-index设置左侧（星级高）的物品颜色在上层
  .wish-item-bg1 {
    z-index: 10;
  }
  .wish-item-bg2 {
    z-index: 9;
  }
  .wish-item-bg3 {
    z-index: 8;
  }
  .wish-item-bg4 {
    z-index: 7;
  }
  .wish-item-bg5 {
    z-index: 6;
  }
  .wish-item-bg6 {
    z-index: 5;
  }
  .wish-item-bg7 {
    z-index: 4;
  }
  .wish-item-bg8 {
    z-index: 3;
  }
  .wish-item-bg9 {
    z-index: 2;
  }
  .wish-item-bg10 {
    z-index: 1;
  }
}
/** vue transition标签渐入渐出样式 start */
// 进入页面时渐入
.wish-result-enter-from {
  opacity: 0;
}
.wish-result-enter-active {
  transition: opacity 0.9s ease;
}
// 物品载入渐入
.wish-item1-enter-from,
.wish-item2-enter-from,
.wish-item3-enter-from,
.wish-item4-enter-from,
.wish-item5-enter-from,
.wish-item6-enter-from,
.wish-item7-enter-from,
.wish-item8-enter-from,
.wish-item9-enter-from,
.wish-item10-enter-from {
  opacity: 0;
  transform: translate(30vw);
}
.wish-item1-enter-active {
  transition: all 0.6s ease-out;
}
.wish-item2-enter-active {
  transition: all 0.6s ease-out 0.07s;
}
.wish-item3-enter-active {
  transition: all 0.6s ease-out 0.14s;
}
.wish-item4-enter-active {
  transition: all 0.6s ease-out 0.21s;
}
.wish-item5-enter-active {
  transition: all 0.6s ease-out 0.28s;
}
.wish-item6-enter-active {
  transition: all 0.6s ease-out 0.35s;
}
.wish-item7-enter-active {
  transition: all 0.6s ease-out 0.42s;
}
.wish-item8-enter-active {
  transition: all 0.6s ease-out 0.49s;
}
.wish-item9-enter-active {
  transition: all 0.6s ease-out 0.56s;
}
.wish-item10-enter-active {
  transition: all 0.6s ease-out 0.63s;
}

.wish-item-bg1-enter-from,
.wish-item-bg2-enter-from,
.wish-item-bg3-enter-from,
.wish-item-bg4-enter-from,
.wish-item-bg5-enter-from,
.wish-item-bg6-enter-from,
.wish-item-bg7-enter-from,
.wish-item-bg8-enter-from,
.wish-item-bg9-enter-from,
.wish-item-bg10-enter-from {
  opacity: 0;
  // transform: translate(1vw);
}
.wish-item-bg1-enter-active {
  transition: opacity 0.2s ease-out 0.5s;
  // transition: 0.6s ease-out;
}
.wish-item-bg2-enter-active {
  transition: opacity 0.2s ease-out 0.57s;
}
.wish-item-bg3-enter-active {
  transition: opacity 0.2s ease-out 0.64s;
}
.wish-item-bg4-enter-active {
  transition: opacity 0.2s ease-out 0.71s;
}
.wish-item-bg5-enter-active {
  transition: opacity 0.2s ease-out 0.78s;
}
.wish-item-bg6-enter-active {
  transition: opacity 0.2s ease-out 0.85s;
}
.wish-item-bg7-enter-active {
  transition: opacity 0.2s ease-out 0.92s;
}
.wish-item-bg8-enter-active {
  transition: opacity 0.2s ease-out 0.99s;
}
.wish-item-bg9-enter-active {
  transition: opacity 0.2s ease-out 1.06s;
}
.wish-item-bg10-enter-active {
  transition: opacity 0.2s ease-out 1.13s;
}
/** vue transition标签渐入渐出样式 end */
</style>
