import { NextResponse } from 'next/server'
import { generateToolsSitemapXml } from '@/lib/seo/sitemap'

export async function GET() {
  const xml = await generateToolsSitemapXml()
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
      'Cache-Control': 'public, s-maxage=0, stale-while-revalidate=60'
    }
  })
}


