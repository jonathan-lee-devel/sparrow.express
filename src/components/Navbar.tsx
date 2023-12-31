import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import {ANONYMOUS_USER, UserAccountNav} from './UserAccountNav'
import SearchBar from './SearchBar'
import Image from 'next/image';

const Navbar = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2'>
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
        {/* logo */}
        <Link href='/' className='flex gap-2 items-center'>
          <Image src={'/favicon.ico'} width={40} height={30} alt={'Sparrow Logo'} className='h-8 w-8 sm:h-6 sm:w-6' />
          <p className='hidden text-zinc-700 text-sm font-medium md:block'>Sparrow</p>
        </Link>

        {/* search bar */}
        <SearchBar />

        {/* actions */}
        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
            <UserAccountNav user={ANONYMOUS_USER} />
        )}
      </div>
    </div>
  )
}

export default Navbar
