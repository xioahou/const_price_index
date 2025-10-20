import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/user'; // 引入 Pinia store
import { loginNowTkApi } from '@/api/lgoin'
import { ElMessage } from 'element-plus';
import { setUserName } from '@/utils/setToken'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/login/loginPage.vue'),
    },
    {
      path: '/home',
      name: 'Home',

      component: () => import('../views/home/homePapge.vue'),
      redirect: '/home/price',
      children: [
        {
          path: 'price',
          name: 'Price',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/price/priceList.vue'),
        }, {
          path: 'product',
          name: 'Product',
          component: () => import('../views/product/con_product.vue')
        }

        // ,{
        //   path: 'hhh',
        //   name: 'Hhh',
        //   component: () => import('../views/hhh/index.vue')
        // }
      ]
    },

  ],
})
// 路由守卫：在每次路由跳转之前检查认证状态
const routerWhite = ['/home/price', '/home/product']
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  console.log(111);
  //校验后台传来的token
  const token = to.query.token;
  console.log(token);
  // 已登录用户禁止访问登录页
  if (to.path === '/login' && authStore.isAuthenticated) {
    next('/home');
    return;
  }
  if (token) {
    console.log('后台跳转');

    try {
      // 调用后端接口验证 token 并登录
      const res = await loginNowTkApi({ token: token });
      console.log(res);

      if (res.code === 200) {
        authStore.setToken(res.data.token);
        authStore.setUser(res.data.id);
        setUserName(res.data.name);
        authStore.setInfo(res.data)
        // 清理掉地址栏上的 token（避免泄露）
        next({ path: to.path || "/home", query: {} });
      } else {

        ElMessage.error('登录过期，请重新登录');
        next('/login');

      }



    } catch (error) {
      console.error("免密登录失败:", error);
      next("/login");

    }
    return
  }


  // 判断目标路由是否需要认
  if (routerWhite.includes(to.path)) {
    if (authStore.isAuthenticated) {

      next(); //判断是需要登录权限的页面？放行：else
    } else {
      router.push('/login') // 未登录，重定向到登录页
    }
  } else {
    next(); // 不需要认证的路由，直接访问
  }
  return
});
export default router
