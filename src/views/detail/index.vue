d<template>
  <div class="detail">
    <!-- 导航栏 -->
    <top-bar :path="path"></top-bar>
    <div v-loading="!loadData" class="content">
      <!-- 标题 -->
      <h1 v-if="type !== 4">「<span :class="allData.textData.titleColor1">{{ allData.textData.titleText1 }}</span >{{ allData.textData.titleText2 }}」活动祈愿 </h1>
      <h1 v-else>「奔行<span class="blue">世间</span>」常驻祈愿</h1>
      <!-- tab -->
      <el-tabs v-model="activeName" class="tabs" @tab-click="tabChange">
        <!-- 概率提升页 -->
        <el-tab-pane v-if="type !== 4" label="概率提升" name="up">
          <el-scrollbar v-show="loadData" class="scrollbar" max-height="calc(95vh - 147.2px)">
            <div style="padding: 11px">
              <h2>✦ 以下内容出现概率UP :</h2>
              <el-divider content-position="left" ><span class="king-star">★★★★★</span> 占5星出货率的: {{ allData.textData.rate1 }}</el-divider>
              <div class="row-box">
                <el-row :gutter="12">
                  <el-col :span="8">
                    <el-card shadow="always">
                      <div :class="['card-text', allData.textData.titleColor1]">
                        {{ allData.textData.itemText1 }}
                      </div>
                    </el-card>
                  </el-col>
                  <el-col v-if="allData.textData.itemText1_1" :span="8">
                    <el-card shadow="always">
                      <div :class="['card-text', allData.textData.titleColor1]">
                        {{ allData.textData.itemText1_1 }}
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
              <el-divider content-position="left" ><span class="king-star">★★★★</span> 占4星出货率的: {{ allData.textData.rate1 }}</el-divider>
              <div class="row-box">
                <el-row :gutter="12">
                  <el-col :span="8">
                    <el-card shadow="always">
                      <div :class="['card-text', allData.textData.itemColor2]">
                        {{ allData.textData.itemText2 }}
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :span="8">
                    <el-card shadow="always">
                      <div :class="['card-text', allData.textData.itemColor3]">
                        {{ allData.textData.itemText3 }}
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :span="8">
                    <el-card shadow="always">
                      <div :class="['card-text', allData.textData.itemColor4]">
                        {{ allData.textData.itemText4 }}
                      </div>
                    </el-card>
                  </el-col>
                  <el-col v-if="allData.textData.itemText5" style="margin-top: 20px" :span="8">
                    <el-card shadow="always">
                      <div :class="['card-text', allData.textData.itemColor4]">
                        {{ allData.textData.itemText4 }}
                      </div>
                    </el-card>
                  </el-col>
                  <el-col v-if="allData.textData.itemText6" style="margin-top: 20px" :span="8">
                    <el-card shadow="always">
                      <div :class="['card-text', allData.textData.itemColor6]">
                        {{ allData.textData.itemText6 }}
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
                <br />
              </div>
            </div>
          </el-scrollbar>
        </el-tab-pane>
        <!-- 祈愿详情页 -->
        <el-tab-pane label="祈愿详情" name="detail">
          <el-scrollbar v-show="loadData" class="scrollbar" max-height="calc(95vh - 147.2px)">
            <div style="padding: 11px">
              <h2>✦ 以下为祈愿详情 :</h2>
              <div v-if="type !== 4" class="detail-text">
                <div> 「<span :class="allData.textData.titleColor1">{{ allData.textData.titleText1 }}</span >{{ allData.textData.titleText2 }}」活动祈愿已开启。活动期间内，<span class="darkRed">限定</span >5星{{ allData.textData.title }}<span :class="allData.textData.titleColor1"> {{ allData.textData.itemText1 }} </span ><span v-if="allData.textData.title === '武器'">、<span :class="allData.textData.titleColor1">{{ allData.textData.itemText1_1 }}</span></span>以及4星角色<span :class="allData.textData.itemColor2"> {{ allData.textData.itemText2 }} </span >、<span :class="allData.textData.itemColor3"> {{ allData.textData.itemText3 }} </span >、<span :class="allData.textData.itemColor4"> {{ allData.textData.itemText4 }} </span ><span v-if="allData.textData.itemText5">、<span :class="allData.textData.itemColor5"> {{ allData.textData.itemText5 }} </span >、<span :class="allData.textData.itemColor6"> {{ allData.textData.itemText6 }} </span ></span>的祈愿获取概率将<span class="darkRed">大幅提升</span>！ </div>
                <div class="darkRed"> ※以上{{ allData.textData.title }}中，限定{{ allData.textData.title }}不会进入「奔行世间」常驻祈愿。 </div> <br />
                <div> ※一般情况下所有角色或武器均适用基础概率，如触发概率UP、保底等以具体规则为准。 </div> <br />
                <div>〓祈愿规则〓</div>
                <div>【5星物品】</div>
                <div> 在本期「<span :class="allData.textData.titleColor1">{{ allData.textData.titleText1 }}</span >{{ allData.textData.titleText2 }}」活动祈愿中，5星角色祈愿的基础概率为<span class="darkRed" >{{ allData.textData.rate2_1 }}</span >，综合概率（含保底）为<span class="darkRed">{{ allData.textData.rate2_2 }}</span >，最多<span class="darkRed">{{ allData.textData.floor }}</span >次祈愿必定能通过保底获取5星{{ allData.textData.title }}。 </div>
                <div> 当祈愿获取到5星{{ allData.textData.title }}时，有<span class="darkRed">{{ allData.textData.rate1 }}</span >的概率为本期5星UP{{ allData.textData.title }}<span :class="allData.textData.titleColor1" > {{ allData.textData.itemText1 }} </span ><span v-if="allData.textData.title === '武器'">、<span :class="allData.textData.titleColor1">{{ allData.textData.itemText1_1 }}</span>中的一个</span>。如果本次祈愿获取的5星{{ allData.textData.title }}非本期5星UP{{ allData.textData.title }}，下次祈愿获取的5星{{ allData.textData.title }}<span class="darkRed" >必定</span >为本期5星UP{{ allData.textData.title }}。<span v-if="allData.textData.title === '武器'">在未通过命定值达到满值获取定轨武器的情况下，当祈愿获取到5星UP物品时，每把本期5星UP武器的获取概率均等。</span></div>
                <div v-if="allData.textData.title === '武器'">在本期「<span :class="allData.textData.titleColor1">{{ allData.textData.titleText1 }}</span >{{ allData.textData.titleText2 }}」活动祈愿中，可使用「神铸定轨」对本期5星UP武器进行定轨，定轨武器的选择仅在本期「<span :class="allData.textData.titleColor1">{{ allData.textData.titleText1 }}</span >{{ allData.textData.titleText2 }}」活动祈愿中生效。</div>
                <div v-if="allData.textData.title === '武器'">在本期「<span :class="allData.textData.titleColor1">{{ allData.textData.titleText1 }}</span >{{ allData.textData.titleText2 }}」活动祈愿中，使用「神铸定轨」定轨武器后，当获取到的5星武器为非当前定轨武器时，获得1点命定值，命定值达到<span class="darkRed">满值</span>后，在本祈愿中获得的下一把5星武器<span class="darkRed">必定</span>为当前定轨武器。获取到当前定轨武器时，无论当前命定值是否达到满值，都将会重置为<span class="darkRed">0</span>，重新累计。</div>
                <div v-if="allData.textData.title === '武器'">未使用「神铸定轨」定轨武器时，将<span class="darkRed">不会</span>累积命定值。</div>
                <div v-if="allData.textData.title === '武器'">定轨武器可进行更换或取消。更换或取消当前定轨武器时，命定值将会重置为<span class="darkRed">0</span>，重新累计。</div><br />
                <div v-if="allData.textData.title === '武器'">※本祈愿中的命定值仅在本期「<span :class="allData.textData.titleColor1">{{ allData.textData.titleText1 }}</span >{{ allData.textData.titleText2 }}」活动祈愿中生效，祈愿结束后命定值将会重置为<span class="darkRed">0</span>，重新累计。</div><br />
                <div>【4星物品】</div>
                <div> 在本期「<span :class="allData.textData.titleColor1">{{ allData.textData.titleText1 }}</span >{{ allData.textData.titleText2 }}」活动祈愿中，4星物品祈愿的基础概率为<span class="darkRed" >{{ allData.textData.rate3_1 }}</span >，4星角色祈愿的基础概率为<span class="darkRed">{{ allData.textData.rate5 }}</span >，4星武器祈愿的基础概率为<span class="darkRed">{{ allData.textData.rate5 }}</span >，4星物品祈愿的综合概率（含保底）为<span class="darkRed" >{{ allData.textData.rate3_2 }}</span >。最多<span class="darkRed">10</span >次祈愿必定能通过保底获取4星或以上物品，通过保底获取4星物品的概率为<span class="darkRed" >{{ allData.textData.rate6 }}</span >，获取5星物品的概率为<span class="darkRed">{{ allData.textData.rate2_1 }}</span>。 </div>
                <div> 当祈愿获取到4星物品时，有<span class="darkRed">{{ allData.textData.rate1 }}</span >的概率为本期4星UP{{ allData.textData.title }}<span :class="allData.textData.itemColor2" > {{ allData.textData.itemText2 }} </span >、<span :class="allData.textData.itemColor3"> {{ allData.textData.itemText3 }} </span >、<span :class="allData.textData.itemColor4"> {{ allData.textData.itemText4 }} </span ><span v-if="allData.textData.itemText5">、<span :class="allData.textData.itemColor5"> {{ allData.textData.itemText5 }} </span >、<span :class="allData.textData.itemColor6"> {{ allData.textData.itemText6 }} </span ></span>中的一个。如果本次祈愿获取的4星物品非本期4星UP{{ allData.textData.title }}，下次祈愿获取的4星物品<span class="darkRed" >必定</span >为本期4星UP{{ allData.textData.title }}。当祈愿获取到4星UP物品时，每个本期4星UP{{ allData.textData.title }}的获取概率均等。 </div> <br />
                <div> ※本祈愿属于{{ allData.textData.pollText }}，<span v-if="allData.textData.title === '角色'">「角色活动祈愿」和「角色活动祈愿-2」的祈愿次数保底完全共享，会一直共同累计在「角色活动祈愿」和「角色活动祈愿-2」中</span><span v-if="allData.textData.title === '武器'">其祈愿次数保底会一直累计在「武器活动祈愿」中</span>，与其他祈愿的祈愿次数保底相互独立计算，互不影响。 </div>
              </div>
              <div v-else class="detail-text">
                <div>「奔行<span class="blue">世间</span>」常驻祈愿为永久性祈愿活动，玩家可以抽取非限定角色与武器。</div>
                <div>在本祈愿内，每10次祈愿<span class="darkRed">必会</span>获得至少1个4星或以上物品。</div><br />
                <div>※一般情况下所有角色或武器均适用基础概率，如触发概率UP、保底等以具体规则为准。</div><br />
                <div>〓祈愿规则〓</div>
                <div>5星物品祈愿的基础概率为<span class="darkRed">0.600%</span>，5星角色祈愿的基础概率为<span class="darkRed">0.300%</span>，5星武器祈愿的基础概率为<span class="darkRed">0.300%</span>，5星物品祈愿综合概率（含保底）为<span class="darkRed">1.600%</span>，最多<span class="darkRed">90</span>次祈愿必定能通过保底获取5星物品。</div>
                <div>4星物品祈愿的基础概率为<span class="darkRed">5.100%</span>，4星角色祈愿的基础概率为<span class="darkRed">2.550%</span>，4星武器祈愿的基础概率为<span class="darkRed">2.550%</span>，4星物品祈愿的综合概率（含保底）为<span class="darkRed">13.000%</span>。最多<span class="darkRed">10</span>次祈愿必定能通过保底获取4星或以上物品，通过保底获取4星物品的概率为<span class="darkRed">99.400%</span>，获取5星物品的概率为<span class="darkRed">0.600%</span>。</div>
              </div>
            </div>
          </el-scrollbar>
        </el-tab-pane>
        <!-- 祈愿清单页 -->
        <el-tab-pane label="祈愿清单" name="list">
          <el-scrollbar v-show="loadData" class="scrollbar" max-height="calc(95vh - 147.2px)">
            <div style="padding: 11px">
              <h2>✦ 以下为祈愿物品清单 :</h2>
              <el-divider content-position="left" ><span class="king-star">★★★★★</span> 5星物品基础出率：{{ allData.textData.rate2_1 }} （含保底综合出率：{{ allData.textData.rate2_2 }}）</el-divider >
              <div class="rela">
                <div class="shadow"></div>
                <el-table border :data="allData.tableData5" class="table" size="large" :header-cell-class-name="headerCellClassName" empty-text="暂无数据" >
                  <el-table-column prop="type" label="类型" min-width="10" align="center" class-name="table-item" :resizable="false" />
                  <el-table-column prop="name" label="名称" min-width="15" align="center" class-name="table-item" :resizable="false" />
                  <el-table-column prop="baseRate" label="基础出率" min-width="15" align="center" class-name="table-item" :resizable="false" />
                  <el-table-column prop="allRate" label="含保底综合出率" min-width="15" align="center" class-name="table-item" :resizable="false" />
                </el-table>
              </div>
              <div class="tips"> （当未触发UP或保底规则时，所有角色或武器均分基础出率） </div>
              <el-divider content-position="left" ><span class="king-star">★★★★</span> 4星物品基础出率：{{ allData.textData.rate3_1 }} （含保底综合出率：{{ allData.textData.rate3_2 }}）</el-divider >
              <div class="rela">
                <div class="shadow"></div>
                <el-table border :data="allData.tableData4" class="table" size="large" :header-cell-class-name="headerCellClassName" empty-text="暂无数据" >
                  <el-table-column prop="type" label="类型" min-width="10" align="center" class-name="table-item" :resizable="false" />
                  <el-table-column prop="name" label="名称" min-width="15" align="center" class-name="table-item" :resizable="false" />
                  <el-table-column prop="baseRate" label="基础出率" min-width="15" align="center" class-name="table-item" :resizable="false" />
                  <el-table-column prop="allRate" label="含保底综合出率" min-width="15" align="center" class-name="table-item" :resizable="false" />
                </el-table>
              </div>
              <div class="tips"> （当未触发UP或保底规则时，所有角色或武器均分基础出率） </div>
              <el-divider content-position="left" ><span class="king-star">★★★</span> 3星物品基础出率：{{ allData.textData.rate4_1 }} （含保底综合出率：{{ allData.textData.rate4_2 }}）</el-divider >
              <div class="rela">
                <div class="shadow"></div>
                <el-table border :data="allData.tableData3" class="table" size="large" :header-cell-class-name="headerCellClassName" empty-text="暂无数据" >
                  <el-table-column prop="type" label="类型" min-width="10" align="center" class-name="table-item" :resizable="false" />
                  <el-table-column prop="name" label="名称" min-width="15" align="center" class-name="table-item" :resizable="false" />
                  <el-table-column prop="baseRate" label="基础出率" min-width="15" align="center" class-name="table-item" :resizable="false" />
                  <el-table-column prop="allRate" label="含保底综合出率" min-width="15" align="center" class-name="table-item" :resizable="false" />
                </el-table>
              </div>
              <div class="tips"> （当未触发UP或保底规则时，所有角色或武器均分基础出率） </div>
            </div>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import store from "@/store";
