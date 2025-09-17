// 判题级别枚举
export const JUDGE_STATUS_ENUM = {
  WAITING: 0,
  RUNNING: 1,
  SUCCESS: 2,
  FAILED: 3,
} as const

// 判题级别映射
export const JUDGE_STATUS_MAP: Record<number, string> = {
  0: '等待中',
  1: '判题中',
  2: '成功',
  3: '失败',
}

export const JUDGE_STATUS_OPTIONS = Object.keys(JUDGE_STATUS_MAP).map((key) => {
  const value = Number(key) // Convert string key to number
  return {
    label: JUDGE_STATUS_MAP[value],
    value,
  }
})
