import type { Post, Subreddit, User, Vote, Comment } from '@prisma/client'

export type ExtendedPost = Post & {
  organization: Subreddit
  votes: Vote[]
  author: User
  comments: Comment[]
}