import topBar from "@/components/topBar.vue";
import { getListData } from "@/assets/method/detailListData";

export default {
  name: "DetailView",
  components: { topBar },
  setup() {
    const route = useRoute();

    let data = reactive({
      path: route.path,
      activeName: "up",
      loadData: true,
      allData: {},
      type: 1,
    });
    // 获取数据
    data.type = store.state.type;
    if (data.type === 4) {
      data.activeName = "detail";
    }
    data.allData = getListData(data.type ? data.type : 1);
    // console.log( data.allData )
    // tab切换事件
    const tabChange = () => {
      data.loadData = false;
      setTimeout(() => {
        data.loadData = true;
      }, (Math.floor(Math.random() * 3) + 3) * 100);
    };
    // 执行一次tab切换，实现进入页面的loading效果
    tabChange();
    // 定义table样式
    const headerCellClassName = () => {
      return "headerCellClassName";
    };

    return {
      ...toRefs(data),
      tabChange,
      headerCellClassName,
    };
  },
};
</script>

<style scoped lang="scss">
.detail {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #fafafa;
  .content {
    width: 100vw;
    height: calc(100vh - 59px);
    overflow: hidden;
    text-align: left;
    box-sizing: border-box;
    padding: 0 5%;
    ::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 0;
    }
    // 大标题
    h1 {
      color: #303133;
      font-weight: normal;
      margin: 20px 0 10px;
    }
    // 字体颜色
    .purple {
      color: #a256e1;
    }
    .red {
      color: #ec4923;
    }
    .blue {
      color: #2bc7fb;
    }
    .king-star {
      color: #c68255;
      font-size: 1.2rem;
    }
    .king1 {
      color: #ef8123;
    }
    .king2 {
      color: #c37948;
    }
    .darkRed {
      color: #c93f23;
    }
    // tab菜单
    .tabs {
      :deep(.el-tabs__item) {
        font-size: 1rem;
        cursor: url("@/assets/image/cursor.png"), auto;
      }
      :deep(.el-tabs__header) {
        margin: 0 0 10px;
      }
      // .scrollbar {
      //   padding: 10px;
      // }
      // 小标题
      h2 {
        font-weight: normal;
        margin: 0 0 30px;
      }
      // 分割线
      :deep(.el-divider--horizontal) {
        margin: 40px 0;
        border-top-width: 2px;
      }
      :deep(.el-divider__text) {
        background-color: #fafafa;
        color: #515a68;
        font-size: 1rem;
      }
      // 滚动条
      :deep(.el-scrollbar__thumb) {
        cursor: url("@/assets/image/cursor.png"), auto;
      }
      // 概率提升页布局
      .row-box {
        .card-text {
          margin: 15px 0;
          text-align: center;
        }
      }
      // detail
      .detail-text {
        font-size: 1.2rem;
        line-height: 2rem;
      }
      // list
      .rela {
        position: relative;
        // 遮罩
        .shadow {
          z-index: 4;
          position: absolute;
          top: 0px;
          left: 0;
          width: 100%;
          height: 70px;
          background-color: rgba($color: #000000, $alpha: 0);
        }
      }
      // 表格
      .table {
        :deep(th) {
          height: 70px;
        }
        :deep(td) {
          height: 70px;
        }
        :deep(.table-item) {
          font-size: 1.2em;
        }
        :deep(.headerCellClassName) {
          background: #f0f0f4 !important;
          font-size: 1.2em;
          font-weight: normal;
          color: #606266;
          border-color: #f0f0f4;
        }
        :deep(.el-table__empty-text) {
          font-size: 1.2em;
        }
      }
      // 提示信息
      .tips {
        margin: 10px 0;
        height: 20px;
        line-height: 20px;
      }
    }
  }
}
</style>