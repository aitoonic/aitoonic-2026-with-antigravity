import { getCategories, getTools } from '@/lib/api'
import Link from 'next/link'

export const revalidate = 3600

export default async function HtmlSitemapPage() {
  const [categories, tools] = await Promise.all([getCategories(), getTools(200)])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">HTML Sitemap</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
          <ul className="list-disc pl-5 space-y-2">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link href={`/category/${cat.slug}/`} className="text-blue-600 hover:text-blue-700">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">Latest Tools</h2>
          <ul className="list-disc pl-5 space-y-2">
            {tools.map((tool) => (
              <li key={tool.id}>
                <Link href={`/ai/${tool.slug}/`} className="text-blue-600 hover:text-blue-700">
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}


