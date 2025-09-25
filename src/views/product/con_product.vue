<template>
  <div class="product">
    <div class="search">
      <img src="../../common//assets//img/logo蓝字.png" alt="">
      <el-input v-model="querParams.cas" style="width: 240px" placeholder="CAS号" clearable />
      <el-input v-model="querParams.company" style="width: 240px" placeholder="企业名称" clearable />
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <div class="content">

      <TransitionGroup name="list" tag="div" class="card-list">
        <el-card shadow="hover" v-for="(item, index) in tableList" :key="index">
          <div class="product_info">
            <h6>{{ item.product }}</h6>
            <h6>{{ item.cas }}</h6>
            <h6>{{ item.company }}</h6>
          </div>
          <div class="user_info">
            <h6>{{ item.admin_name }}</h6>
            <h6>{{ item.time }}</h6>
          </div>
        </el-card>
      </TransitionGroup>


      <el-empty description="请输入CAS号和企业名称搜索产品" v-if="tableList.length === 0" />
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { getProductListApi } from '@/api/homeList'
import { ref } from 'vue'
const querParams = ref({
  company: "",
  cas: ""
})
const tableList = ref([])
const search = async () => {
  const res = await getProductListApi(querParams.value)
  if (res.code === 200) {
    tableList.value = res.data.list
  } else {
    ElMessage.error(res.msg)
  }
}
</script>

<style lang="less" scoped>
.product {
  .search {
    padding: 0 30px;

    box-sizing: border-box;
    width: 1300px;
    margin: 0 auto;
    margin-top: 10px;
    height: 100px;
    // background-color: #fff;
    // box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;

    justify-content: space-between;
    // border: 1px solid #ccc;

    img {
      width: 200px;
      height: 100px;
      object-fit: contain;
    }

    :deep(.el-input) {
      width: 350px !important;

      .el-input__wrapper {
        box-shadow: none;
        border: 1px solid #017CB8;
      }
    }
  }

  .content {
    width: 1300px;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .el-empty {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    :deep(.el-card) {
      width: 100%;
      box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

      .el-card__body {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
      }

      .product_info {
        font-size: 20px;
        line-height: 25px;
        font-family: Arial, Helvetica, sans-serif;

      }

      .user_info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 20px;
        line-height: 25px;
        font-family: Arial, Helvetica, sans-serif;
      }

    }

    .card-list {
      width: 100%;
    }

    /* 动画效果 */
    .list-enter-active {
      transition: all 0.5s ease;
    }

    .list-leave-active {
      transition: all 0.3s ease;
    }

    .list-enter-from {
      opacity: 0;
      transform: translateY(20px);
    }

    .list-enter-to {
      opacity: 1;
      transform: translateY(0);
    }

    .list-leave-from {
      opacity: 1;
      transform: translateY(0);
    }

    .list-leave-to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
}
</style>
