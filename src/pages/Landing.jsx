import React, { useRef } from 'react'

import { DotPattern } from '@/components/magicui/dot-pattern'
import Land1 from '@/components/Land1'
import WhyChooseUs from '@/components/ui/land2'
import FeatureHighlight from '@/components/ui/FeatureHighlight'
import Pricing from '@/components/ui/pricing'
import Footer from '@/components/ui/footer'
import Navbar from '../components/Navbar'
import FaqSection from '@/components/FaqSection'

const Landing = () => {
  const faqRef = useRef(null) 

  return (
    <div>
      <Navbar faqRef={faqRef} />
      <Land1 />
      <WhyChooseUs />
      <FeatureHighlight />
      <Pricing />
      <FaqSection faqRef={faqRef} /> 
      <Footer />
    </div>
  )
}

export default Landing
