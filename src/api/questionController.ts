// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** addQuestion POST /api/question/add */
export async function addQuestionUsingPost(
  body: API.QuestionAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseLong_>('/api/question/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** deleteQuestion POST /api/question/delete */
export async function deleteQuestionUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseBoolean_>('/api/question/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** editQuestion POST /api/question/edit */
export async function editQuestionUsingPost(
  body: API.QuestionEditRequest,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseBoolean_>('/api/question/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** getQuestionById GET /api/question/get */
export async function getQuestionByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseQuestion_>('/api/question/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** getQuestionVoById GET /api/question/get/vo */
export async function getQuestionVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionVoByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseQuestionVo_>('/api/question/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** listQuestionByPage POST /api/question/list/page */
export async function listQuestionByPageUsingPost(
  body: API.QuestionQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponsePageQuestion_>('/api/question/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** listQuestionVoByPage POST /api/question/list/page/vo */
export async function listQuestionVoByPageUsingPost(
  body: API.QuestionQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponsePageQuestionVo_>('/api/question/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** listMyQuestionVoByPage POST /api/question/my/list/page/vo */
export async function listMyQuestionVoByPageUsingPost(
  body: API.QuestionQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponsePageQuestionVo_>('/api/question/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** listQuestionTagCategory GET /api/question/tag_category */
export async function listQuestionTagCategoryUsingGet(options?: { [key: string]: any }) {
  return request<API.ApiResponseQuestionTagCategory_>('/api/question/tag_category', {
    method: 'GET',
    ...(options || {}),
  })
}

/** updateQuestion POST /api/question/update */
export async function updateQuestionUsingPost(
  body: API.QuestionUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseBoolean_>('/api/question/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
