<template>
  <VueDraggable v-model="dragColumns" target=".sort-target" :animation="150" item-key="priceIndex">
    <table class="merge-table">
      <thead>
        <!-- 第一行：产品层 -->
        <tr>
          <th class="field-col">产品名称</th>
          <th v-for="(p, pIdx) in products" :key="'p-' + pIdx" :colspan="productColSpan(p)" class="sort-target">
            {{ p.title }}
          </th>
        </tr>
        <!-- 第二行：CAS -->
        <tr>
          <th class="field-col">cas号</th>
          <th v-for="(p, pIdx) in products" :key="'cas-' + pIdx" :colspan="productColSpan(p)">
            {{ p.cas }}
          </th>
        </tr>
        <!-- 第三行：公司 -->
        <tr>
          <th class="field-col">企业名称</th>
          <th v-for="(inq, iIdx) in inquiryColumns" :key="'inq-' + iIdx" :colspan="inq.colspan">
            {{ inq.company_title }}
          </th>
        </tr>
        <!-- 第四行：类型 -->
        <tr>
          <th class="field-col">类型</th>
          <th v-for="(inq, iIdx) in priceType" :key="'type-' + iIdx">
            {{ inq.type === 1 ? '每日询价' : '国际采购' }}
          </th>
        </tr>
        <!-- 第五行：报价序号 -->
        <!-- <tr>
        <th v-for="(col, cIdx) in columns" :key="'col-' + cIdx">
          报价{{ col.priceIndex + 1 }}
        </th>
      </tr> -->
      </thead>

      <tbody>
        <tr v-for="field in fields" :key="field.key">
          <td class="field-col">{{ field.label }}</td>
          <td v-for="(col, cIdx) in dragColumns" :key="'v-' + cIdx">
            <span :class="{ price: field.key === 'price' }">
              {{ col.price[field.key] }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </VueDraggable>
</template>

<script setup>
import { computed, watch, ref } from "vue";
import { VueDraggable } from 'vue-draggable-plus'
const props = defineProps({
  proData: []
})
// 模拟数据
const products = props.proData
console.log(products);

// 报价字段
const fields = [
  { label: "维护日期", key: "time" },
  { label: "数量", key: "num" },
  { label: "单位", key: "unit" },
  { label: "价格", key: "price" },
  { label: "价格单位", key: "unit_info" },
  { label: "规格", key: "specs" },
  { label: "包装", key: "package" },
  { label: "业务员", key: "salesperson" },
  { label: "交货周期", key: "period" },
  { label: "备注", key: "remark" },
  { label: "维护人", key: "admin_name" }
];

// 展开为列（每条报价就是一列）
const columns = computed(() => {
  const cols = [];
  products.forEach((p, pIdx) => {
    p.inquiry.forEach((inq, iIdx) => {
      inq.price_list.forEach((price, prIdx) => {
        cols.push({
          product: p,
          inquiry: inq,
          price,
          productIndex: pIdx,
          inquiryIndex: iIdx,
          priceIndex: prIdx
        });
      });
    });
  });
  console.log('cols', cols);
  return cols;
});
const dragColumns = ref([]);

watch(
  columns,
  (val) => {
    dragColumns.value = [...val];
    console.log('dragColumns', dragColumns.value);

  },
  { immediate: true }
);
// 公司层
const inquiryColumns = computed(() => {
  const result = [];

  products.forEach((p) => {
    p.inquiry.forEach((inq) => {
      result.push({
        company_title: inq.company_title,
        type: inq.type,
        colspan: inq.price_list.length
      });
    });
  });
  console.log('result', result);

  return result;
});
const priceType = computed(() => {
  const result = [];

  products.forEach((p) => {
    p.inquiry.forEach((inq) => {
      inq.price_list.forEach((priceItem) => {
        result.push({

          company_title: inq.company_title,
          type: priceItem.type,
          colspan: inq.price_list.length
        });
      })

    });
  });
  console.log('result', result);

  return result;
}
)
console.log(priceType);

// 产品的 colspan
const productColSpan = (product) => {
  console.log(product);

  console.log(product.inquiry.reduce((sum, inq) => sum + inq.price_list.length, 0));

  return product.inquiry.reduce((sum, inq) => sum + inq.price_list.length, 0);
};
</script>

<style scoped>
.merge-table {
  width: 100%;
  border-collapse: collapse;
}

.merge-table th,
.merge-table td {
  border: 1px solid #ccc;
  padding: 6px 8px;
  text-align: center;
}

.field-col {
  background: #f5f7fa;
  text-align: left;
  font-weight: bold;
  width: 120px;
}

.price {
  color: red;
  font-weight: bold;
}
</style>
