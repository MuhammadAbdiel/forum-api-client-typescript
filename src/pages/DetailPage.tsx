import { Button } from '@/components/ui/button'
import { Link, useParams } from 'react-router-dom'
import { asyncReceiveThreadDetail } from '@/states/threadDetail/action'
import { useEffect } from 'react'
import ThreadDetail from '@/components/ThreadDetail'
import {
  asyncAddComment,
  asyncDeleteComment,
  asyncReceiveComments,
} from '@/states/comments/action'
import Swal from 'sweetalert2'
import { asyncAddReply, asyncDeleteReply } from '@/states/replies/action'
import { useAppDispatch, useAppSelector } from '@/states/hooks'

export default function DetailPage() {
  const { id = '' } = useParams()
  const threadDetail = useAppSelector((state) => state.threadDetail)
  const comments = useAppSelector((state) => state.comments)
  const replies = useAppSelector((state) => state.replies)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id))
    dispatch(asyncReceiveComments(id))
  }, [id, dispatch, replies])

  const onCommentThread = ({ content }: { content: string }) => {
    dispatch(asyncAddComment(id, { content }))
  }

  const onDeleteComment = (commentId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Success!',
          text: 'Deleted Successful',
          icon: 'success',
        })

        dispatch(asyncDeleteComment(id, commentId))
      }
    })
  }

  const onReplyComment = (
    commentId: string,
    { content }: { content: string },
  ) => {
    dispatch(asyncAddReply(id, commentId, { content }))
  }

  const onDeleteReply = (commentId: string, replyId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Success!',
          text: 'Deleted Successful',
          icon: 'success',
        })

        dispatch(asyncDeleteReply(id, commentId, replyId))
      }
    })
  }

  if (!threadDetail) {
    return null
  }

  return (
    <div className='container mx-auto lg:px-36 md:px-8 flex flex-1 flex-col gap-4 py-4 md:gap-8 md:py-8'>
      <Link to='/'>
        <Button>Back to Home</Button>
      </Link>
      <ThreadDetail
        // threadId={id}
        threadDetail={threadDetail}
        onCommentThread={onCommentThread}
        comments={comments}
        onDeleteComment={onDeleteComment}
        onReplyComment={onReplyComment}
        onDeleteReply={onDeleteReply}
      />
    </div>
  )
}
