import type { Post } from '$lib/types'
import Link from 'next/link'
import Image from 'next/image'

import { urlFor } from '$lib/utils/sanity'

export default function Gallery({ posts }: Props) {
  return (
    <div className="wrapper py-4 md:py-6">
      <main className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {posts.map(p => (
          <Link key={p._id} href={`/posts/${p.slug.current}`}>
            <a className="group block overflow-hidden rounded-lg border shadow">
              <div className="relative h-60 w-full">
                <Image
                  src={urlFor(p.mainImage).url()}
                  alt={p.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition duration-200 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between bg-white p-4">
                <div>
                  <p className="text-lg font-medium">{p.title}</p>
                  <p className="text-sm text-gray-700">
                    {p.description} by {p.author.name}
                  </p>
                </div>
                <span className="block">
                  <Image
                    src={urlFor(p.author.image).url()}
                    alt={p.author.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </span>
              </div>
            </a>
          </Link>
        ))}
      </main>
    </div>
  )
}

type Props = {
  posts: Post[]
}
