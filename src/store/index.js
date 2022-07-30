import { createStore } from 'vuex'
let INIT_STORE = {
  type: 1,// 最近选择的卡池
  recentList: [], // 最近抽卡的数据
  info: {
    up: {
      all: 0, // 抽卡总数
      up4: true, // 上次四星: true.中, false.歪
      up5: true, // 上次五星: true.中, false.歪
      c4: 0, // 累计count4抽未抽出四星
      c5: 0, // 累计count5抽未抽出五星
      n4: 0, // 累计抽出四星数
      n5: 0, // 累计抽出五星数
      allList: [] // 抽卡总数据
    },
    arms: {
      all: 0,
      up4: true,
      up5: true,
      c4: 0,
      c5: 0,
      n4: 0,
      n5: 0,
      allList: []
    },
    permanent: {
      all: 0,
      c4: 0,
      c5: 0,
      n4: 0,
      n5: 0,
      allList: []
    }
  },
  reg: {
    regulation: false, // 定规情况: false.未定规, 0.第一把武器，1.第二把武器
    count: 0 //累计count次金不是定轨武器
  }
}
export default createStore({
  state: INIT_STORE,
  mutations: {
    setInitialization(state) { // eslint-disable-next-line
      state.type = 1;
      state.recentList = [];
      state.info = {
        up: {
          all: 0, // 抽卡总数
          up4: true, // 上次四星: true.中, false.歪
          up5: true, // 上次五星: true.中, false.歪
          c4: 0, // 累计count4抽未抽出四星
          c5: 0, // 累计count5抽未抽出五星
          n4: 0, // 累计抽出四星数
          n5: 0, // 累计抽出五星数
          allList: [] // 抽卡总数据
        },
        arms: {
          all: 0,
          up4: true,
          up5: true,
          c4: 0,
          c5: 0,
          n4: 0,
          n5: 0,
          allList: []
        },
        permanent: {
          all: 0,
          c4: 0,
          c5: 0,
          n4: 0,
          n5: 0,
          allList: []
        }
      };
      state.reg = {
        regulation: false, // 定规情况: false.未定规, 0.第一把武器，1.第二把武器
        count: 0 //累计count次金不是定轨武器
      }
      localStorage.clear();
      window.location.reload();
    },
    setType(state, value) {
      state.type = value
      localStorage.setItem("type", JSON.stringify(state.type))
    },
    setResentList(state, value) {
      state.recentList = value
      localStorage.setItem("list", JSON.stringify(state.recentList))
    },
    setUpInfo(state, value) {
      state.info.up.all += value.all;
      state.info.up.up4 = value.up4;
      state.info.up.up5 = value.up5;
      state.info.up.c4 = value.c4;
      state.info.up.c5 = value.c5;
      state.info.up.n4 = value.n4;
      state.info.up.n5 = value.n5;
      value.allList.forEach(item => {
        state.info.up.allList.unshift(item)
      })
      localStorage.setItem("upInfo", JSON.stringify(state.info.up))
    },
    setArmsInfo(state, value) {
      state.info.arms.all += value.all;
      state.info.arms.up4 = value.up4;
      state.info.arms.up5 = value.up5;
      state.info.arms.c4 = value.c4;
      state.info.arms.c5 = value.c5;
      state.info.arms.n4 = value.n4;
      state.info.arms.n5 = value.n5;
      value.allList.forEach(item => {
        state.info.arms.allList.unshift(item)
      })
      localStorage.setItem("armsInfo", JSON.stringify(state.info.arms))
    },
    setPermanentInfo(state, value) {
      state.info.permanent.all += value.all;
      state.info.permanent.c4 = value.c4;
      state.info.permanent.c5 = value.c5;
      state.info.permanent.n4 = value.n4;
      state.info.permanent.n5 = value.n5;
      value.allList.forEach(item => {
        state.info.permanent.allList.unshift(item)
      })
      localStorage.setItem("permanentInfo", JSON.stringify(state.info.permanent))
    },
    setRegulation(state, value) {
      state.reg.regulation = value;
      localStorage.setItem("reg", JSON.stringify(state.reg))
    },
    setRegCount(state, value) {
      state.reg.count = value;
      localStorage.setItem("reg", JSON.stringify(state.reg))
    }
  }
})
