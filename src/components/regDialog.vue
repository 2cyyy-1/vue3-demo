<template>
  <transition-group name="reg-dialog">
    <div v-if="regDialog" class="reg-dialog" @click.self="closeDialog()"></div>
    <div
      v-if="regDialog"
      :class="realRegulation === false ? 'reg-box' : 'reg-box reg-bg'"
    >
      <!-- <div v-if="regDialog" class="reg-box reg-bg"> -->
      <!-- close -->
      <div class="close" @click.self="closeDialog()"></div>
      <!-- text -->
      <div class="reg-text-box-shadow1"></div>
      <div class="reg-text-box">
        <div class="wb1"></div>
        <div><div class="text1">」</div>神铸定轨<div class="text2">」</div>是本期<div class="text1">」</div>神铸赋形<div class="text2">」</div>所特有的祈愿机制<span class="font-hywh85w">:</span></div>
        <div> <span class="font-hywh85w">·</span>对期望的5星UP武器进行定轨后<span class="comma">,</span>当通过祈愿在本期<div class="text1">」</div>神铸赋形<div class="text2">」</div>中<span class="orange">获取非定轨的5星武器时<span class="comma">,</span>将获得1点命定值</span>。</div>
        <div> <span class="font-hywh85w">·</span>命定值充满后<span class="comma">,</span>在本期<div class="text1"></div>神铸赋形<div class="text2">」</div>中祈愿获得的下一件5星武器将会是通过<div class="text1">」</div>神铸定轨<div class="text2">」</div>选定的武器。</div>
        <div> <span class="font-hywh85w">·</span>在本期<div class="text1">」</div>神铸赋形<div class="text2">」</div>中祈愿<span class="orange">获得<div class="text1">」</div>神铸定轨<div class="text2">」</div>的武器时<span class="comma">,</span>已积累的命定值将会清除</span>。</div>
        <div> <span class="font-hywh85w">·</span>未通过<div class="text1">」</div>神铸定轨<div class="text2">」</div>定轨武器时<span class="comma">,</span>祈愿将不会累积命定值。</div>
        <div> <span class="font-hywh85w">·</span>武器的定轨状态可以进行更换<span class="comma">,</span>也可以取消定轨。 <span class="orange">更换或取消时<span class="comma">,</span>会清除已积累的命定值</span>。</div>
        <div> <span class="font-hywh85w">·</span><span class="orange">本期<div class="text1">」</div>神铸赋形<div class="text2">」</div>结束时<span class="comma">,</span>已积累的命定值也将清除</span>。</div>
        <div class="wb2"></div>
      </div>
      <div class="reg-text-box-shadow2"></div>
      <transition-group name="box" appear>
        <!-- 未定规 -->

        <!-- item -->
        <div
          v-if="realRegulation === false"
          class="item item-left"
          @click="selectReg(0)"
        >
          <img class="item-left" src="@/assets/image/regArms/left.png" />
          <div class="item-border"></div>
          <div v-if="regulation === 0" class="select-border">
            <div class="select-icon-box">
              <img src="@/assets/image/armsSelectIcon.png" />
            </div>
          </div>
        </div>
        <div
          v-if="realRegulation === false"
          class="item item-right"
          @click="selectReg(1)"
        >
          <img class="item-right" src="@/assets/image/regArms/right.png" />
          <div class="item-border"></div>
          <div v-if="regulation === 1" class="select-border">
            <div class="select-icon-box">
              <img src="@/assets/image/armsSelectIcon.png" />
            </div>
          </div>
        </div>
        <!-- tips -->
        <div v-if="armsName && realRegulation === false" class="tips">
          为<span class="orange1">{{ armsName }}</span
          >定轨
        </div>
        <!-- btn -->
        <div v-if="realRegulation === false" class="reg-btn" @click="orbit()">
          <img src="@/assets/image/icon-reg.png" />
          <span>定轨</span>
          <div class="reg-btn-shadow"></div>
          <div class="reg-btn-border"></div>
        </div>

        <!-- 已定规 -->

        <!-- item -->
        <div v-if="realRegulation !== false" class="item item-middle">
          <img
            v-if="realRegulation === 0"
            class="item-middle"
            src="@/assets/image/regArms/left.png"
          />
          <img
            v-if="realRegulation === 1"
            class="item-middle"
            src="@/assets/image/regArms/right.png"
          />
          <div class="item-border"></div>
        </div>
        <!-- tips -->
        <div v-if="realRegulation !== false" class="tips tips-already">
          命定值<span class="font-hywh85w">:</span>&thinsp;&thinsp;<span
            class="orange1"
            >{{ regCount }}</span
          >/2
        </div>
        <!-- btn -->
        <div
          v-if="realRegulation !== false"
          class="reg-btn"
          @click="cancelOrbit()"
        >
          <img src="@/assets/image/icon-reg-cancel.png" />
          <span>取消定轨</span>
          <div class="reg-btn-shadow"></div>
          <div class="reg-btn-border"></div>
        </div>
      </transition-group>
    </div>
  </transition-group>
