
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import db from '../../firebase';
import { Link } from "react-router-dom";
import "./events.css"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useHistory,useLocation } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { selectsub } from '../../features/subSlice';

import { displayRazorpay } from '../razorpay';
import { toast } from 'react-toastify';


import 'react-toastify/dist/ReactToastify.css';
import { payoffline } from '../payoffline';


toast.configure();


const Events =({products,basket,loadingreg,setLoadingreg,setPaymentid,events,evtcontrol,defaultfilter,setDefaultfilter}) =>  {

  let history = useHistory();
    const user = useSelector(selectUser);
    const address=useSelector(selectsub)

    const [userids,setUserids]=useState("");
    const [userid,setUserid]=useState({});
   
    const [referal,setReferal]=useState(null);
    const [userid2,setUserid2]=useState({});
    const [userid3,setUserid3]=useState({});
    const location = useLocation();
    const handleChange = useCallback((e) => {
      const { value } = e.target;
   setUserids(value.trim())
    },[]);

    const handleChange2 = useCallback((e) => {
      const { value } = e.target;
   setReferal(value.trim())
    },[]);

    const submit =(e) =>{
      e.preventDefault();
      if(address.nkid===e.target[0].value.trim()){
        toast.error("No need to add your own nakshatra ID")
        return
      }
    
      if(!userid[userids] && Object.keys(userid).length<parseInt(e.target[1].value)-1 && userids){
        db.collection('users')
        .doc(userids).get('user1')
        .then(querySnapshop =>{
          if(querySnapshop.exists && !e.target[2].value.includes(querySnapshop.data()?.registered)){
            const members ={}
       members[userids]={
         fullname:querySnapshop.data().user1.fullname,
         phonenumber:querySnapshop.data().user1.phonenumber,
         uid:querySnapshop.data().uid
     }
   if(Object.keys(userid).length<5){
    setUserid2(prevState => ({...prevState,[userids]:members[userids].uid}))
   }else{
    setUserid3(prevState => ({...prevState,[userids]:members[userids].uid}))
   }
   setUserid(prevState => ({...prevState,[userids]:members[userids]}))

          }else{
   toast.error("INVALID NK-ID or account already registered for this event")
          }   
        }) 
      
      }else{
        toast.error("INVALID NK-ID")
      } 
  }
 
const deletes = (ID) =>{
 
   delete userid[ID]
   delete userid2[ID]
   delete userid3[ID]

  setUserid(prevState => ({ ...prevState}))
}

       

  return  <div 
   
   
  
  className={location.pathname==="/"?"events":"events  paddingtop"}
    >
<div className="events_main_sub">
<Container 

>
  <motion.ul

  >

  <h1 className='events_header'>EVE<span class="flicker-fast">N</span>TS</h1>
  <h4>Events are only open for engineering students.</h4>
<div className="filter">
  <span onClick={() =>{setDefaultfilter("nontechnical")}} className={defaultfilter!=="nontechnical"?"nonbg":"filterbtn"}>Non Technical</span>
  <span onClick={() =>{setDefaultfilter("technical")}}  className={defaultfilter!=="technical"?"nonbg":"filterbtn"}>Technical</span>
</div>
  </motion.ul>


<Grid container spacing={1}>
{events && Object.entries(events).map(([productId,productData]) =>{

  if(productData.category===defaultfilter)
                return(
<Grid  key={productId} item xs={12} sm={6} md={4}>
<motion.li

initial={{ scale: .6 }}
viewport={{once:true}}
whileInView={{ scale: 1 }}
transition={{ duration: .3 }}

                    key={productId}
                     className="events_component"
                     >
                         
                        <div className="events_com_sub container">
               
                    
                         {productData.url!==0 &&  <img  className="image" alt='event_image' src={productData.url}></img>}
                         <Link   to={`/eventdetails/${productId}`} >                    <div className="overlay">
                           
    <div class="text">View details</div>
  </div></Link>
     
  

                         </div>
                         <div className="events_com_sub two">
                         <h5>{productData.product_name}</h5>
                       
                            {basket.includes(productId.replaceAll(/\s/g,'')) && <span className='alreadyregistered'>You have already registered for this event</span>}
                           {productData.registration==="true" && productData?.count>0 && evtcontrol==="true" ? <div className="two_flex">
                     
                                <button onClick={() => {history.push(`/eventdetails/${productId.replaceAll(/\s/g,'')}`)}} className='events_com_button'>View details</button>
                                
                        {user && productData?.payment_mode==="true"? basket && !basket.includes(productId.replaceAll(/\s/g,''))&&<Popup
    trigger={<button className="events_com_button black">Register Now</button>}
    modal
 
    nested
  >
    {close => (
      <motion.div className="modal"
      transition={{ duration: .4 }}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
   
     viewport={{ once: true }}>
        <button className="close" onClick={()=>{setUserid({});close();}}>
          &times;
        </button>
        <div className="header">{productData&&productData.product_name}</div>
        <div className="content">
          {""}
          {productData.Group==="true"  && Object.entries(userid).map(([Id,Data]) =>{
          
            if(Data)
            return(
              <div className='mem_div' key={Id}>
                <div className="div_mem1">
                <p>{Data.fullname}</p>
    <p>{Data.phonenumber}</p>
                </div>
                <div className="div_mem2">
                <span onClick={()=>{deletes(Id)}}>Remove</span>
                </div>
   

              </div>
        
            )
          })}
        
        </div>
        <div className="actions">
        <p className='college_id'>*&nbsp;The participants should have their college Identity card with them to enter the college.</p>
        <p className='college_id'> *No of participants:  &nbsp; {productData?.minimum===productData?.Noofgroupmembers?productData?.Noofgroupmembers==="1"?"Individual":productData.Noofgroupmembers:`${productData.minimum}-${productData?.Noofgroupmembers}`}</p>
       {productData.Group==="true"  && parseInt(productData.Noofgroupmembers)-1<10 &&!(Object.keys(userid).length===parseInt(productData.Noofgroupmembers)-1) &&
  <div>
  {
    !(Object.keys(userid).length>=parseInt(productData.minimum)) &&
      <p>&nbsp;*All Group leaders are requested to Sign In to the Nakshatra website. <br></br><br></br>
      *&nbsp;All users in the group should also mandatorily Sign In to the website and should give their respective Nakshatra IDs to the group leader.<br></br><br></br>
      
      *&nbsp;After receiving all the IDs in a group, the group leader can add each member to the specific events that they wish to participate. <br></br><br></br>
      
      *&nbsp;NB: Every events are required to have a minimum number of participants. Registration will be open only after attaining minimum participants for each events.
      <br></br><br></br>
      *&nbsp;<span className='minimum_required'>{productData.minimum} participants minimum required to register this event.</span>  </p>
    }


         <form className='add_div' onSubmit={submit}>
          <input onChange={handleChange} placeholder='Enter participant Nakshatra ID'></input>
          <input className='count_div' defaultValue={productData.Noofgroupmembers} placeholder='Enter participant Nakshatra ID'></input>
          <input className='count_div' defaultValue={productId} placeholder='Enter userid'></input>
          <button type='submit'>ADD</button>
          </form>
  </div>
 }
      
          <input maxLength="5" onChange={handleChange2} className={(parseInt(productData.minimum)<=Object.keys(userid).length)||(Object.keys(userid).length===parseInt(productData.Noofgroupmembers)-1)|| productData.Group==="false" || parseInt(productData.Noofgroupmembers)-1>=10?'events_com_input':"events_com_input disabled"} placeholder='Referral Code(Optional)'></input>
         
        <button disabled={loadingreg} onClick={() => {user?displayRazorpay(productData,address,userid2,userid3,user,setLoadingreg,setPaymentid,history,referal):history.push('/login')}} className={(parseInt(productData.minimum)<=Object.keys(userid).length)||(Object.keys(userid).length===parseInt(productData.Noofgroupmembers)-1)|| productData.Group==="false" || parseInt(productData.Noofgroupmembers)-1>=10?'events_com_button':"events_com_button disabled"}>{loadingreg?"PLEASE WAIT":"Register Now"}</button>
      

        </div>
      </motion.div>
    )}
  </Popup>: !basket.includes(productId.replaceAll(/\s/g,'')) &&  <Popup
    trigger={<button className="events_com_button black">Register Now</button>}
    modal
 
    nested
  >
    {close => (
      <motion.div className="modal"
      transition={{ duration: .4 }}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
   
     viewport={{ once: true }}>
        <button className="close" onClick={()=>{setUserid({});close();}}>
          &times;
        </button>
        <div className="header">{productData&&productData.product_name}</div>
        <div className="content">
          {""}
          {productData.Group==="true"  && Object.entries(userid).map(([Id,Data]) =>{
          
            if(Data)
            return(
              <div className='mem_div' key={Id}>
                <div className="div_mem1">
                <p>{Data.fullname}</p>
    <p>{Data.phonenumber}</p>
                </div>
                <div className="div_mem2">
                <span onClick={()=>{deletes(Id)}}>Remove</span>
                </div>
   

              </div>
        
            )
          })}
        
        </div>
        <div className="actions">
        <p className='college_id'>*&nbsp;The participants should have their college Identity card with them to enter the college.</p>
        <p className='college_id'> *No of participants:  &nbsp; {productData?.minimum===productData?.Noofgroupmembers?productData?.Noofgroupmembers==="1"?"Individual":productData.Noofgroupmembers:`${productData.minimum}-${productData?.Noofgroupmembers}`}</p>
       {productData.Group==="true"  && parseInt(productData.Noofgroupmembers)-1<10 &&!(Object.keys(userid).length===parseInt(productData.Noofgroupmembers)-1) &&
  <div>
  {
    !(Object.keys(userid).length>=parseInt(productData.minimum)) &&
      <p>&nbsp;*All Group leaders are requested to Sign In to the Nakshatra website. <br></br><br></br>
      *&nbsp;All users in the group should also mandatorily Sign In to the website and should give their respective Nakshatra IDs to the group leader.<br></br><br></br>
      
      *&nbsp;After receiving all the IDs in a group, the group leader can add each member to the specific events that they wish to participate. <br></br><br></br>
      
      *&nbsp;NB: Every events are required to have a minimum number of participants. Registration will be open only after attaining minimum participants for each events.
      <br></br><br></br>
      *&nbsp;<span className='minimum_required'>{productData.minimum} participants minimum required to register this event.</span>  </p>
    }


         <form className='add_div' onSubmit={submit}>
          <input onChange={handleChange} placeholder='Enter participant Nakshatra ID'></input>
          <input className='count_div' defaultValue={productData.Noofgroupmembers} placeholder='Enter participant Nakshatra ID'></input>
          <input className='count_div' defaultValue={productId} placeholder='Enter userid'></input>
          <button type='submit'>ADD</button>
          </form>
  </div>
 }
      
          <input maxLength="5" onChange={handleChange2} className={(parseInt(productData.minimum)<=Object.keys(userid).length)||(Object.keys(userid).length===parseInt(productData.Noofgroupmembers)-1)|| productData.Group==="false" || parseInt(productData.Noofgroupmembers)-1>=10?'events_com_input':"events_com_input disabled"} placeholder='Referral Code(Optional)'></input>
         
      
        <button disabled={loadingreg}  onClick={() => {user?payoffline(productData,address,userid2,userid3,user,setLoadingreg,setPaymentid,history,referal) :history.push('/login')}}  className={(parseInt(productData.minimum)<=Object.keys(userid).length)||(Object.keys(userid).length===parseInt(productData.Noofgroupmembers)-1)|| productData.Group==="false" || parseInt(productData.Noofgroupmembers)-1>=10?'events_com_button':"events_com_button disabled"}>{loadingreg?"PLEASE WAIT":"Register Now"}</button>

        </div>
      </motion.div>
    )}
  </Popup> }
                            </div>:<button className='events_com_button '>Registration closed</button>}
                         
                         </div>

                          
                       
                    </motion.li>
                  
                    </Grid>
                    
                )
            })}
            </Grid>
</Container>
</div>


  </div>

}

export default Events;
