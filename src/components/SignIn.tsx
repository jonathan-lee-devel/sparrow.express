import UserAuthForm from '@/components/UserAuthForm'
import Image from "next/image";

const SignIn = () => {
  return (
    <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
      <div className='flex flex-col space-y-2 text-center'>
          <Image src={'/favicon.ico'} width={30} height={30} alt={'Sparrow Logo'} className='h-8 w-8 sm:h-6 sm:w-6' />
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
