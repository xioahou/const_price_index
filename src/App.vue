<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import { getUserName } from './utils/setToken'
const authStore = useAuthStore()
const route = useRoute()
const config = ref({
  userName: `${authStore.userName}@DiDeu`,
  font: {
    fontSize: 16,
    fontWeight: 900
  },
  rotate: -22,
})
watch(() => route.path, (newVal) => {

  config.value.userName = getUserName() ? `${getUserName()}@DiDeu` : "DiDeu"

})
</script>

<template>
  <el-watermark style="height: 100%;" :content="[config.userName]" :zIndex="9999999999" :font="config.font"
    :rotate="config.rotate" :width="250" :height="250">

    <keep-alive>

    </keep-alive>
    <router-view />
  </el-watermark>

</template>

<style></style>
