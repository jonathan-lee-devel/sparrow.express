import CustomFeed from '@/components/homepage/CustomFeed'
import GeneralFeed from '@/components/homepage/GeneralFeed'
import { getAuthSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Home() {
  const session = await getAuthSession()

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>
        {/* @ts-expect-error server component */}
        {session ? <CustomFeed /> : <GeneralFeed />}
      </div>
    </>
  )
}
