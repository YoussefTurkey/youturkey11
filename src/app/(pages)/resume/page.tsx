import PdfViewer from '@/app/components/sections/PdfViewer'
import React from 'react'

const Resume = () => {
  return (
    <section className='container mx-auto mb-10 mt-30 md:my-20 px-5 md:px-10 xl:px-0'>
        <PdfViewer url='/resume/CV-YoussefTurkey.pdf' />
    </section>
  )
}

export default Resume