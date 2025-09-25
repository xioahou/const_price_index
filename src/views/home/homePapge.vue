<template>
  <div class="home">
    <div class="router_path">
      <router-link to="/home/price" exact-active-class="active">询价</router-link>
      <router-link to="/home/product" exact-active-class="active">定制产品</router-link>
    </div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content ep-bg-purple-dark nav">
          <template v-if="authStore.isAuthenticated">
            <!-- <a @click="remoLogin">退出登录(无操作十分钟后自动退出)</a> -->
            <el-dropdown>
              <span class="el-dropdown-link" style="outline: none; cursor: pointer;">
                {{ getUserName() }}
                <!-- <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon> -->
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="changePass">修改密码</el-dropdown-item>

                  <el-dropdown-item @click="remoLogin">退出登录</el-dropdown-item>

                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <template v-else>
            <a @click="goLogin"> 登录</a>
          </template>
        </div>
      </el-col>
    </el-row>
  </div>

  <router-view />
  <el-dialog v-model="dialogVisible" :title="title" width="500" :close-on-click-modal="false" :show-close="false">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="旧密码" prop="old_password">
        <el-input v-model="form.old_password" type="password" placeholder="请输入旧密码" show-password />
      </el-form-item>

      <el-form-item label="新密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入新密码" show-password />
      </el-form-item>

      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入新密码" show-password />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false" v-if="isFirstLogin()">取消</el-button>
        <el-button type="primary" @click="submitForm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/user'
import { changePasswordApi } from '@/api/lgoin'
import { removeUserName, getUserName, removeUserInfo } from '../../utils/setToken'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const dialogVisible = ref(false)
const router = useRouter()
const authStore = useAuthStore();
// const route = useRoute()
const goLogin = () => {
  router.push('/login')
}
const remoLogin = () => {
  authStore.userName = ''
  authStore.removeToken()
  removeUserName()
  removeUserInfo()
  router.push('/login')
}
const formRef = ref(null)
const form = ref({
  old_password: '',
  password: '',
  confirmPassword: ''
})
const rules = {
  old_password: [
    { required: true, message: '请输入旧密码', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
// 提交表单
const submitForm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {

      const res = await changePasswordApi(form.value)
      if (res.code === 200) {
        ElMessage.success('修改密码成功')
        remoLogin()
      } else {
        ElMessage.error(res.msg)
      }
      dialogVisible.value = false
    }
  })
}
const changePass = () => {
  dialogVisible.value = true
}
const title = ref('修改密码')
const isFirstLogin = () => {
  if (authStore.userAll.password_time === 0) {
    title.value = '首次登录修改密码'
    dialogVisible.value = true
    return false
  }
  return true
}
isFirstLogin()
</script>

<style lang="less" scoped>
.home {

  width: 100%;
  height: 50px;
  padding: 0px 50px;
  box-sizing: border-box;
  background-color: skyblue;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .router_path {
    display: flex;
    gap: 30px;

    a {
      font-size: 17px;
      color: #ffffff;
    }

    .active {
      color: #017CB8;
      font-weight: 600;
    }
  }

  .nav {
    a {
      font-size: 14px;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
</style>
