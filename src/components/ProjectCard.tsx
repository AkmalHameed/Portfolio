cat > src/components/ProjectCard.tsx << 'EOF'
import Link from 'next/link'
import { getStrapiMedia } from '@/lib/utils'

const projectImages: { [key: string]: string } = {
  'mail-management-jwt': 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&q=80',
  'car-service-reservation': 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&q=80',
  'college-admissions-system': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
}

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
  const techArray = tech_stack ? tech_stack.split(',').map(t => t.trim()) : []
  const fallbackImage = projectImages[slug] || `https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80`

  const imageUrl = image?.data ? getStrapiMedia(image) : fallbackImage

  return (
    <Link href={`/projects/${slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 w-full">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 hover:text-primary-600 transition">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {description}
          </p>
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
EOF