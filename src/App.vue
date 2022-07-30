<template>
  <router-view />
</template>

<script>
import store from "@/store";
import { getCurrentInstance } from "vue";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    // 从本地仓储恢复数据
    let storeData = {
      recentList: [],
      info: {
        up: {},
        arms: {},
        permanent: {},
      },
      reg: {},
    };
    if (localStorage.getItem("list")) {
      storeData["recentList"] = JSON.parse(localStorage.getItem("list"));
      // console.log("恢复list");
    }
    if (localStorage.getItem("upInfo")) {
      storeData["info"]["up"] = JSON.parse(localStorage.getItem("upInfo"));
      // console.log("恢复upInfo");
    }
    if (localStorage.getItem("armsInfo")) {
      storeData["info"]["arms"] = JSON.parse(localStorage.getItem("armsInfo"));
      // console.log("恢复armsInfo");
    }
    if (localStorage.getItem("permanentInfo")) {
      storeData["info"]["permanent"] = JSON.parse(
        localStorage.getItem("permanentInfo")
      );
      // console.log("恢复permanentInfo");
    }
    if (localStorage.getItem("reg")) {
      storeData["reg"] = JSON.parse(localStorage.getItem("reg"));
      // console.log("恢复reg");
    }
    // console.log(storeData);
    store.replaceState(Object.assign({},  JSON.parse(JSON.stringify(store.state), storeData)));
    // 本地仓储溢出
    if (window.localStorage) {
      var aa =
        1024 * 1024 * 5 -
        unescape(encodeURIComponent(JSON.stringify(localStorage))).length;
      console.log(aa);
      if (aa < 1024) {
        alert("存储空间已满，点击确定清除抽卡数据");
        localStorage.clear();
      }
    }
    //禁用右键
    document.oncontextmenu = function () {
      return false;
    };
    //禁用选中
    document.onselectstart = function () {
      return false;
    };
    //更改光标样式
    let cursor = require("@/assets/image/cursor.png");
    let body = document.querySelector("body");
    body.style.cursor = `url(${cursor}), auto`;
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("STORE")) {
      console.log("在页面加载时读取sessionStorage里的状态信息");
      store.replaceState(
        Object.assign(
          {},
          store.state,
          JSON.parse(sessionStorage.getItem("STORE"))
        )
      );
      sessionStorage.removeItem("STORE");
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // beforeunload事件在页面刷新时先触发
    window.addEventListener("beforeunload", () => {
      console.log("页面即将刷新");
      sessionStorage.setItem("STORE", JSON.stringify(store.state));
    });
    // proxy.$messageBox.alert(
    //   "<h2>欢迎使用2cyyy原神抽卡模拟器！</h2><br/><p>本软件仅供学习交流，如作他用所承受的法律责任一概与作者无关</p>",
    //   {
    //     dangerouslyUseHTMLString: true,
    //     showClose: false,
    //     confirmButtonText: "我知道了",
    //     closeOnClickModal: true
    //   }
    // );
  },
};
</script>

<style lang="scss">
#app {
  font-family: "hk4e_zh-cn", "HYWH85W", Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #515a68;
}
</style>
