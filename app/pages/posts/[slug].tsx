import { useCallback } from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import type { CommentFormValues, Post } from '$lib/types'
import Image from 'next/image'
import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import { useForm } from 'react-hook-form'

import Header from '$components/Header'
import { sanityClient } from '$lib/config/sanity'
import { GET_POST, GET_POSTS_PATHS } from '$lib/query'
import { urlFor } from '$lib/utils/sanity'
import { format, parseISO } from 'date-fns'
import Avatar from '$components/Avatar'
import clsx from 'clsx'
import { createPost } from '$lib/utils'

export default function PostPage({ post: p }: Props) {
  const { handleSubmit, register, formState } = useForm<CommentFormValues>()
  const { errors, isSubmitSuccessful } = formState

  const onComment = useCallback(async (data: CommentFormValues) => {
    console.table(data)
    try {
      await createPost(data)
      alert('Comment created successfully')
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }, [])

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

      <div className="mx-auto max-w-4xl px-4">
        <main>
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

          <article className="prose mx-auto mt-8 max-w-3xl lg:prose-xl">
            <PortableText value={p.body} components={portableTextComponents} />
          </article>
        </main>

        <hr className="mx-auto my-8 max-w-lg border border-yellow-400" />

        {isSubmitSuccessful ? (
          <div className="mb-10 bg-yellow-500 p-10 text-white">
            <h3 className="text-3xl font-bold">
              Thank you for leaving your comment!
            </h3>
            <p className="">Once it has been approved, it will appear below.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onComment)}
            className="mb-10 flex flex-col pt-4"
          >
            <h3 className="mb-2 text-base text-yellow-600">
              Enjoyed this article?
            </h3>
            <h4 className="text-3xl font-bold text-gray-800">
              Leave a comment below!
            </h4>
            <hr className="my-4" />

            <label className="hidden">
              <input type="hidden" value={p._id} {...register('_id')} />
            </label>

            <label className="mb-4 block">
              <span className="text-sm text-gray-700">Name</span>
              <input
                type="text"
                placeholder=""
                className={clsx('form-input', errors.name && 'border-red-500')}
                {...register('name', { required: true })}
              />
            </label>

            <label className="mb-4 block">
              <span className="text-sm text-gray-700">Email</span>
              <input
                type="email"
                placeholder=""
                className={clsx('form-input', errors.email && 'border-red-500')}
                {...register('email', { required: true })}
              />
            </label>

            <label className="mb-4 block">
              <span className="text-sm text-gray-700">Comment</span>
              <textarea
                rows={8}
                placeholder=""
                className={clsx(
                  'form-input',
                  errors.comment && 'border-red-500'
                )}
                {...register('comment', { required: true })}
              />
            </label>

            {/* Errors */}
            <div className="mb-4">
              {errors.name && (
                <p className="text-red-500">* The name field is required.</p>
              )}
              {errors.email && (
                <p className="text-red-500">* The email field is required.</p>
              )}
              {errors.comment && (
                <p className="text-red-500">* The comment field is required.</p>
              )}
            </div>

            <button className="rounded bg-yellow-400 px-4 py-2 shadow transition hover:bg-opacity-90 focus:bg-opacity-90">
              Submit
            </button>
          </form>
        )}

        {!!p.comments?.length && (
          <section className="my-10 flex flex-col rounded p-4 px-8 shadow">
            <h3 className="text-4xl">Comments</h3>
            <hr className="mx-auto my-2 w-full max-w-lg" />
            {p.comments.map(c => (
              <div key={c._id} className="mb-2">
                <span className="font-medium italic text-yellow-500">
                  {c.name}:
                </span>
                <p className="">{c.comment}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </>
  )
}

// pre build the first 10 blog
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await sanityClient.fetch<Post[]>(GET_POSTS_PATHS)

  return {
    paths: posts.map(p => ({ params: { slug: p.slug } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const post = await sanityClient.fetch<Post>(GET_POST, { slug: params?.slug })
  if (!post) return { notFound: true }
  return {
    props: {
      post,
    },
    revalidate: 10,
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
