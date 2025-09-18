<template>
  <div id="addQuestionView">
    <h2 style="margin-bottom: 16px">
      {{ route.query?.id ? '修改题目' : '创建题目' }}
    </h2>
    <!-- 题目信息表单 -->
    <a-form :model="form" layout="vertical" @finish="handleSubmit">
      <!-- 标题 -->
      <a-form-item label="题目标题" name="title">
        <a-input v-model:value="form.title" placeholder="请输入题目标题" />
      </a-form-item>

      <!-- 分类 -->
      <a-form-item label="分类" name="category">
        <a-auto-complete
          v-model:value="form.category"
          :options="categoryOptions"
          placeholder="请输入分类"
          allowClear
        />
      </a-form-item>
      <!-- 标签 -->
      <a-form-item label="标签" name="tags">
        <a-select
          v-model:value="form.tags"
          mode="tags"
          :options="tagOptions"
          placeholder="请输入或选择标签"
          style="width: 100%"
        />
      </a-form-item>

      <!-- 内容 (Markdown) -->
      <a-form-item label="题目内容" name="content">
        <MarkDownEditor :value="form.content" :handle-change="onContentChange" />
      </a-form-item>
      <!-- 答案 (Markdown) -->
      <a-form-item label="参考答案" name="answer">
        <MarkDownEditor :value="form.answer" :handle-change="onAnswerChange" />
      </a-form-item>

      <!-- 判题配置 -->
      <a-divider>判题配置</a-divider>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item label="时间限制(ms)" name="timeLimit">
            <a-input-number
              v-model:value="form.judgeConfig.timeLimit"
              :min="1"
              style="width: 100%"
              placeholder="如：1000"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="内存限制(MB)" name="memoryLimit">
            <a-input-number
              v-model:value="form.judgeConfig.memoryLimit"
              :min="1"
              style="width: 100%"
              placeholder="如：256"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 测试用例 -->
      <a-divider>测试用例</a-divider>
      <div
        v-for="(caseItem, index) in form.judgeCase"
        :key="index"
        style="margin-bottom: 16px; border: 1px solid #f0f0f0; padding: 12px; border-radius: 8px"
      >
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item :label="`输入样例-${index + 1}`" :name="['judgeCase', index, 'input']">
              <a-input v-model:value="caseItem.input" rows="3" placeholder="输入用例" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label="`输出样例-${index + 1}`" :name="['judgeCase', index, 'output']">
              <a-input v-model:value="caseItem.output" rows="3" placeholder="输出用例" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-button type="link" danger @click="removeCase(index)" v-if="form.judgeCase.length > 1">
          删除此用例
        </a-button>
      </div>
      <a-button type="dashed" block @click="addCase">+ 添加测试用例</a-button>

      <!-- 提交按钮 -->
      <a-form-item style="margin-top: 24px">
        <a-button type="primary" html-type="submit" :loading="loading" style="width: 100%"
          >提交</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import {
  addQuestionUsingPost,
  editQuestionUsingPost,
  getQuestionByIdUsingGet,
  listQuestionTagCategoryUsingGet,
} from '@/api/questionController'
import MarkDownEditor from '@/components/MarkDownEditor.vue'

// 表单数据
const form = ref<API.QuestionAddRequest>({
  title: '',
  category: '',
  tags: [] as string[],
  content: '',
  answer: '',
  judgeConfig: {
    timeLimit: 1000,
    memoryLimit: 256,
  },
  judgeCase: [
    {
      input: '',
      output: '',
    },
  ],
})

const route = useRoute()
const router = useRouter()
const loading = ref<boolean>(false)

/**
 * 提交表单
 * @param values
 */
const handleSubmit = async (values: any) => {
  loading.value = true
  const id = route.query?.id
  try {
    let res
    if (id) {
      res = await editQuestionUsingPost({
        id: id,
        ...values,
        judgeConfig: {
          timeLimit: form.value.judgeConfig?.timeLimit ?? 1000,
          memoryLimit: form.value.judgeConfig?.memoryLimit ?? 256,
        },
      })
    } else {
      res = await addQuestionUsingPost({
        ...values,
        judgeConfig: {
          timeLimit: form.value.judgeConfig?.timeLimit ?? 1000,
          memoryLimit: form.value.judgeConfig?.memoryLimit ?? 256,
        },
      })
    }
    if (res.data.code === 0 && res.data.data) {
      message.success('提交成功')
      const questionId = res.data.data
      // 跳转到题目详情页
      router.push({
        path: `/question/${questionId}`,
      })
    } else {
      message.error('提交失败，' + res.data.message)
    }
  } catch (error: any) {
    message.error('提交失败，' + error.message)
  } finally {
    loading.value = false
  }
}

// 添加测试用例
const addCase = () => {
  form.value.judgeCase?.push({ input: '', output: '' })
}

// 删除测试用例
const removeCase = (index: number) => {
  form.value.judgeCase?.splice(index, 1)
}

const onContentChange = (value: string) => {
  form.value.content = value
}
const onAnswerChange = (value: string) => {
  form.value.answer = value
}

const categoryOptions = ref<string[]>([])
const tagOptions = ref<string[]>([])

// 获取标签和分类选项
const getTagCategoryOptions = async () => {
  const res = await listQuestionTagCategoryUsingGet()
  if (res.data.code === 0 && res.data.data) {
    // 转换成下拉选项组件接受的格式
    tagOptions.value = (res.data.data.tagList ?? []).map((data: string) => {
      return {
        value: data,
        label: data,
      }
    })
    categoryOptions.value = (res.data.data.categoryList ?? []).map((data: string) => {
      return {
        value: data,
        label: data,
      }
    })
  } else {
    message.error('加载选项失败，' + res.data.message)
  }
}

onMounted(() => {
  getTagCategoryOptions()
})

// // 获取老数据
const getOldQuestion = async () => {
  // 获取数据
  const id = route.query?.id
  if (id) {
    const res = await getQuestionByIdUsingGet({
      id: id,
    })
    if (res.data.code === 0 && res.data.data) {
      form.value = res.data.data
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any)
      form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any)
      form.value.tags = JSON.parse(form.value.tags as any)
    }
  }
}

onMounted(() => {
  getOldQuestion()
})
</script>
<style scoped>
#addQuestionView {
  max-width: 720px;
  margin: 0 auto;
}
</style>
