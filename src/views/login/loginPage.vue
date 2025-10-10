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
      </el-form>
      <el-button type="primary" class="sub_btn" @click="getLogin(ruleFormRef)">登录</el-button>

    </div>

  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { loginApi } from '@/api/lgoin'
import { useAuthStore } from '../../stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { setUserName } from '../../utils/setToken'
const router = useRouter()

const formData = ref({
  username: '',
  password: ''
})
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
