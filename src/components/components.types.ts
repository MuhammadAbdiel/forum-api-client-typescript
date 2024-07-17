import {
  CommentDetail,
  CreateThreadPayload,
  LoginPayload,
  RegisterPayload,
  ReplyDetail,
  ThreadDetail,
} from '@/utils/types'

export type CommentReplyInputProps = {
  form: any
  handleReplySubmit: (data: any) => Promise<void>
}

export type CommentReplyItemProps = {
  commentId: string
  reply: ReplyDetail
  onDeleteReply: (commentId: string, replyId: string) => void
}

export type CommentItemProps = {
  comment: CommentDetail
  onDeleteComment: (commentId: string) => void
  onReplyComment: (commentId: string, data: any) => void
  commentId: string
  onDeleteReply: (commentId: string, replyId: string) => void
}

export type LoginInputProps = {
  form: any
  passwordType: string
  togglePasswordVisibility: () => void
  onLogin: ({ username, password }: LoginPayload) => void
}

export type RegisterInputProps = {
  form: any
  passwordType: string
  togglePasswordVisibility: () => void
  onRegister: ({ username, password, fullname }: RegisterPayload) => void
}

export type NavbarProps = {
  keyword: string
  onKeywordChangeHandler: (keyword: string) => void
}

export type ThreadCommentInputProps = {
  onCommentThread: ({ content }: { content: any }) => void
}

export type CreateThreadFormProps = {
  form: any
  onCreate: ({ title, body }: CreateThreadPayload) => void
}

export type ThreadDetailProps = {
  threadDetail: ThreadDetail
  onCommentThread: ThreadCommentInputProps['onCommentThread']
  comments: CommentDetail[]
  onDeleteComment: CommentItemProps['onDeleteComment']
  onReplyComment: CommentItemProps['onReplyComment']
  onDeleteReply: CommentItemProps['onDeleteReply']
}
