import Header from '$components/Header'
import Hero from '$components/Hero'

export default function Home() {
  return (
    <>
      <Header />

      <div className="mx-auto max-w-7xl">
        <Hero />

        {/* Posts */}
      </div>
    </>
  )
}
