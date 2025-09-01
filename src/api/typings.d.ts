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

  type ApiResponsePageUserVo_ = {
    code?: number
    data?: PageUserVo_
    message?: string
  }

  type ApiResponseString_ = {
    code?: number
    data?: string
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

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type getUserVoByIdUsingGETParams = {
    /** id */
    id?: number
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

  type PageUserVo_ = {
    current?: number
    pages?: number
    records?: UserVo[]
    size?: number
    total?: number
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
