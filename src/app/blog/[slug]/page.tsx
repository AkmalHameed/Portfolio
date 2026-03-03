import { getBlogPost } from '@/lib/api'
import { getStrapiMedia, formatDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FaArrowLeft, FaClock, FaUser } from 'react-icons/fa'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post: any = null

  try {
    const response = await getBlogPost(params.slug)
    post = response.data?.[0] || null
  } catch (error) {
    console.error('Error fetching blog post:', error)
  }

  if (!post) {
    notFound()
  }

  const { title, content, cover_image, published_at, published, author, excerpt } = post.attributes

  return (
    <div className="container mx-auto px-4 py-12">
      <Link 
        href="/blog" 
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8"
      >
        <FaArrowLeft className="mr-2" />
        Back to Blog
      </Link>

      <article className="max-w-4xl mx-auto">
        {cover_image && (
          <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={getStrapiMedia(cover_image) || '/placeholder.jpg'}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            {author && (
              <div className="flex items-center">
                <FaUser className="mr-2" />
                <span>{author}</span>
              </div>
            )}
            <div className="flex items-center">
              <FaClock className="mr-2" />
              <span>{formatDate(published_at || published || '')}</span>
            </div>
          </div>

          {excerpt && (
            <p className="text-xl text-gray-600 italic border-l-4 border-primary-600 pl-4">
              {excerpt}
            </p>
          )}
        </header>

        <div className="prose prose-lg max-w-none mb-12">
        <div className="text-gray-800 leading-relaxed space-y-4">
        {typeof content === 'string' 
      ? content 
      : content?.map((block: any, index: number) => {
          if (block.type === 'paragraph') {
            return (
              <p key={index}>
                {block.children.map((child: any) => child.text).join('')}
              </p>
            )
          }
          return null
        })
    }
  </div>
</div>

        <hr className="my-12 border-gray-300" />

        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
              {author ? author.charAt(0).toUpperCase() : 'A'}
            </div>
            <div>
              <h3 className="text-xl font-bold">{author || 'Author'}</h3>
              <p className="text-gray-600">Full-Stack Developer</p>
            </div>
          </div>
          <p className="text-gray-700">
            Passionate about building modern web applications and sharing knowledge through technical blog posts.
          </p>
        </div>

        <div className="bg-primary-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Want to Discuss This Topic?</h3>
          <p className="mb-6">
            I'd love to hear your thoughts or answer any questions you might have.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-semibold"
          >
            Get in Touch
          </Link>
        </div>
      </article>
    </div>
  )
}