</template>

<script>
import { reactive, toRefs } from "vue";
import pool from "@/assets/library/poolData.js";
import store from "@/store";

export default {
  name: "RegDialog",
  emits: ["closeDialog", "orbit", "cancelOrbit"],
  props: {
    regDialog: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    let data = reactive({
      realRegulation: store.state.reg.regulation,
      regCount: store.state.reg.count,
      regulation: 0,
      armsName: pool.armsPool.star5.up[0],
    });
    // 关闭dialog
    const closeDialog = () => {
      context.emit("closeDialog");
    };
    // 选择定轨武器
    const selectReg = (reg) => {
      data.regulation = reg;
      data.armsName = pool.armsPool.star5.up[reg];
    };
    // 定轨
    const orbit = () => {
      store.commit("setRegulation", data.regulation);
      data.realRegulation = store.state.reg.regulation; // 更新当前页面状态
      context.emit("orbit"); // 通知祈愿页面更新数据
    };
    // 取消定轨
    const cancelOrbit = () => {
      store.commit("setRegulation", false);
      store.commit("setRegCount", 0);
      data.realRegulation = store.state.reg.regulation; // 更新当前页面状态
      context.emit("cancelOrbit"); // 通知祈愿页面更新数据
    };
    return {
      ...toRefs(data),
      closeDialog,
      selectReg,
      orbit,
      cancelOrbit,
    };
  },
};
</script>

