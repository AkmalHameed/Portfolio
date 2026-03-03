import Link from 'next/link'
import { formatDate } from '@/lib/utils'

interface BlogCardProps {
  post: {
    id: number
    attributes: {
      title: string
      excerpt?: string
      slug: string
      published_at?: string
      published?: string
      publishedAt?: string
      author?: string
    }
  }
}

const BlogCard = ({ post }: BlogCardProps) => {
  const { title, excerpt, slug, published_at, published, publishedAt, author } = post.attributes
  const dateStr = published_at || published || publishedAt || ''

  return (
    <Link href={`/blog/${slug}`}>
      <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300'>
        <div className='h-48 w-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center'>
          <span className='text-white text-4xl font-bold'>{title.charAt(0)}</span>
        </div>
        <div className='p-6'>
          <div className='flex items-center text-sm text-gray-500 mb-2'>
            <span>{formatDate(dateStr)}</span>
            {author && (<><span className='mx-2'>•</span><span>{author}</span></>)}
          </div>
          <h3 className='text-xl font-bold mb-2 hover:text-primary-600 transition'>{title}</h3>
          {excerpt && <p className='text-gray-600 line-clamp-3'>{excerpt}</p>}
          <div className='mt-4'>
            <span className='text-primary-600 font-semibold hover:text-primary-700'>Read more →</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard
