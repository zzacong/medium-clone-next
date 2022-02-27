import type { GetServerSideProps } from 'next'
import type { Post } from '$lib/types'

import Header from '$components/Header'
import Hero from '$components/Hero'
import Gallery from '$components/Gallery'
import { sanityClient } from '$lib/config/sanity'
import { GET_POSTS } from '$lib/query'

export default function Home({ posts }: Props) {
  console.log(posts)
  return (
    <>
      <Header />

      <div className="mx-auto max-w-7xl">
        <Hero />
        <Gallery posts={posts} />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await sanityClient.fetch(GET_POSTS)
  return { props: { posts } }
}

type Props = {
  posts: Post[]
}
