import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserManageView from "@/views/admin/UserManageView.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AddQuestionView from "@/views/AddQuestionView.vue";
import QuestionManageView from "@/views/admin/QuestionManageView.vue";
import QuestionDetailView from "@/views/QuestionDetailView.vue";
import QuestionSubmitView from "@/views/QuestionSubmitView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '主页',
      component: HomeView,
    },
    {
      path: '/user/login',
      name: '用户登录',
      component: UserLoginView,
    },
    {
      path: '/user/register',
      name: '用户注册',
      component: UserRegisterView,
    },
    {
      path: '/add_question',
      name: '创建题目',
      component: AddQuestionView,
    },
    {
      path: '/question/:id',
      name: '题目详情',
      component: QuestionDetailView,
      props: true,
    },
    {
      path: '/question_submit',
      name: '浏览题目提交',
      component: QuestionSubmitView,
    },
    {
      path: '/admin/userManage',
      name: '用户管理',
      component: UserManageView,
    },
    {
      path: '/admin/questionManage',
      name: '题目管理',
      component: QuestionManageView,
    },
  ],
})

export default router
