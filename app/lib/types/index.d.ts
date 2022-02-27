import type { SanityImageObject } from '@sanity/image-url/lib/types/types'

export interface Post {
  _id: string
  _createdAt: string
  title: string
  description: string
  slug: Slug
  author: {
    name: string
    image: SanityImageObject
  }
  mainImage: SanityImageObject
  body: Record<string, unknown>[]
}

export interface Author {
  _id: string
  _createdAt: string
  name: string
  image: SanityImageObject
  slug: Slug
  bio: Record<string, unknown>[]
}

export type Slug = {
  current: string
}
