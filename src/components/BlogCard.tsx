import Link from 'next/link'
import Image from 'next/image'
import { getStrapiMedia, formatDate } from '@/lib/utils'

interface BlogCardProps {
  post: {
    id: number
    attributes: {
      title: string
      excerpt?: string
      slug: string
      cover_image?: any
      published_at?: string
      published?: string
      author?: string
    }
  }
}

const BlogCard = ({ post }: BlogCardProps) => {
  const { title, excerpt, slug, cover_image, published_at, published, author } = post.attributes

  return (
    <Link href={`/blog/${slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Cover Image */}
        {cover_image && (
          <div className="relative h-48 w-full">
            <Image
              src={getStrapiMedia(cover_image) || '/placeholder.jpg'}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Post Info */}
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>{formatDate(published_at || published || (post.attributes as any).publishedAt || '')}</span>
            {author && (
              <>
                <span className="mx-2">•</span>
                <span>{author}</span>
              </>
            )}
          </div>

          <h3 className="text-xl font-bold mb-2 hover:text-primary-600 transition">
            {title}
          </h3>

          {excerpt && (
            <p className="text-gray-600 line-clamp-3">
              {excerpt}
            </p>
          )}

          <div className="mt-4">
            <span className="text-primary-600 font-semibold hover:text-primary-700">
              Read more →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard