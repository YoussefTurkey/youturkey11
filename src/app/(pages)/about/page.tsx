'use client'
// Importing Components
import Info from "@/app/components/ui/Info"
import TimelinePage from "@/app/components/ui/Timeline"


const AboutPage = () => {
  return (
    <main className='container mx-auto sm:my-20 px-10 xl:px-0'>
        <Info />
        <TimelinePage />
    </main>
  )
}

export default AboutPage