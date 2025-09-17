<template>
  <div id="questionDetailView">
    <a-row :gutter="[24, 24]">
      <!-- 题目信息区 -->
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" tab="题目">
            <a-card v-if="question" :title="question.title">
              <MarkDownViewer :value="question.content || ''"></MarkDownViewer>
              <a-descriptions title="判题条件" :column="{ xs: 1, md: 2, lg: 3 }">
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig?.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig?.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig?.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <template #extra>
                <a-space wrap>
                  <a-tag v-for="(tag, index) of question.tags" :key="index" color="green" closable>
                    {{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" tab="评论" disabled>评论区</a-tab-pane>
          <a-tab-pane key="answer" tab="答案">暂时无法查看答案</a-tab-pane>
        </a-tabs>
      </a-col>
      <!-- 题目操作-->
      <a-col :md="12" :xs="24">
        <a-card>
          <!-- 语言选择 -->
          <div style="margin-bottom: 16px">
            <a-select v-model:value="form.language" style="width: 200px" placeholder="选择编程语言">
              <a-select-option value="java">Java</a-select-option>
              <a-select-option disabled="true" value="go">暂不支持其他语言</a-select-option>
            </a-select>
          </div>
          <!-- 代码编辑器 -->
          <div style="border: 1px solid #d9d9d9; border-radius: 6px; overflow: hidden">
            <CodeEditor
              :value="form.code"
              :language="form.language"
              :handleChange="changeCode"
            ></CodeEditor>
          </div>
          <a-divider style="margin: 20px 0" />
          <!-- 提交按钮 -->
          <div style="text-align: center">
            <a-button
              type="primary"
              size="large"
              @click="handleSubmit"
              :loading="loading"
              style="min-width: 200px"
            >
              提交代码
            </a-button>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { getQuestionVoByIdUsingGet } from '@/api/questionController'
import { doQuestionSubmitUsingPost } from '@/api/questionSubmitController'
import MarkDownViewer from '@/components/MarkDownViewer.vue'
import CodeEditor from '@/components/CodeEditor.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref<API.QuestionSubmitAddRequest>({
  language: 'java',
  code: '',
})

const props = defineProps<{
  id: string | number
}>()

const question = ref<API.QuestionVo>({})
const loading = ref<boolean>()

const changeCode = (value: string) => {
  form.value.code = value
}

// 提交代码
const handleSubmit = async () => {
  loading.value = true
  const res = await doQuestionSubmitUsingPost({
    questionId: props.id,
    ...form.value,
  })
  if (res.data.code === 0 && res.data.data) {
    message.success('提交成功')
    router.push('/question_submit')
  } else {
    message.error('提交失败。' + res.data.message)
  }
  loading.value = false
}

// 获取题目详情
const fetchQuestionDetail = async () => {
  try {
    const res = await getQuestionVoByIdUsingGet({
      id: props.id,
    })
    if (res.data.code === 0 && res.data.data) {
      question.value = res.data.data
    } else {
      message.error('获取题目详情失败，' + res.data.message)
    }
  } catch (e: any) {
    message.error('获取题目详情失败：' + e.message)
  }
}

onMounted(() => {
  fetchQuestionDetail()
})
</script>
