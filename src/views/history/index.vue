<template>
  <div class="history">
    <!-- 导航栏 -->
    <top-bar :path="path"></top-bar>
    <div v-loading="!loadData" class="content">
      <!-- 选择框 -->
      <el-select
        @change="selectChange"
        v-model="wishType"
        class="select"
        placeholder="祈愿类型选择："
        size="large"
      >
        <el-option
          v-for="item in wishTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <!-- 表格 -->
      <el-table
        border
        :data="tableData"
        class="table"
        :max-height="tableHeight"
        size="large"
        :cell-class-name="cellClassName"
        :header-cell-class-name="headerCellClassName"
        empty-text="暂无数据"
      >
        <el-table-column
          type="index"
          :index="indexMethod"
          label="序号"
          width="100"
          align="center"
          class-name="table-item"
          :resizable="false"
        />
        <el-table-column
          prop="type"
          label="类型"
          min-width="10"
          align="center"
          class-name="table-item"
          :resizable="false"
        />
        <el-table-column
          prop="name"
          label="名称"
          min-width="15"
          align="center"
          class-name="table-item"
          :resizable="false"
        />
        <el-table-column
          prop="wishType"
          label="祈愿类型"
          min-width="15"
          align="center"
          class-name="table-item"
          :resizable="false"
        />
        <el-table-column
          prop="time"
          label="祈愿时间"
          min-width="15"
          align="center"
          class-name="table-item"
          :resizable="false"
        />
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        :disabled="!loadData"
        class="pagination"
        background
        layout="prev, pager, next, slot"
        :total="total"
        @current-change="pageChange"
        :current-page="page.page"
      >
        <span class="total"
          >共 <span class="text-color">{{ total }}</span> 条</span
        >
      </el-pagination>
      <!-- 遮罩 -->
      <div class="shadow"></div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, watch } from "vue";
import store from "@/store";
import { useRoute } from "vue-router";
import topBar from "@/components/topBar.vue";
import { formatDate } from "@/assets/method/utils";

export default {
  name: "HistoryView",
  components: { topBar },
  setup() {
    const route = useRoute();

    let data = reactive({
      path: route.path,
      loadData: true,
      tableHeight: null,
      tableData: [],
      total: 0,
      page: {
        page: 1,
        size: 10,
      },
      wishType: 2,
      wishTypeList: [
        { value: 1, label: "常驻祈愿" },
        { value: 2, label: "角色活动祈愿与角色活动祈愿-2" },
        { value: 3, label: "武器活动祈愿" },
      ],
    });
    // 获取窗口高度
    const getHeight = () => {
      data.tableHeight = document.documentElement.clientHeight - 239;
    };
    // 数据处理
    const optionData = () => {
      data.loadData = false;
      data.tableData = [];
      setTimeout(() => {
        if (data.wishType === 1) {
          data.tableData = JSON.parse(
            JSON.stringify(
              store.state.info.permanent.allList.slice(
                10 * data.page.page - 10,
                10 * data.page.page
              )
            )
          );
          data.total = JSON.parse(
            JSON.stringify(store.state.info.permanent.all)
          );
        } else if (data.wishType === 2) {
          data.tableData = JSON.parse(
            JSON.stringify(
              store.state.info.up.allList.slice(
                10 * data.page.page - 10,
                10 * data.page.page
              )
            )
          );
          data.total = JSON.parse(JSON.stringify(store.state.info.up.all));
        } else if (data.wishType === 3) {
          data.tableData = JSON.parse(
            JSON.stringify(
              store.state.info.arms.allList.slice(
                10 * data.page.page - 10,
                10 * data.page.page
              )
            )
          );
          data.total = JSON.parse(JSON.stringify(store.state.info.arms.all));
        }
        data.tableData.forEach((item) => {
          if (item.star === 4) {
            item.name = item.name + " (四星) ";
          } else if (item.star === 5) {
            item.name = item.name + " (五星) ";
          }
          item.type = item.type === 0 ? "角色" : "武器";
          item.wishType = data.wishTypeList[data.wishType - 1].label;
          item.time = formatDate(item.time);
        });
        console.log(
          data.wishTypeList[data.wishType - 1].label,
          " 数据总量:",
          data.total,
          " 当前页数:",
          data.page.page
        );
        data.loadData = true;
      }, (Math.floor(Math.random() * 3) + 3) * 100);
    };
    // 获取数据
    if (store.state.type === 1 || store.state.type === 2) {
      data.wishType = 2;
    } else if (store.state.type === 3) {
      data.wishType = 3;
    } else if (store.state.type === 4) {
      data.wishType = 1;
    }
    optionData();
    // 选择框切换事件
    const selectChange = () => {
      data.page.page = 1;
      optionData();
    };
    // 切换页数
    const pageChange = (page) => {
      data.page.page = page;
      optionData();
    };
    // 定义table样式
    const cellClassName = (row) => {
      if (row.row.star === 4 && row.columnIndex === 2) {
        return "purple";
      }
      if (row.row.star === 5 && row.columnIndex === 2) {
        return "king";
      }
    };
    // 定义table样式
    const headerCellClassName = () => {
      return "headerCellClassName";
    };
    // 定义序号排序方式
    const indexMethod = (index) => {
      return "第" + (data.total - (index + data.page.page * 10 - 10)) + "抽";
      // return index + 1;
    };

    onMounted(() => {
      getHeight();
      window.onresize = () => {
        return (() => {
          getHeight();
        })();
      };
    });

    watch(
      () => data.tableHeight,
      () => {
        getHeight();
      }
    );

    return {
      ...toRefs(data),
      selectChange,
      pageChange,
      cellClassName,
      headerCellClassName,
      indexMethod,
    };
  },
};
</script>

<style scoped lang="scss">
.history {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #fafafa;
  .content {
    width: 100vw;
    height: calc(100vh - 59px);
    overflow: hidden;
    // 选择框
    .select {
      margin: 20px auto 0;
      width: 90%;
      :deep(.el-input__inner) {
        cursor: url("@/assets/image/cursor.png"), auto;
        font-family: "hk4e_zh-cn", "HYWH85W", Avenir, Helvetica, Arial, sans-serif;
        height: 60px;
      }
      :deep(.el-select__caret) {
        cursor: url("@/assets/image/cursor.png"), auto;
      }
      :deep(.el-input--large) {
        font-size: 1.1rem;
      }
    }
    // 表格
    .table {
      width: 90%;
      margin: 20px auto;
      :deep(th) {
        height: 70px;
      }
      :deep(td) {
        height: 70px;
      }
      :deep(.purple) {
        color: #b378e3;
      }
      :deep(.king) {
        color: #c68255;
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
      :deep(.el-scrollbar__thumb) {
        cursor: url("@/assets/image/cursor.png"), auto;
      }
      :deep(.el-table__empty-text) {
        font-size: 1.2em;
      }
    }
    // 分页器
    .pagination {
      justify-content: center;
      .total {
        margin-left: 10px;
        color: #515a68;
        .text-color {
          color: #8ba3c7;
        }
      }
      :deep(.btn-prev) {
        cursor: url("@/assets/image/cursor.png"), auto;
      }
      :deep(.number) {
        cursor: url("@/assets/image/cursor.png"), auto;
      }
      :deep(.btn-next) {
        cursor: url("@/assets/image/cursor.png"), auto;
      }
    }
    // 遮罩
    .shadow {
      z-index: 3;
      position: absolute;
      top: 159px;
      left: 5%;
      width: 90%;
      height: 70px;
      background-color: rgba($color: #000000, $alpha: 0);
    }
  }
}
</style>