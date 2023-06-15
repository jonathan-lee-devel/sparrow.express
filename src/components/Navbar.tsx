import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { buttonVariants } from './ui/Button'
import { UserAccountNav } from './UserAccountNav'
import Image from "next/image";

const Navbar = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div className='fixed top-0 inset-x-0 h-fit bg-slate-500 border-b border-black z-[10] py-2'>
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
        {/* logo */}
        <Link href='/' className='flex gap-2 items-center'>
          <Image src={'/favicon.ico'} alt={'Sparrow'} width={30} height={30} />
          <p className='hidden text-amber-500 text-sm font-medium md:block'>Sparrow</p>
        </Link>

        {/* actions */}
        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href='/sign-in' className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
