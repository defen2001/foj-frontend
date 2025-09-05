// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** doQuestionSubmit POST /api/question_submit/ */
export async function doQuestionSubmitUsingPost(
  body: API.QuestionSubmitAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseLong_>('/api/question_submit/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** listQuestionSubmitByPage POST /api/question_submit/list/page/vo */
export async function listQuestionSubmitByPageUsingPost(
  body: API.QuestionSubmitQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponsePageQuestionSubmitVo_>('/api/question_submit/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
