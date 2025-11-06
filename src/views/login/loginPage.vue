<template>
  <div class="login">
    <div class="login_page">
      <img src="../../common//assets/img/logo蓝字.png" alt="">
      <el-form label-width="80px" label-position="left" :model="formData" :rules="rules" ref="ruleFormRef">
        <el-form-item label="账号" prop="username">
          <el-input placeholder="请输入账号" v-model="formData.username" @keyup.enter="getLogin(ruleFormRef)" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" show-password type="password" v-model="formData.password"
            @keyup.enter="getLogin(ruleFormRef)" />
        </el-form-item>
        <div style="display: flex; justify-content: flex-start;margin-bottom: 5px;">
          <el-checkbox v-model="remPass" label="记住密码" />
        </div>


      </el-form>



      <el-button type="primary" class="sub_btn" @click="getLogin(ruleFormRef)">登录</el-button>

    </div>

  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { loginApi } from '@/api/lgoin'
import { useAuthStore } from '../../stores/user'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { setUserName } from '../../utils/setToken'
const LS_LEY = 'myapp_remember'
const router = useRouter()
const remPass = ref(false)
const formData = ref({
  username: '',
  password: ''
})

//存储账号密码
function savePass() {
  const payload = {
    username: formData.value.username,
    password: window.btoa(formData.value.password)
  }
  localStorage.setItem(LS_LEY, JSON.stringify(payload))
}
// 页面一加载就读数据
function loadFromLocal() {
  const data = localStorage.getItem(LS_LEY)
  if (data) {
    try {
      const obj = JSON.parse(data)
      formData.value.username = obj.username
      formData.value.password = window.atob(obj.password)
      remPass.value = true
    } catch (error) {
      console.log('读取账号密码错误', error);
    }
  } else {
    return
  }
}
const ruleFormRef = ref()
const authStore = useAuthStore();
const rules = ref({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})
const getLogin = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      //登录
      const res = await loginApi(formData.value)
      if (res.code === 200) {
        authStore.setToken(res.data.token);
        authStore.setUser(res.data.id);
        setUserName(res.data.name);
        authStore.setInfo(res.data)
        router.push('/home');
        //是否记住密码
        if (remPass.value) {
          savePass()
        } else {
          localStorage.removeItem(LS_LEY)
        }
      } else if (res.code === 400) {
        ElMessage.error(res.msg)
      }
    } else {
      ElMessage({
        message: '登录失败.',
        type: 'warning',
      })
    }
  })
}
onMounted(() => {
  loadFromLocal()
})
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100% !important;
  background-color: skyblue;

  .login_page {
    img {
      height: 40px;
      width: 100px;
      margin-bottom: 40px;
    }

    padding: 20px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: end;
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 20px;

    ::v-deep .el-form {
      .el-input {
        width: 250px;
      }
    }

    .sub_btn {
      width: 335px;
    }
  }
}
</style>
