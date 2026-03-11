import Link from 'next/link'
import { getProjects, getBlogPosts } from '@/lib/api'
import ProjectCard from '@/components/ProjectCard'
import BlogCard from '@/components/BlogCard'

export default async function Home() {
  // Fetch data from Strapi
  let projects = [];
  let blogPosts = [];

  try {
    const projectsData = await getProjects();
    projects = projectsData.data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
  }

  try {
    const blogData = await getBlogPosts();
    blogPosts = blogData.data || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Full-Stack Developer and Computer Programming & Analysis student at Durham College. Passionate about building clean, functional web applications.
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/projects"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
          >
            View Projects
          </Link>
          <Link 
            href="/contact"
            className="border border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition"
          >
            Contact Me
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <Link 
            href="/projects"
            className="text-primary-600 hover:text-primary-700"
          >
            View all →
          </Link>
        </div>
        
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              No projects yet. Add some content in Strapi!
            </p>
          </div>
        )}
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest Blog Posts</h2>
          <Link 
            href="/blog"
            className="text-primary-600 hover:text-primary-700"
          >
            View all →
          </Link>
        </div>
        
        {blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post: any) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              No blog posts yet. Add some content in Strapi!
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center bg-primary-600 text-white rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
        <Link 
          href="/contact"
          className="bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition inline-block"
        >
          Get in Touch
        </Link>
      </section>
    </div>
  )
}
