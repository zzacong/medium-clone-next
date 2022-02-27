import type { GetStaticPaths, GetStaticProps } from 'next'
import type { Post } from '$lib/types'
import Image from 'next/image'
import { PortableText, PortableTextReactComponents } from '@portabletext/react'

import Header from '$components/Header'
import { sanityClient } from '$lib/config/sanity'
import { GET_POST, GET_POSTS_PATHS } from '$lib/query'
import { urlFor } from '$lib/utils/sanity'
import { format, parseISO } from 'date-fns'
import Avatar from '$components/Avatar'

export default function PostPage({ post: p }: Props) {
  return (
    <>
      <Header bg="white" />
      <div className="relative h-40 w-full">
        <Image
          src={urlFor(p.mainImage).url()}
          alt={p.title}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <main className="mx-auto max-w-3xl px-4">
        <h1 className="mt-10 mb-3 text-3xl">{p.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-600">
          {p.description}
        </h2>

        <div className="flex items-center space-x-2">
          <Avatar user={p.author} size={40} />
          <p className="text-sm font-extralight">
            Blog post by{' '}
            <span className="font-medium">
              <a href="#">{p.author.name}</a>
            </span>{' '}
            <span className="text-gray-600">
              - Published at {format(parseISO(p._createdAt), 'dd/MM/yyyy')}
            </span>
          </p>
        </div>

        <article className="prose mt-8 pb-10 lg:prose-xl">
          <PortableText value={p.body} components={portableTextComponents} />
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await sanityClient.fetch<Post[]>(GET_POSTS_PATHS)

  return {
    paths: posts.map(p => ({ params: { slug: p.slug.current } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(params)
  const post = await sanityClient.fetch<Post>(GET_POST, { slug: params?.slug })
  if (!post) return { notFound: true }
  return {
    props: {
      post: post,
    },
    revalidate: 60,
  }
}

type Props = {
  post: Post
}

const portableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    // eslint-disable-next-line @next/next/no-img-element
    image: p => <img src={urlFor(p.value).url()} alt="" loading="lazy" />,
  },

  marks: {
    link: ({ children, value }) => {
      const rel = value?.href.startsWith('/')
        ? undefined
        : 'noreferrer noopener'
      const target = value?.href.startsWith('/') ? undefined : '_blank'

      return (
        <a href={value.href} target={target} rel={rel}>
          {children}
        </a>
      )
    },
  },
}
