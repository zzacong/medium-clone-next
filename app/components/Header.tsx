import Link from 'next/link'
import Image from 'next/image'

import medium_logo from '$public/medium_logo.png'
import clsx from 'clsx'

export default function Header({ bg = 'white' }: Props) {
  return (
    <header
      className={clsx(
        'bg-white focus-within:shadow',
        bg === 'yellow' && 'bg-yellow-400'
      )}
    >
      <div className="wrapper flex h-[75px] items-center justify-between space-x-4 py-2">
        <Link href="/" passHref>
          <a className="flex w-44">
            <Image src={medium_logo} alt="Medium logo" objectFit="contain" />
          </a>
        </Link>

        <div className="flex items-center space-x-4 text-sm text-gray-800 ">
          <nav className="hidden items-center space-x-4 sm:flex">
            <a href="#">
              <h3>Our story</h3>
            </a>
            <a href="#">
              <h3>Membership</h3>
            </a>
            <a href="#">
              <h3>Write</h3>
            </a>
          </nav>

          <a href="#">
            <h3>Sign In</h3>
          </a>
          <a href="#" className="rounded-full bg-black px-4 py-2 text-white">
            <h3>Get started</h3>
          </a>
        </div>
      </div>
    </header>
  )
}

type Props = { bg?: 'white' | 'yellow' }
