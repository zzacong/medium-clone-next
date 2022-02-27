import Link from 'next/link'
import Image from 'next/image'

import medium_logo from '$public/medium_logo.png'

export default function Header() {
  return (
    <header className="focus-within:shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between space-x-4 py-2 px-4">
        <Link href="/" passHref>
          <a className="flex w-44">
            <Image src={medium_logo} alt="Medium logo" objectFit="contain" />
          </a>
        </Link>

        <nav className="hidden flex-grow items-center space-x-4 md:flex">
          <a href="#">
            <h3>About</h3>
          </a>
          <a href="#">
            <h3>Contact</h3>
          </a>
          <a
            href="#"
            className="rounded-full bg-green-600 px-4 py-1 text-white"
          >
            <h3>Follow</h3>
          </a>
        </nav>

        <div className="flex items-center space-x-4 text-green-600">
          <a href="#">
            <h3>Sign In</h3>
          </a>
          <a
            href="#"
            className="rounded-full border border-green-600 px-4 py-1"
          >
            <h3>Get Started</h3>
          </a>
        </div>
      </div>
    </header>
  )
}
