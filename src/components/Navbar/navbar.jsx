import React, { useState } from 'react';
import img from '../arrow-left-solid.svg'
import { Link } from "react-router-dom";
import "./navbar.scss"
import { MenuItems } from "./MenuItems"
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { selectsub } from '../../features/subSlice';
import { useLocation,useHistory } from 'react-router-dom'
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar=()=> {
    const user = useSelector(selectUser);
    const userdetails = useSelector(selectsub);

    const[clicked,setClicked]=useState(false);
    const location = useLocation();
    const history = useHistory();
    const [show,handleShow] =useState(false);
    const transitionNarbar = () => {
        if (window.scrollY > 20){
            handleShow(true);
        }else{
            handleShow(false);
        }
    }
 useEffect(() =>{
window.addEventListener("scroll",transitionNarbar);
return () => window.removeEventListener("scroll",transitionNarbar);
 },[])
   
  return   <div className="navigation">
      {
          location.pathname!=="/" &&  <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{once:true}}
          transition={{ duration: .5 }}>  <img alt='back' onClick={()=>{history.goBack()}} className='back back3'  src={img}></img></motion.div>
      }



  <img alt='saintgitslogo' onClick={()=>{history.push("/")}} className= {!show?   location.pathname!=="/"?"back back4":"back back4 none" : 'logodisplay'}  src="https://ik.imagekit.io/5iaqs2tchv9/images/image-6_lEoTPHRjq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649530526514"></img>
   <img alt='nk22_logo' onClick={()=>{history.push("/")}} className={!show? location.pathname!=="/"?"back back5":"back back5 none1": 'logodisplay'}  src="https://ik.imagekit.io/5iaqs2tchv9/app_icon-min_wAvi58X41.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649534803427"></img>
  
   
<input type="checkbox" readOnly checked={clicked} onClick={() => {setClicked(!clicked)}} className="navigation__checkbox" id="navi-toggle"></input>

<label htmlFor="navi-toggle" className="navigation__button">
    <span className="navigation__icon">&nbsp;</span>
</label>

<div className="navigation__background">&nbsp;</div>

<nav className="navigation__nav">
    <ul className="navigation__list">
            {MenuItems.map((item, index) => {
                if(!(item.title==="Admin" &&!userdetails?.userdetails?.admin))
                if(!(item.title==="Refer and Win" && !user))
                return (
                   
                   
                    <li  key={index}  className="navigation__item">

                        <Link  key={index} onClick={() => {clicked && setClicked(!clicked)}} to={clicked && (item.title==="Sign in" && user?"/myaccount":item.url)} className="navigation__link">
                   
                        <p key={index}>{item.title==="Sign in" ? user?"Dashboard":item.title:(item.title==="Admin")?userdetails?.userdetails?.admin?item.title:"":item.title}
   </p>
                        </Link>
                     
                        </li>
                    
             
                )

        })}
    
        </ul>
</nav>

 
</div>
}

export  default Navbar;


