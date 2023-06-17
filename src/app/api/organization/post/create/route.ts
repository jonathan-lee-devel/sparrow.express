import {getAuthSession} from '@/lib/auth'
import {db} from '@/lib/db'
import {PostValidator} from '@/lib/validators/post'
import {z} from 'zod'

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const {title, content, organizationId} = PostValidator.parse(body)

        const session = await getAuthSession()

        if (!session?.user) {
            return new Response('Unauthorized', {status: 401})
        }

        const user = await db.user.findFirst({
            where: {email: session?.user.email},
            include: {UserVerification: true},
        })

        // eslint-disable-next-line no-console
        console.log(JSON.stringify(user))

        if (!user) {
            return new Response('Internal Server Error', {status: 500})
        }

        if (!user.UserVerification) {
            return new Response('Forbidden', {status: 403});
        }

            // verify user is subscribed to passed organization id
            const subscription = await db.subscription.findFirst({
                where: {
                    organizationId,
                    userId: session.user.id,
                },
            })

        if (!subscription) {
            return new Response('Subscribe to post', {status: 403})
        }

        await db.post.create({
            data: {
                title,
                content,
                authorId: session.user.id,
                organizationId,
            },
        })

        return new Response('OK')
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, {status: 400})
        }

        return new Response(
            'Could not post to organization at this time. Please try later',
            {status: 500}
        )
    }
}
