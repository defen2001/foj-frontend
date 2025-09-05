declare namespace API {
  type ApiResponseBoolean_ = {
    code?: number
    data?: boolean
    message?: string
  }

  type ApiResponseLoginUserVo_ = {
    code?: number
    data?: LoginUserVo
    message?: string
  }

  type ApiResponseLong_ = {
    code?: number
    data?: number
    message?: string
  }

  type ApiResponsePageQuestion_ = {
    code?: number
    data?: PageQuestion_
    message?: string
  }

  type ApiResponsePageQuestionSubmitVo_ = {
    code?: number
    data?: PageQuestionSubmitVo_
    message?: string
  }

  type ApiResponsePageQuestionVo_ = {
    code?: number
    data?: PageQuestionVo_
    message?: string
  }

  type ApiResponsePageUserVo_ = {
    code?: number
    data?: PageUserVo_
    message?: string
  }

  type ApiResponseQuestion_ = {
    code?: number
    data?: Question
    message?: string
  }

  type ApiResponseQuestionTagCategory_ = {
    code?: number
    data?: QuestionTagCategory
    message?: string
  }

  type ApiResponseQuestionVo_ = {
    code?: number
    data?: QuestionVo
    message?: string
  }

  type ApiResponseUser_ = {
    code?: number
    data?: User
    message?: string
  }

  type ApiResponseUserVo_ = {
    code?: number
    data?: UserVo
    message?: string
  }

  type DeleteRequest = {
    id?: number
  }

  type getQuestionByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type getQuestionVoByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type getUserVoByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type JudgeCase = {
    input?: string
    output?: string
  }

  type JudgeConfig = {
    memoryLimit?: number
    stackLimit?: number
    timeLimit?: number
  }

  type JudgeInfo = {
    memory?: number
    message?: string
    time?: number
  }

  type LoginUserVo = {
    createTime?: string
    editTime?: string
    id?: number
    updateTime?: string
    userAccount?: string
    userAvatar?: string
    userProfile?: string
    userRole?: string
    username?: string
  }

  type PageQuestion_ = {
    current?: number
    pages?: number
    records?: Question[]
    size?: number
    total?: number
  }

  type PageQuestionSubmitVo_ = {
    current?: number
    pages?: number
    records?: QuestionSubmitVo[]
    size?: number
    total?: number
  }

  type PageQuestionVo_ = {
    current?: number
    pages?: number
    records?: QuestionVo[]
    size?: number
    total?: number
  }

  type PageUserVo_ = {
    current?: number
    pages?: number
    records?: UserVo[]
    size?: number
    total?: number
  }

  type Question = {
    acceptedNum?: number
    answer?: string
    category?: string
    content?: string
    createTime?: string
    editTime?: string
    id?: number
    isDelete?: number
    judgeCase?: string
    judgeConfig?: string
    submitNum?: number
    tags?: string
    title?: string
    updateTime?: string
    userId?: number
  }

  type QuestionAddRequest = {
    answer?: string
    category?: string
    content?: string
    judgeCase?: JudgeCase[]
    judgeConfig?: JudgeConfig
    tags?: string[]
    title?: string
  }

  type QuestionEditRequest = {
    answer?: string
    category?: string
    content?: string
    id?: number
    judgeCase?: JudgeCase[]
    judgeConfig?: JudgeConfig
    tags?: string[]
    title?: string
  }

  type QuestionQueryRequest = {
    answer?: string
    category?: string
    content?: string
    current?: number
    id?: number
    pageSize?: number
    sortField?: string
    sortOrder?: string
    tags?: string[]
    title?: string
    userId?: number
  }

  type QuestionSubmitAddRequest = {
    code?: string
    language?: string
    questionId?: number
  }

  type QuestionSubmitQueryRequest = {
    current?: number
    language?: string
    pageSize?: number
    questionId?: number
    sortField?: string
    sortOrder?: string
    status?: number
    userId?: number
  }

  type QuestionSubmitVo = {
    code?: string
    createTime?: string
    id?: number
    judgeInfo?: JudgeInfo
    language?: string
    questionId?: number
    questionVO?: QuestionVo
    status?: number
    updateTime?: string
    userId?: number
    userVo?: UserVo
  }

  type QuestionTagCategory = {
    categoryList?: string[]
    tagList?: string[]
  }

  type QuestionUpdateRequest = {
    answer?: string
    category?: string
    content?: string
    id?: number
    judgeCase?: JudgeCase[]
    judgeConfig?: JudgeConfig
    tags?: string[]
    title?: string
  }

  type QuestionVo = {
    acceptedNum?: number
    category?: string
    content?: string
    createTime?: string
    id?: number
    judgeConfig?: JudgeConfig
    submitNum?: number
    tags?: string[]
    title?: string
    updateTime?: string
    userId?: number
    userVo?: UserVo
  }

  type User = {
    createTime?: string
    editTime?: string
    id?: number
    isDelete?: number
    updateTime?: string
    userAccount?: string
    userAvatar?: string
    userPassword?: string
    userProfile?: string
    userRole?: string
    username?: string
  }

  type UserAddRequest = {
    userAccount?: string
    userAvatar?: string
    userProfile?: string
    userRole?: string
    username?: string
  }

  type UserLoginRequest = {
    userAccount?: string
    userPassword?: string
  }

  type UserQueryRequest = {
    current?: number
    id?: number
    pageSize?: number
    sortField?: string
    sortOrder?: string
    userAccount?: string
    userProfile?: string
    userRole?: string
    username?: string
  }

  type UserRegisterRequest = {
    confirmPassword?: string
    userAccount?: string
    userPassword?: string
  }

  type UserUpdateRequest = {
    id?: number
    userAvatar?: string
    userProfile?: string
    userRole?: string
    username?: string
  }

  type UserVo = {
    createTime?: string
    id?: number
    updateTime?: string
    userAccount?: string
    userAvatar?: string
    userProfile?: string
    userRole?: string
    username?: string
  }
}
