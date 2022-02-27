import { Author } from '$lib/types'
import { urlFor } from '$lib/utils/sanity'
import Image from 'next/Image'
import Link from 'next/link'

export default function Avatar({ user, size, isLink = true }: Props) {
  return (
    <span className="flex items-center justify-center rounded-full">
      {isLink ? (
        <Link href="#" passHref>
          <a className="flex">
            <Image
              src={urlFor(user.image).url()}
              alt={user.name}
              width={size}
              height={size}
              objectFit="contain"
              className="rounded-full"
            />
          </a>
        </Link>
      ) : (
        <Image
          src={urlFor(user.image).url()}
          alt={user.name}
          width={size}
          height={size}
          objectFit="contain"
          className="rounded-full"
        />
      )}
    </span>
  )
}

type Props = {
  user: Pick<Author, 'name' | 'image'>
  isLink?: boolean
  size: number
}
