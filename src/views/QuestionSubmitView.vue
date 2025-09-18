<template>
  <div id="questionSubmitView">
    <a-flex justify="space-between">
      <h2>题目提交详情</h2>
    </a-flex>
    <!--  搜索框-->
    <a-form layout="inline" :model="searchParams" @finish="doSearch">
      <a-form-item label="题目编号" name="questionId">
        <a-input
          v-model:value="searchParams.questionId"
          placeholder="请输入题目 id"
          allow-clear
          type="number"
        />
      </a-form-item>
      <a-form-item label="编程语言" name="la">
        <a-input v-model:value="searchParams.language" placeholder="请输入变成语言" allow-clear />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">搜索</a-button>
      </a-form-item>
    </a-form>
    <div style="margin-bottom: 16px" />
    <!--  表格-->
    <a-table
      :columns="columns"
      :data-source="dataList"
      :pagination="pagination"
      @change="doTableChange"
    >
      <template #bodyCell="{ column, record }">
        <!-- 标签 -->
        <template v-if="column.dataIndex === 'judgeInfo'">
          <a-space wrap>
            <a-tooltip placement="topLeft" :title="record.judgeInfo.message">
              <span>{{ record.judgeInfo.message?.length > 50 ? record.judgeInfo.message?.slice(0, 50) + '...' : record.judgeInfo.message }}</span>
            </a-tooltip>
            <a-tag color="green"
              >耗时: {{ record.judgeInfo.time ? record.judgeInfo.time + ' ms' : '-' }}</a-tag
            >
            <a-tag color="purple"
              >内存:
              {{
                record.judgeInfo.memory
                  ? (record.judgeInfo.memory / 1024 / 1024).toFixed(2) + ' MB'
                  : '-'
              }}</a-tag
            >
            <a-tag color="orange"
              >通过: {{ record.judgeInfo.pass }}/{{ record.judgeInfo.total }}</a-tag
            >
          </a-space>
        </template>
        <template v-else-if="column.dataIndex === 'status'">
          {{ JUDGE_STATUS_MAP[record.status] }}
        </template>
        <template v-else-if="column.dataIndex === 'username'">
          {{ record.userVo.username }}
        </template>
        <template v-else-if="column.dataIndex === 'createTime'">
          {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, reactive, ref} from 'vue'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'
import { listQuestionSubmitByPageUsingPost } from '@/api/questionSubmitController'
import { JUDGE_STATUS_MAP } from '@/constants/questionSubmit'

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    width: 80,
  },
  {
    title: '编程语言',
    dataIndex: 'language',
  },
  {
    title: '判题信息',
    dataIndex: 'judgeInfo',
  },
  {
    title: '判题状态',
    dataIndex: 'status',
  },
  {
    title: '题目ID',
    dataIndex: 'questionId',
    width: 80,
  },
  {
    title: '提交者',
    dataIndex: 'username',
    width: 80,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
]

// 数据
const dataList = ref([])
const total = ref(0)

// 搜索条件
const searchParams = reactive<API.QuestionSubmitQueryRequest>({
  current: 1,
  pageSize: 10,
  sortField: 'create_time',
  sortOrder: 'descend',
})

// 分页参数
const pagination = computed(() => {
  return {
    current: searchParams.current ?? 1,
    pageSize: searchParams.pageSize ?? 10,
    total: total.value,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条`,
  }
})

// 获取数据
const fetchData = async () => {
  const res = await listQuestionSubmitByPageUsingPost({
    ...searchParams,
  })
  if (res.data.data) {
    dataList.value = res.data.data.records ?? []
    total.value = res.data.data.total ?? 0
  } else {
    message.error('获取数据失败，' + res.data.message)
  }
}

// 页面加载时请求一次
onMounted(() => {
  fetchData()
})

// 获取数据
const doSearch = () => {
  // 重置搜索条件
  searchParams.current = 1
  fetchData()
}

// 表格变化处理
const doTableChange = (page: any) => {
  searchParams.current = page.current
  searchParams.pageSize = page.pageSize
  fetchData()
}

let timer: any = null

// 页面加载时请求一次
onMounted(() => {
  fetchData()
  timer = setInterval(() => {
    fetchData()
  }, 5000)
})

// 页面卸载时清理定时器
onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})
</script>
<style scoped>
#questionSubmitView {
}
</style>
