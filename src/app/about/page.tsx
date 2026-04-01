import { getAbout } from '@/lib/api'
import Image from 'next/image'

export default async function AboutPage() {
  let aboutData: any = null
  try {
    const response = await getAbout()
    aboutData = response.data
  } catch (error) {
    console.error('Error fetching about data:', error)
  }

  const skillsArray = aboutData?.attributes?.skills
    ? typeof aboutData.attributes.skills === 'string'
      ? aboutData.attributes.skills.split(',').map((s: string) => s.trim())
      : aboutData.attributes.skills
    : []

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About Me</h1>

      <div className="max-w-4xl mx-auto">
        {/* Photo + Bio side by side */}
        <div className="flex flex-col md:flex-row gap-10 items-center mb-12">
          {/* Left - Photo */}
          <div className="flex-shrink-0">
            <div className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/profile.jpg"
                alt="Akmal Hameed"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right - Bio */}
          <div className="flex-1">
            <p className="text-xl text-gray-700 leading-relaxed">
              {aboutData?.attributes?.bio || 'Full-Stack Developer and Computer Programming & Analysis student at Durham College. Passionate about building clean, functional web applications.'}
            </p>
          </div>
        </div>

        {/* Skills */}
        {skillsArray.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skillsArray.map((skill: string, index: number) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition">
                  <span className="font-semibold text-gray-800">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
