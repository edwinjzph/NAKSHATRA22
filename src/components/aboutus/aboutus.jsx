import React from 'react'
import "./aboutus.css"

import { motion } from "framer-motion"


function Aboutus() {



  return (
<div className='about_us_main'>
<div className='aboutus'     >

      <motion.div className="aboutus_subdiv" initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: .8 }}

  >
      <h1 className='events_header'>AB<span className="flicker-fast">O</span>U<span className="flicker-slow">T</span> US</h1>
  
 <div className="gallery">
   
   <div className="gallery_subdiv">
     <div className="con_squ">
     <motion.div   initial={{ scale: 0 }}
       whileInView={{ scale: 1 }}
       transition={{ duration: .8 }} className="empty_div"></motion.div>
     <motion.div 
     initial={{ scale: 0 }}
     whileInView={{ scale: 1 }}
     transition={{ duration: 1 }}
     className="imagediv">
 
       <img alt='aju_actor' src="https://ik.imagekit.io/p4td4xk6gcki/images/aju_lrUMmnIX1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1648453341019"></img>
     </motion.div>
     </div>

     <motion.div
       initial={{ scale: 0 }}
       whileInView={{ scale: 1 }}
       transition={{ duration: .5 }} className="ina">
       <img alt='ina' src="https://ik.imagekit.io/p4td4xk6gcki/images/inagration_k3ucVK7iz.png?ik-sdk-version=javascript-1.4.3&updatedAt=1648453341269"></img>
     </motion.div>
     <div className="content">
     <p>In contemplation to this Saintgits College of Engineering presents NAKSHATRA 2022, the annual techno-cultural fest. It is hosted every year to recognise fledging engineers who have a flair of technical expertise and artistry.
It is one of the largest and eminent fests with more than 4000 entrants from across the nation. This extravaganza unfolds to you a two-day mega event full of merry and rapture.</p>
     </div>
   </div>
   <div className="gallery_subdiv second_div">

     <div className="conten2">

<p>Place yourself in the middle of the stream of power and wisdom which animates all whom it floats, and you are without effort impelled to truth, to right and a perfect contentment – Spiritual laws. This is what SAINTGITS COLLEGE OF ENGINEERING has been precisely doing since its commencement in 2002.</p>
     </div>
    <div className="con_squ">
  
     <motion.div
       initial={{ scale: 0 }}
       whileInView={{ scale: 1 }}
       transition={{ duration: .9 }} className="ina ina_sec">
     
       <img alt='ina' src="https://ik.imagekit.io/p4td4xk6gcki/images/violin_A7F4iqQsq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1648453340995"></img>

     </motion.div>
     <motion.div
       initial={{ scale: 0 }}
       whileInView={{ scale: 1 }}
       transition={{ duration: 2 }} className="empty_div emp_sec"></motion.div>
     </div>
   
     <motion.div
       initial={{ scale: 0 }}
       whileInView={{ scale: 1 }}
       transition={{ duration: .6 }} className="imagediv img_sec">
       <img alt='aju_actor' src="https://ik.imagekit.io/p4td4xk6gcki/images/samretha_WsPPWnftm.png?ik-sdk-version=javascript-1.4.3&updatedAt=1648453341071"></img>
     </motion.div>
   </div>
 </div>
<motion.div className='about_forphone'>

<p>
Place yourself in the middle of the stream of power and wisdom which animates all whom it floats, and you are without effort impelled to truth, to right and a perfect contentment – Spiritual laws. This is what SAINTGITS COLLEGE OF ENGINEERING has been precisely doing since its commencement in 2002.
</p>
<motion.div
       initial={{ scale: .7 }}
       whileInView={{ scale: 1 }}
       transition={{ duration: .4 }}>
<img alt='aju_actor' src="https://ik.imagekit.io/p4td4xk6gcki/images/inagration_k3ucVK7iz.png?ik-sdk-version=javascript-1.4.3&updatedAt=1648453341269"></img>
       </motion.div>

<p>In contemplation to this Saintgits College of Engineering presents NAKSHATRA 2022, the annual techno-cultural fest. It is hosted every year to recognise fledging engineers who have a flair of technical expertise and artistry.
It is one of the largest and eminent fests with more than 4000 entrants from across the nation. This extravaganza unfolds to you a two-day mega event full of merry and rapture.</p>
<motion.div
       initial={{ scale: .7 }}
       whileInView={{ scale: 1 }}
       transition={{ duration: .4 }}>
<img alt='ina' src="https://ik.imagekit.io/p4td4xk6gcki/images/violin_A7F4iqQsq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1648453340995"></img></motion.div>
       </motion.div>

     </motion.div>
    
    </div>
  
 
</div>

 
    
  )
}

export default Aboutus