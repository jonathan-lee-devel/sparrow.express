import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

const page = async ({ params }: PageProps) => {
  const { slug } = params

  const organization = await db.organization.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          organization: true,
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
      },
    },
  })

  if (!organization) return notFound()

  return (
    <>
      <h1 className='font-bold text-amber-500 text-3xl md:text-4xl h-14'>
        org/{organization.name}
      </h1>
    </>
  )
}

export default page
