<template>
  <div class="hhh">
    <VueDraggable target=".sort-target" v-model="headers">
      <table>
        <thead>
          <tr class="sort-target">
            <th v-for="(item, index) in headers" :key="index">{{ item.text }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.name">
            <td v-for="header in headers" :key="header.value">
              {{ item[header.value] }}
            </td>
          </tr>
        </tbody>
      </table>
    </VueDraggable>
  </div>
</template>

<script setup>
import { VueDraggable } from 'vue-draggable-plus';
import { ref } from 'vue'
const headers = ref([
  {
    text: 'Id',
    value: 'id'
  },
  {
    text: 'Name',
    value: 'name'
  }
])
const list = ref([
  {
    name: 'Joao',
    id: 1
  },
  {
    name: 'Jean',
    id: 2
  },
  {
    name: 'Johanna',
    id: 3
  },
  {
    name: 'Juan',
    id: 4
  }
])
</script>

<style lang="less" scoped>
.hhh {
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    p {
      display: flex;
      justify-content: space-between;
      height: 50px;
      width: 100px;
      border: 1px solid #000;
      margin: 0;
      padding: 0;
    }
  }
}
</style>
