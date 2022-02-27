import type { GetStaticProps } from 'next'
import type { Post } from '$lib/types'

import Header from '$components/Header'
import Hero from '$components/Hero'
import Gallery from '$components/Gallery'
import { sanityClient } from '$lib/config/sanity'
import { GET_POSTS } from '$lib/query'

export default function Home({ posts }: Props) {
  return (
    <>
      <Header />
      <Hero />
      <Gallery posts={posts} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await sanityClient.fetch(GET_POSTS)
  return { props: { posts } }
}

type Props = {
  posts: Post[]
}
