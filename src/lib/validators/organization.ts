import { z } from 'zod'

export const OrganizationValidator = z.object({
  name: z.string().min(3).max(21),
})

export const OrganizationSubscriptionValidator = z.object({
  organizationId: z.string(),
})

export type CreateSubredditPayload = z.infer<typeof OrganizationValidator>
export type SubscribeToSubredditPayload = z.infer<
  typeof OrganizationSubscriptionValidator
>
