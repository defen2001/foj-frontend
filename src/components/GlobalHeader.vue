<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="150px">
        <!-- 左侧：logo 和网站名称 -->
        <router-link to="/">
          <div class="logo-section">
            <img src="@/assets/logo.svg" alt="Logo" class="logo" />
            <span class="site-name">F OJ</span>
          </div>
        </router-link>
      </a-col>
      <!-- 中间：导航栏 -->
      <a-col flex="auto">
        <a-menu
          mode="horizontal"
          :selectedKeys="current"
          :items="visibleMenuItems"
          @click="handleMenuSelect"
          class="nav-menu"
        >
        </a-menu>
      </a-col>
      <!-- 右侧：用户信息 -->
      <a-col flex="200px">
        <template class="header-right">
          <!--          <a-input-search placeholder="搜索" class="search-input" style="max-width: 180px" />-->
          <div class="user-login">
            <div v-if="loginUserStore.loginUser.id">
              <a-dropdown>
                <ASpace>
                  <a-avatar :src="loginUserStore.loginUser.userAvatar" />
                  {{ loginUserStore.loginUser.username ?? '无名' }}
                </ASpace>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <router-link to="/my_space">
                        <UserOutlined />
                        我的空间
                      </router-link>
                    </a-menu-item>
                    <a-menu-item @click="doLogout">
                      <LogoutOutlined />
                      退出登录
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
            <div v-else>
              <a-button type="primary" href="/user/login">登录</a-button>
            </div>
          </div>
        </template>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore'
import { message } from 'ant-design-vue'
import { logoutUsingPost } from '@/api/userController'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons-vue'

const router = useRouter()

const loginUserStore = useLoginUserStore()
loginUserStore.fetchLoginUser()

// 原始菜单配置
const originMenuItems = [
  {
    key: '/',
    label: '主页',
    title: '主页',
    show: true, // 所有用户可见
  },
  {
    key: '/question_submit',
    label: '题目提交详情',
    title: '题目提交详情',
  },
  {
    key: '/add_question',
    label: '创建题目',
    title: '创建题目',
    requiredRole: 'admin'
  },
  {
    key: '/admin/userManage',
    label: '用户管理',
    title: '用户管理',
    requiredRole: 'admin', // 需要管理员权限
  },
  {
    key: '/admin/questionManage',
    label: '题目管理',
    title: '题目管理',
    requiredRole: 'admin', // 需要管理员权限
  },
]

// 动态过滤后的菜单
const visibleMenuItems = computed(() => {
  return originMenuItems.filter((item) => {
    // 如果有show属性直接返回
    if (item.show !== undefined) return item.show
    // 检查角色权限
    if (item.requiredRole) {
      return loginUserStore.loginUser.userRole === item.requiredRole
    }
    return true
  })
})

// 当前激活的菜单项
const current = ref<string[]>([])

// 点击菜单项时，更新激活项并通过 router.push 进行路由跳转
const handleMenuSelect = ({ key }: { key: string }) => {
  // current.value = key;
  router.push({
    path: key,
  })
  // router.push(`/${key}`);
}

// 用户注销
const doLogout = async () => {
  const res = await logoutUsingPost()
  console.log(res)
  if (res.data.code === 0) {
    loginUserStore.setLoginUser({
      username: '未登录',
    })
    message.success('退出登录成功')
    await router.push('/')
  } else {
    message.error('退出登录失败，' + res.data.message)
  }
}

// 路由切换后更新选中菜单
router.afterEach((to, from) => {
  current.value = [to.path]
})
</script>

<style scoped>
#globalHeader {
  background: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
}

/* 左侧区域 */
.logo-section {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  margin-right: 10px;
}

.site-name {
  font-size: 20px;
  font-weight: bold;
  color: black;
}

/* 导航栏 */
.nav-menu {
  line-height: 64px;
}

/* 右侧区域 */
.header-right {
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* 避免内容溢出 */
  overflow: hidden;
}

.search-input {
  /* 当空间不足时自动隐藏搜索框 */
  flex-shrink: 1;
}

.user-login {
  margin-left: 10px;
  /* 确保文本不会溢出 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
