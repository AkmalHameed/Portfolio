import Link from 'next/link'
import Image from 'next/image'
import { getStrapiMedia } from '@/lib/utils'

interface ProjectCardProps {
  project: {
    id: number
    attributes: {
      title: string
      description: string
      slug: string
      image?: any
      tech_stack?: string
    }
  }
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, description, slug, image, tech_stack } = project.attributes

  // Convert tech_stack string to array
  const techArray = tech_stack ? tech_stack.split(',').map(t => t.trim()) : []

  return (
    <Link href={`/projects/${slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Project Image - show placeholder if no image */}
        <div className="relative h-48 w-full bg-gradient-to-br from-primary-400 to-primary-600">
          {image ? (
            <Image
              src={getStrapiMedia(image) || '/placeholder.jpg'}
              alt={title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-white text-4xl font-bold">
                {title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Project Info */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 hover:text-primary-600 transition">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {description}
          </p>

          {/* Tech Stack */}
          {techArray.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {techArray.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard