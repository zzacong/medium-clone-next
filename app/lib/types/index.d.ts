import type { SanityImageObject } from '@sanity/image-url/lib/types/types'
import type { PortableTextBlock } from '@portabletext/types'

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
  body: PortableTextBlock
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
