<template>
  <div style="padding:20px;">
    <el-collapse v-model="activeNames">
      <el-collapse-item v-for="(row, index) in priceList" :key="row.id"
        :title="`数量：${row.num} / 单位：${row.unit} / 价格：${row.price}`" :name="index">
        <el-card>
          <el-form label-width="80px">
            <el-form-item label="数量">
              <el-input-number v-model="row.num" :precision="2" :step="0.1" />
            </el-form-item>

            <el-form-item label="单位">
              <el-input v-model="row.unit" />
            </el-form-item>

            <el-form-item label="价格">
              <el-input-number v-model="row.price" :precision="2" :step="0.1" />
            </el-form-item>

            <el-form-item label="价格单位">
              <el-input v-model="row.unit_info" />
            </el-form-item>

            <el-form-item label="规格">
              <el-input v-model="row.specs" />
            </el-form-item>

            <el-form-item label="包装">
              <el-input v-model="row.package" />
            </el-form-item>

            <el-form-item label="备注">
              <el-input v-model="row.remark" type="textarea" autosize resize="none" />
            </el-form-item>

            <el-form-item label="维护人">
              <el-input :value="row.add_type === 1 ? row.user_name : row.admin_name" disabled />
            </el-form-item>

            <el-form-item label="显示状态">
              <el-switch v-model="row.is_show" :active-value="1" :inactive-value="2"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #cccccc" />
            </el-form-item>

            <el-form-item>
              <el-button type="danger" @click="removeRow(index)">删除</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { ref } from "vue"

const activeNames = ref([]) // 默认全部收起

// 模拟数据
const priceList = ref([
  {
    id: 1,
    num: 10,
    unit: "kg",
    price: 25.5,
    unit_info: "元/kg",
    specs: "优等品",
    package: "袋装",
    remark: "适合批发",
    add_type: 1,
    user_name: "张三",
    admin_name: "管理员A",
    is_show: 1,
  },
  {
    id: 2,
    num: 5,
    unit: "箱",
    price: 120,
    unit_info: "元/箱",
    specs: "整箱",
    package: "纸箱",
    remark: "易碎品，小心搬运",
    add_type: 2,
    user_name: "",
    admin_name: "管理员B",
    is_show: 2,
  },
  {
    id: 3,
    num: 1,
    unit: "瓶",
    price: 8.8,
    unit_info: "元/瓶",
    specs: "500ml",
    package: "玻璃瓶",
    remark: "饮用水",
    add_type: 1,
    user_name: "李四",
    admin_name: "管理员C",
    is_show: 1,
  },
])

const removeRow = (index) => {
  priceList.value.splice(index, 1)
}
</script>
