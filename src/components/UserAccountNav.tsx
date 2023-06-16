'use client'

import Link from 'next/link'
import {User} from 'next-auth'
import {signOut} from 'next-auth/react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import {UserAvatar} from '@/components/UserAvatar'
import {useRouter} from "next/navigation";

export const ANONYMOUS_USER = {
    name: 'Anonymous',
    email: 'anonymous@mail.com',
    image: '/anonymous_user.png'
}


interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
    user: Pick<User, 'name' | 'image' | 'email'>
}

export function UserAccountNav({user}: UserAccountNavProps) {
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                    id={'user-image-dropdown-button'}
                    user={{name: user.name || null, image: user.image || null}}
                    className='h-8 w-8'
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-white' align='end'>
                <div className='flex items-center justify-start gap-2 p-2'>
                    <div className='flex flex-col space-y-1 leading-none'>
                        {user.name && <p className='font-medium'>{user.name}</p>}
                        {user.email && (
                            <p className='w-[200px] truncate text-sm text-muted-foreground'>
                                {user.email}
                            </p>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={() => {router.push('/', {forceOptimisticNavigation: true})}} asChild>
                    <Link href='/'>Feed</Link>
                </DropdownMenuItem>

                {user !== ANONYMOUS_USER ? (
                        <>
                            <DropdownMenuItem onClick={() => {router.push('/org/create', {forceOptimisticNavigation: true})}} asChild>
                                <Link href='/org/create'>Create Organization</Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => {router.push('/settings', {forceOptimisticNavigation: true})}} asChild>
                                <Link href='/settings'>Settings</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem
                                className='cursor-pointer'
                                onSelect={(event) => {
                                    event.preventDefault()
                                    signOut({
                                        callbackUrl: `${window.location.origin}/sign-in`
                                    })
                                }}>
                                Sign out
                            </DropdownMenuItem>
                        </>) :
                    (

                        <DropdownMenuItem onClick={() => {router.push('/sign-in', {forceOptimisticNavigation: true})}} className={'cursor-pointer'}>
                            <Link id={'user-image-dropdown-button-sign-in'} href={'/sign-in'}>Sign In</Link>
                        </DropdownMenuItem>
                    )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
