import SubscribeLeaveToggle from '@/components/SubscribeLeaveToggle'
import ToFeedButton from '@/components/ToFeedButton'
import {buttonVariants} from '@/components/ui/Button'
import {getAuthSession} from '@/lib/auth'
import {db} from '@/lib/db'
import {format} from 'date-fns'
import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {ReactNode} from 'react'

export const metadata: Metadata = {
    title: 'Sparrow',
    description: 'A Reddit clone built with Next.js and TypeScript.',
}

const Layout = async ({
                          children,
                          params: {slug},
                      }: {
    children: ReactNode
    params: { slug: string }
}) => {
    const session = await getAuthSession()

    const organization = await db.organization.findFirst({
        where: {name: slug},
        include: {
            posts: {
                include: {
                    author: true,
                    votes: true,
                },
            },
        },
    })

    const subscription = !session?.user
        ? undefined
        : await db.subscription.findFirst({
            where: {
                organization: {
                    name: slug,
                },
                user: {
                    id: session.user.id,
                },
            },
        })

    const isSubscribed = !!subscription

    if (!organization) return notFound()

    const memberCount = await db.subscription.count({
        where: {
            organization: {
                name: slug,
            },
        },
    })

    return (
        <>
            <div>
                <div className={'mb-5'}>
                    <ToFeedButton/>
                </div>
                <div className={'h-screen flex items-center justify-center'}>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>
                        <div className='rounded-lg border border-gray-200'>
                            <div className='px-6 py-4'>
                                <p className='font-semibold text-amber-500 py-3'>About org/{organization.name}</p>
                            </div>
                            <dl className='divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white'>
                                <div className='flex justify-between gap-x-4 py-3'>
                                    <dt className='text-gray-500'>Created</dt>
                                    <dd className='text-gray-700'>
                                        <time dateTime={organization.createdAt.toDateString()}>
                                            {format(organization.createdAt, 'MMMM d, yyyy')}
                                        </time>
                                    </dd>
                                </div>
                                <div className='flex justify-between gap-x-4 py-3'>
                                    <dt className='text-gray-500'>Members</dt>
                                    <dd className='flex items-start gap-x-2'>
                                        <div className='text-gray-900'>{memberCount}</div>
                                    </dd>
                                </div>
                                {organization.creatorId === session?.user?.id ? (
                                    <div className='flex justify-between gap-x-4 py-3'>
                                        <dt className='text-gray-500'>You created this community</dt>
                                    </div>
                                ) : null}

                                {organization.creatorId !== session?.user?.id ? (
                                    <SubscribeLeaveToggle
                                        isSubscribed={isSubscribed}
                                        organizationId={organization.id}
                                        organizationName={organization.name}
                                    />
                                ) : null}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout
