import Image from 'next/image'
import big_m from '$public/medium_m.png'

export default function Hero() {
  return (
    <div className="flex items-center justify-between border-y border-black bg-yellow-400 px-4 py-10 lg:py-0">
      <div className="space-y-4 px-10">
        <h1 className="max-w-xl font-serif text-4xl lg:text-6xl">
          <span className="underline decoration-black decoration-4 underline-offset-1">
            Medium
          </span>{' '}
          is a place to write, read, and connect.
        </h1>
        <h2>
          It&#39;s easy and free to post your thinking on any topic and connect
          with millions of readers.
        </h2>
      </div>
      <div className="relative hidden h-48 md:flex lg:h-full">
        <Image src={big_m} alt="Medium Big M" objectFit="contain" />
      </div>
    </div>
  )
}
