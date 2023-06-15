import UserAuthForm from '@/components/UserAuthForm'
import Link from 'next/link'
import Image from "next/image";

const SignIn = () => {
  return (
    <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
      <div className='flex flex-col space-y-2 text-center items-center'>
        <Image src={'/favicon.ico'} alt={'Sparrow'} width={30} height={30} />
        <h1 className='text-2xl font-semibold tracking-tight'>Welcome!</h1>
        <p className='text-sm max-w-xs mx-auto'>
          By continuing, you are setting up a Sparrow account and agree to our
          User Agreement and Privacy Policy.
        </p>
      </div>
      <UserAuthForm />
    </div>
  )
}

export default SignIn
