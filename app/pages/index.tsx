import type { GetStaticProps } from 'next'
import type { Post } from '$lib/types'

import Header from '$components/Header'
import Hero from '$components/Hero'
import Gallery from '$components/Gallery'
import { sanityClient } from '$lib/config/sanity'
import { GET_POSTS } from '$lib/query'

export default function Home({ posts }: PageProps) {
  return (
    <>
      <Header bg="yellow" />
      <Hero />
      <Gallery posts={posts} />
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const posts = await sanityClient.fetch(GET_POSTS)
  return {
    props: {
      posts,
    },
    revalidate: 10,
  }
}

type PageProps = {
  posts: Post[]
}
