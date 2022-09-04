import React from 'react'
import "./header.css"
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';



function Header() {
  const user = useSelector(selectUser);
  const calculateTimeLeft = () => {

    let year = new Date().getFullYear();
    let difference = +new Date(`09/28/${year}`) - +new Date();
  
    let timeLeft = {};
  
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
  
    return timeLeft;
  }

const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());



useEffect(() => {
  const timer = setTimeout(() => {
    setTimeLeft(calculateTimeLeft());
  }, 1000);

  return () => clearTimeout(timer);
});


const timerComponents = [];

 timeLeft&&  Object.keys(timeLeft).forEach((interval,index) => {

  if (!timeLeft[interval]) {
    return;
  }

  timerComponents.push(
    <div className={`counter c${index}` }>
      <span className='counter_hour' > {timeLeft[interval]}</span>
     <p>{interval}</p> 
    </div>
  );
});




// ...

  return (
    <div className='nk_home'>
      <motion.div className="titles" 
      initial={{ opacity: .3 }}
       animate={{ opacity: 1 }}
    transition={{ duration: 2 }}
      >
      <div>
      <span className='glow'><span >N</span><span className="flicker-fast">K'</span>2<span >2</span></span>
 {timerComponents.length ? <p >APRIL  28,29</p>:""}   


<p>SAINTGITS COLLEGE OF ENGINEERING,KOTTAYAM</p>



  <div className='counter_display'>

    {timerComponents.length ? timerComponents : <span className='timesup' >April 28-29</span>}
  </div>
      </div>
      
  <div>
        <Link className='header_button' to={user?"/events":"/login"} >
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  Register now
</Link>
        </div>

        </motion.div>
    
     
    </div>
  )
}

export default Header