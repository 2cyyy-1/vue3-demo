<template>
  <div class="go-wish" id="go-wish">
    <video class="wish-video" id="wish-video" autoplay>
      <source :src="videoSrc" type="video/mp4" />
      <source src="../../assets/image/10k.png" type="video/png" />
      您的设备或浏览器暂不支持抽卡动画T^T
    </video>
    <transition name="skip">
      <div class="skip" v-if="skipShow" @click="skip()">跳过</div>
    </transition>
    <div class="shelter">累计已抽：{{ all }}抽</div>
  </div>
  <!-- 点击跳过过渡界面 -->
  <div class="mask" v-if="maskShow"></div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import store from "@/store";

export default {
  name: "GoWishView",
  setup() {
    const router = useRouter();
    const route = useRoute();

    let data = reactive({
      video: null,
      maskShow: false,
      skipShow: false,
      dblclickCount: 0,
      videoSrc: null,
      all: 0,
    });
    switch (store.state.type) {
      case 1:
      case 2:
        data.all = store.state.info.up.all;
        break;
      case 3:
        data.all = store.state.info.arms.all;
        break;
      case 4:
        data.all = store.state.info.permanent.all;
        break;
    }
    data.videoSrc = require("../../assets/video/" + route.query.video + ".mp4");
    // console.log(route.query.video);

    //跳过动画
    const skip = () => {
      // console.log("跳过");
      data.video.currentTime = 7000; // 设置当前已播放时间
      data.maskShow = true; // 设置过渡界面
    };

    onMounted(() => {
      data.video = document.getElementById("wish-video");

      data.video.addEventListener(
        "ended",
        function () {
          //结束
          // console.log("播放结束");
          setTimeout(() => {
            router.push({ path: "/wishResult" });
          }, 300);
        },
        false
      );
      // 鼠标点击唤起跳过按钮 双击后单击（连续三次点击）后直接跳过
      setTimeout(() => {
        //鼠标弹起事件
        document.getElementById("go-wish").onmouseup = () => {
          data.skipShow = true;
          if (data.dblclickCount > 0) {
            skip();
          }
        };
        //鼠标双击事件
        document.getElementById("go-wish").ondblclick = () => {
          data.dblclickCount += 1;
        };
      }, 1000); // 动画至少1s
    });

    return {
      ...toRefs(data),
      skip,
    };
  },
};
</script>

<style scoped lang="scss">
//跳过时离开遮罩
.mask {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
}
//动画整体样式
.go-wish {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  //右上角跳过按钮
  .skip {
    position: absolute;
    right: 2vw;
    top: 2vh;
    height: 4vh;
    line-height: 4.1vh;
    width: 4vw;
    color: #ffffff;
    text-shadow: 0 0 2px #000;
    letter-spacing: 0.1em;
    font-size: 1.2em;
    // 字体超出隐藏 分辨率适配
    overflow: hidden;
    text-overflow: clip;
  }
  //视频样式
  .wish-video {
    height: 100vh;
    width: 100vw;
    object-fit: fill;
  }
  //右下角覆盖物样式
  .shelter {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 3vh;
    line-height: 3.1vh;
    width: 13vw;
    background-color: #c4c0b7;
    border-radius: 5px 5px 0 0;
    color: #ffffff;
    font-size: 1em;
    // 字体超出隐藏 分辨率适配
    overflow: hidden;
    text-overflow: clip;
  }
}
/** vue transition标签渐入渐出样式 start */
// 跳过按钮渐入
.skip-enter-from {
  opacity: 0;
}
.skip-enter-active {
  transition: all 0.3s ease;
}
/** vue transition标签渐入渐出样式 end */
</style>
