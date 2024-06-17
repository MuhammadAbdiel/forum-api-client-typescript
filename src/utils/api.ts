import {
  RegisterPayload,
  LoginPayload,
  CreateThreadPayload,
  User,
  Thread,
  ThreadList,
  ThreadDetail,
  CommentDetail,
  Reply,
  AuthResponse,
  ApiResponse,
} from './api.types'

const api = (() => {
  const BASE_URL = 'http://localhost:3000'

  async function _fetchWithAuth(
    url: string,
    options: RequestInit = {},
  ): Promise<Response> {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
  }

  function putAccessToken(token: string): void {
    localStorage.setItem('token', token)
  }

  function getAccessToken(): string | null {
    return localStorage.getItem('token')
  }

  async function register({
    username,
    password,
    fullname,
  }: RegisterPayload): Promise<User> {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, fullname }),
    })

    const responseJson: ApiResponse<{ addedUser: User }> = await response.json()
    const { status } = responseJson

    if (status !== 'success') {
      throw new Error(responseJson.message)
    }

    const {
      data: { addedUser },
    } = responseJson
    return addedUser
  }

  async function login({
    username,
    password,
  }: LoginPayload): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/authentications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    const responseJson: ApiResponse<AuthResponse> = await response.json()
    const { status } = responseJson

    if (status !== 'success') {
      throw new Error(responseJson.message)
    }

    const {
      data: { accessToken, refreshToken },
    } = responseJson
    return { accessToken, refreshToken }
  }

  async function getOwnProfile(): Promise<User> {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`)
    const responseJson: ApiResponse<{ user: User }> = await response.json()
    const { status } = responseJson

    if (status !== 'success') {
      throw new Error(responseJson.message)
    }

    const {
      data: { user },
    } = responseJson
    return user
  }

  async function getUserById(userId: string): Promise<User> {
    const response = await _fetchWithAuth(`${BASE_URL}/users/${userId}`)
    const responseJson: ApiResponse<{ user: User }> = await response.json()
    const { status } = responseJson

    if (status !== 'success') {
      throw new Error(responseJson.message)
    }

    const {
      data: { user },
    } = responseJson
    return user
  }

  async function createThread({
    title,
    body,
  }: CreateThreadPayload): Promise<Thread> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    })

    const responseJson: ApiResponse<{ addedThread: Thread }> =
      await response.json()
    const { status } = responseJson

    if (status !== 'success') {
      throw new Error(responseJson.message)
    }

    const {
      data: { addedThread },
    } = responseJson
    return addedThread
  }

  async function getAllThread(): Promise<ThreadList[]> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`)

    const responseJson: ApiResponse<{ threads: ThreadList[] }> =
      await response.json()
    const { status } = responseJson

    if (status !== 'success') {
      throw new Error(responseJson.message)
    }

    const {
      data: { threads },
    } = responseJson
    return threads
  }

  async function getThreadById(threadId: string): Promise<ThreadDetail> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}`)

    const responseJson: ApiResponse<{ thread: ThreadDetail }> =
      await response.json()
    const { status } = responseJson

    if (status !== 'success') {
      throw new Error(responseJson.message)
    }

    const {
      data: { thread },
    } = responseJson
    return thread
  }

  async function createComment(
    threadId: string,
    { content }: { content: string },
  ): Promise<Comment> {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      },
    )

    const responseJson: ApiResponse<{ addedComment: Comment }> =
      await response.json()
    const { status } = responseJson

    if (status !== 'success') {
      throw new Error(responseJson.message)
    }

    const {
      data: { addedComment },
    } = responseJson
    return addedComment
  }

  async function deleteComment(
    threadId: string,
    commentId: string,
  ): Promise<void> {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}`,
      {
        method: 'DELETE',
      },
    )

    const responseJson: ApiResponse<null> = await response.json()
    const { status } = responseJson

    if (status !== 'success') {
      throw new Error(responseJson.message)
    }
  }

  async function getCommentById(
    threadId: string,
    commentId: string,
  ): Promise<CommentDetail> {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}`,
    )

    const responseJson: ApiResponse<{ comment: CommentDetail }> =
      await response.json()
    const { status } = responseJson

    if (status !== 'success') {
      throw new Error(responseJson.message)
    }

    const {
      data: { comment },
    } = responseJson
    return comment
  }

  async function createReply(
    threadId: string,
    commentId: string,
    { content }: { content: string },
  ): Promise<Reply> {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/replies`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      },
    )

    const responseJson: ApiResponse<{ addedReply: Reply }> =
      await response.json()
    const { status } = responseJson

    if (status !== 'success') {
      throw new Error(responseJson.message)
    }

    const {
      data: { addedReply },
    } = responseJson
    return addedReply
  }

  async function deleteReply(
    threadId: string,
    commentId: string,
    replyId: string,
  ): Promise<void> {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/replies/${replyId}`,
      {
        method: 'DELETE',
      },
    )

    const responseJson: ApiResponse<null> = await response.json()
    const { status } = responseJson

    if (status !== 'success') {
      throw new Error(responseJson.message)
    }
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getUserById,
    createThread,
    getAllThread,
    getThreadById,
    createComment,
    deleteComment,
    getCommentById,
    createReply,
    deleteReply,
  }
})()

export default api
