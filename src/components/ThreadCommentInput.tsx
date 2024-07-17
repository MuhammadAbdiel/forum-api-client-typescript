import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { ThreadCommentInputProps } from './components.types'

const commentSchema = z.object({
  content: z
    .string()
    .max(320, { message: 'Comment cannot exceed 320 characters' }),
})

export default function ThreadCommentInput({
  onCommentThread,
}: ThreadCommentInputProps) {
  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: '',
    },
  })

  const handleCreate = async (data: any) => {
    await onCommentThread(data)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreate)} className='mt-5'>
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  rows={10}
                  placeholder='Comment this thread'
                  {...field}
                  className='w-full border border-gray-300 rounded-md'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className='text-right text-sm text-gray-500 mt-3'>
          {form.watch('content')?.length || 0}/320
        </p>
        <Button type='submit' className='w-full text-white mt-5'>
          Comment
        </Button>
      </form>
    </Form>
  )
}
