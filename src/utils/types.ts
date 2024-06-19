export type RegisterPayload = {
  username: string
  password: string
  fullname: string
}

export type LoginPayload = {
  username: string
  password: string
}

export type CreateThreadPayload = {
  title: string
  body: string
}

export type User = {
  id: string
  username: string
  fullname: string
}

export type Thread = {
  id: string
  title: string
  owner: string
}

export type UsernameAndFullname = {
  username: string
  fullname: string
}

export type ThreadList = {
  id: string
  title: string
  body: string
  date: string
  user: UsernameAndFullname
}

export type ThreadDetail = {
  id: string
  title: string
  body: string
  date: string
  username: string
  fullname: string
  comments: CommentDetail[]
}

export type Comment = {
  id: string
  content: string
  owner: string
}

export type CommentDetail = {
  id: string
  content: string
  date: string
  username: string
  fullname: string
  replies: ReplyDetail[]
}

export type Reply = {
  id: string
  content: string
  owner: string
}

export type ReplyDetail = {
  id: string
  content: string
  date: string
  username: string
  fullname: string
}

export type AuthResponse = {
  accessToken: string
  refreshToken: string
}

export type ApiResponse<Type> = {
  status: string
  message: string
  data: Type
}