<style scoped lang="scss">
// 遮罩
.reg-dialog {
  z-index: 1000;
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
}
// 定轨背景-已定轨
.reg-bg {
  background-image: url("@/assets/image/regulationBg2.png") !important;
}
// 定轨菜单
.reg-box {
  z-index: 1001;
  position: absolute;
  top: 16.26vh;
  left: 18.86vw;
  width: 62.44vw;
  height: 67.2vh;
  background-image: url("@/assets/image/regulationBg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  // 关闭按钮
  .close {
    position: absolute;
    top: 3.16vh;
    right: 2.15vw;
    height: 3.42vh;
    width: 1.94vw;
    background-image: url("@/assets/image/icon-close.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    &:hover {
      filter: brightness(0.75);
    }
  }
  // 左侧文字部分 上方阴影
  .reg-text-box-shadow1 {
    position: absolute;
    top: 12vh;
    left: 4.5vw;
    height: 10px;
    width: 22.6vw;
    background-image: linear-gradient(rgb(224, 220, 213), rgba(0, 0, 0, 0));
    border-radius: 4px 4px 0 0;
  }
  // 左侧文字部分 下方阴影
  .reg-text-box-shadow2 {
    position: absolute;
    top: calc(60.3vh - 10px);
    left: 4.5vw;
    height: 10px;
    width: 22.6vw;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgb(224, 220, 213));
  }
  // 左侧文字部分
  .reg-text-box {
    margin: 12vh 0 0 4.5vw;
    height: 48.3vh;
    width: 22.6vw;
    padding-right: 0.5vw;
    line-height: 1.46em;
    overflow-y: scroll;
    text-align: left;
    font-size: 1.2em;
    color: #ab917d;
    // 文字box上方留白
    .wb1 {
      width: 100%;
      height: 0.8vh;
    }
    // 文字box下方留白
    .wb2 {
      width: 100%;
      height: 1.77vh;
    }
  }
  // 定轨武器选择
  .item {
    position: absolute;
    top: 20.39vh;
    width: 6.65vw;
    height: 14.27vh;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    filter: drop-shadow(0 0 3px rgb(180, 180, 180));
    transition: all 0.1s ease-out;
    &:hover {
      transform: scale(1.05);
    }
    &:hover img {
      filter: contrast(1.2) brightness(0.9);
    }
    // 鼠标移入border
    .item-border {
      top: 0.1vh;
      left: 0.1vw;
      position: absolute;
      width: 6.45vw;
      height: 13.85vh;
      border-radius: 6px;
      border: 0.01rem solid rgba(255, 255, 255, 0);
      transition: all 0.1s ease-out;
    }
    &:hover .item-border {
      transform: translateX(-0.18rem) translateY(-0.18rem);
      border: 0.19rem solid #fff;
    }
    &:active {
      transform: scale(1);
    }
    // 武器选中border
    .select-border {
      top: -0.3vh;
      left: 0.05vw;
      position: absolute;
      width: 6.55vw;
      height: 13.85vh;
      border-radius: 6px;
      border-top: 0.25rem solid rgb(192, 255, 64);
      border-bottom: 0.25rem solid rgb(192, 255, 64);
      transition: all 0.1s ease-out;
      .select-icon-box {
        position: absolute;
        top: -0.1vh;
        right: 0;
        width: 1.53vw;
        height: 2.33vh;
        border-radius: 0 4px 0 5px;
        background-color: rgb(192, 255, 64);
        img {
          margin-top: 0.1vh;
          width: 75%;
        }
      }
    }
  }
  // 武器位置左
  .item-left {
    left: 39.1vw;
    width: 6.65vw;
    height: 14.27vh;
  }
  // 武器位置右
  .item-right {
    left: 47.75vw;
    width: 6.65vw;
    height: 14.27vh;
  }
  // 武器位置中间-已定轨
  .item-middle {
    top: 21vh;
    left: 43.43vw;
    width: 6.7vw;
    height: 14.22vh;
    filter: drop-shadow(0 0 2px rgba(180, 180, 180, 0.2)) !important;
  }
  // 提示信息
  .tips {
    position: absolute;
    top: 43.3vh;
    left: 39.1vw;
    width: 15.3vw;
    font-size: 1.4em;
  }
  // 提示信息-已定轨
  .tips-already {
    top: 49.95vh;
  }
  // 确认按钮
  .reg-btn {
    position: absolute;
    top: 55.2vh;
    left: 38vw;
    width: 18.75vw;
    height: 5.95vh;
    border-radius: 5vh;
    background-color: #4a5366;
    filter: drop-shadow(0 0 3px #aaa);
    line-height: 5.95vh;
    font-size: 1.4em;
    color: #e8e2d5;
    .reg-btn-shadow {
      transition: all 0.2s ease-out;
    }
    &:active {
      filter: invert(0.65) brightness(1.8) sepia(0.7);
    }
    &:active .reg-btn-shadow {
      position: absolute;
      top: 0;
      width: 18.75vw;
      height: 5.95vh;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 5vh;
    }
    .reg-btn-border {
      position: absolute;
      top: -0.05vh;
      left: -0.05vw;
      width: 18.85vw;
      height: 6.05vh;
      border-radius: 5vh;
      border: 3px solid rgba(255, 255, 255, 0);
      box-sizing: border-box;
      transition: all 0.2s ease-out;
    }
    &:hover .reg-btn-border {
      border: 3px solid #ffe6b2;
    }
    img {
      position: absolute;
      top: 0.92vh;
      left: 0.5vw;
      height: 4.08vh;
    }
    &:active img {
      filter: invert(0.65) brightness(1.7);
    }
    span {
      padding-left: 1.8vw;
    }
  }
}
//滚动条
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background: rgb(232, 230, 227);
    border: 1px solid rgb(244, 244, 244);
    // box-shadow:  0px 0px 1px #777;
  }
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 1px #9e9c96;
    border-radius: 10px;
    background: #c8c5be;
    border: 1px solid #e0dcd5;
  }
  ::-webkit-scrollbar-button {
    /*滚动条两端的按钮*/
    height: 15px;
  }
/** vue transition标签渐入渐出样式 start */
// 定规dialog显示
.reg-dialog-enter-from {
  opacity: 0;
}
.reg-dialog-enter-active {
  transition: all 0.2s ease-out;
}
.reg-dialog-leave-active {
  transition: all 0.2s ease-out;
}
.reg-dialog-leave-to {
  opacity: 0;
}
// 定规dialog显示
.box-enter-from {
  opacity: 0;
}
.box-enter-active {
  transition: all 0.3s ease-out;
}
.box-leave-active {
  transition: all 0.3s ease-out;
}
.box-leave-to {
  opacity: 0;
}
/** vue transition标签渐入渐出样式 end */
</style>
