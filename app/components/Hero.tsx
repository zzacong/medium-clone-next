export default function Hero() {
  return (
    <div className="border-y border-black bg-yellow-400">
      <div className="wrapper flex h-[400px] items-center bg-[url('/medium_quotes.png')] bg-[length:385px] bg-right-bottom bg-no-repeat py-10 lg:py-0">
        <div className="w-2/3 space-y-4 lg:w-1/2">
          <h1 className="font-serif text-5xl md:text-7xl">
            <span className="hidden sm:inline">Medium is a place to </span>
            <span className="capitalize sm:normal-case">write</span>, read, and
            connect
          </h1>
          <h2 className="text-lg text-gray-800">
            It&#39;s easy and free to post your thinking on any topic and
            connect with millions of readers.
          </h2>
        </div>
      </div>
    </div>
  )
}
