
import React, { useEffect, useState,useCallback } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { motion } from "framer-motion"
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { selectUser } from '../../features/userSlice';
import db from '../../firebase';
import "./eventdetails.css"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { selectsub } from '../../features/subSlice';
import { displayRazorpay } from '../razorpay';
import { toast } from 'react-toastify';
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";
import { WhatsappIcon,FacebookIcon,TwitterIcon,TelegramIcon } from "react-share";
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from '../Scroll';
import { payoffline } from '../payoffline';



toast.configure();

const  Eventdetails=({products,basket,loadingreg,setLoadingreg,setPaymentid,events,evtcontrol})=> {
    
  let history = useHistory();
    const {id } = useParams()
    const user = useSelector(selectUser);
    const address=useSelector(selectsub)
    const [loading,setLoading]=useState(false);
    const [referal,setReferal]=useState(null);
    const [productdetails,setProductdetails]=useState();
    const [userid2,setUserid2]=useState({});
  
    const [userid3,setUserid3]=useState({});
    const [userids,setUserids]=useState("");
    const [userid,setUserid]=useState({});
    const shareUrl =window.location.pathname


   
    const deletes = (ID) =>{
        
         delete userid[ID]
       
        setUserid(prevState => ({ ...prevState}))
      }

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
 toast.error("INVALID NK-ID")
        }   
      }) 
    
    }else{
   
    } 
}
    useEffect(() => {
 
        const id = window.location.pathname.split("/");
  
        if(events && id.length>2){   
            Object.entries(events).forEach(([productId,productdetails]) =>{
if(productId.replace(/\(/g, "%28").replace(/\)/g, "%29")===id[2].replace(/\(/g, "%28").replace(/\)/g, "%29")){
    setProductdetails(productdetails)

}
            })
 }
       }, [events,id,loadingreg])

 

  return     (    <LoadingOverlay
  active={loading}
     spinner={<RingLoader color="purple" />}
>   <ScrollToTop/>
  <div className='eventdetails' >
  
      <div className="details_div">
   
<motion.div 
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
transition={{ duration: .8 }}
viewport={{once:true}}
 className="details_sub main">
  

<h1>{productdetails && productdetails?.product_name}</h1>
    <div className="image_div">
        <img alt="details_page_img" src={productdetails ? productdetails?.url:""}></img>
    </div>
    <div className="sub_details_div">
        <div dangerouslySetInnerHTML={{__html:productdetails&& productdetails?.description}}></div>
        <br></br>
        
         <p>No of participants:  &nbsp; {productdetails?.minimum===productdetails?.Noofgroupmembers?productdetails?.Noofgroupmembers==="1"?"Individual":productdetails?.Noofgroupmembers:`${productdetails?.minimum}-${productdetails?.Noofgroupmembers}`}</p>
        
       
        <p>Event type : &nbsp; {productdetails?.event_type}</p>
        <p>Venue : &nbsp; {productdetails?.venue}</p>
        <p>Date and Time : &nbsp;{productdetails?.date}</p>
      <br></br>
        <p>Registration-Fee : &nbsp; {productdetails?.amount} /-</p>
        <br></br>
        <p>Head : &nbsp; {productdetails && productdetails?.Head_name}</p>
        <p>Mobile number :&nbsp; +91-{productdetails && productdetails?.Head_phonenumber}</p>
        <br></br>
        <p>Sub Head :&nbsp; {productdetails && productdetails?.SubHead1}</p>
        <p>Mobile number :&nbsp; +91-{productdetails && productdetails?.SubHead1_phonenumber}</p>
        <p>Sub Head : &nbsp;{productdetails && productdetails.SubHead2}</p>
        <p>Mobile number :&nbsp; +91-{productdetails && productdetails?.SubHead2_phonenumber}</p>
        <br></br>
        {basket.includes(id) && <span className='alreadyregistered'>You have already registered for this event</span>}
        {productdetails?.registration==="true" && productdetails.count>0 && evtcontrol==="true"?
  <>
  {user && productdetails?.payment_mode==="true"? basket && !basket.includes(id)&&<Popup
    trigger={<button   > Register Now </button>}
    modal

    nested
  >
    {close => (
      
     
      <motion.div className="modal"
      transition={{ duration: .4 }}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
 >
        <button className="close" onClick={()=>{setUserid({});close();}}>
          &times;
        </button>
        <div className="header">{productdetails&&productdetails?.product_name}</div>
        <div className="content">
          {""}
          {productdetails?.Group==="true"  && Object.entries(userid).map(([Id,Data]) =>{
          
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
        <p className='college_id'> *No of participants:  &nbsp; {productdetails?.minimum===productdetails?.Noofgroupmembers?productdetails?.Noofgroupmembers==="1"?"Individual":productdetails?.Noofgroupmembers:`${productdetails?.minimum}-${productdetails?.Noofgroupmembers}`}</p>
       {productdetails?.Group==="true" &&  parseInt(productdetails?.Noofgroupmembers)-1<10 && !(Object.keys(userid).length===parseInt(productdetails?.Noofgroupmembers)-1)  &&
                <div>
                     {
      !(Object.keys(userid).length>=parseInt(productdetails?.minimum)) &&
          <p>&nbsp;*All Group leaders are requested to Sign In to the Nakshatra website. <br></br><br></br>
*&nbsp;All users in the group should also mandatorily Sign In to the website and should give their respective Nakshatra IDs to the group leader.<br></br><br></br>

*&nbsp;After receiving all the IDs in a group, the group leader can add each member to the specific events that they wish to participate. <br></br><br></br>

*&nbsp;NB: Every events are required to have a minimum number of participants. Registration will be open only after attaining minimum participants for each events.
<br></br><br></br>
*&nbsp;<span className='minimum_required'>{productdetails?.minimum} participants minimum required to register this event.</span></p>}
          <form className='add_div' onSubmit={submit}>
          <input onChange={handleChange} placeholder='Enter participant Nakshatra ID'></input>
          <input className='count_div' defaultValue={productdetails?.Noofgroupmembers} placeholder='Enter participant Nakshatra ID'></input>
          <input className='count_div' defaultValue={productdetails?.productId} placeholder='Enter userid'></input>
          <button type='submit'>Add</button>
          </form></div>}
   
          <input maxLength="5" onChange={handleChange2} className={(parseInt(productdetails?.minimum)<=Object.keys(userid).length)||(Object.keys(userid).length===parseInt(productdetails?.Noofgroupmembers)-1)|| productdetails?.Group==="false" || parseInt(productdetails?.Noofgroupmembers)-1>=10?'events_com_input':"events_com_input disabled"} placeholder='Referral Code(Optional)'></input>
        <button  onClick={() =>{user?displayRazorpay(productdetails,address,userid2,userid3,user,setLoadingreg,setPaymentid,history,referal):history.push('/login')}}  className={(parseInt(productdetails?.minimum)<=Object.keys(userid).length)||Object.keys(userid).length===parseInt(productdetails?.Noofgroupmembers)-1|| productdetails?.Group==="false"||parseInt(productdetails?.Noofgroupmembers)-1>=10?'events_com_button':"events_com_button disabled"}>{loadingreg?"PLEASE WAIT":"Register Now"}</button>
      
        </div>
      </motion.div>
        )}
  </Popup>:!basket.includes(productdetails?.productId.replaceAll(/\s/g,'')) &&  <Popup
    trigger={<button   > Register Now </button>}
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
        <div className="header">{productdetails&&productdetails?.product_name}</div>
        <div className="content">
          {""}
          {productdetails.Group==="true"  && Object.entries(userid).map(([Id,Data]) =>{
          
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
        <p className='college_id'> *No of participants:  &nbsp; {productdetails?.minimum===productdetails?.Noofgroupmembers?productdetails?.Noofgroupmembers==="1"?"Individual":productdetails?.Noofgroupmembers:`${productdetails?.minimum}-${productdetails?.Noofgroupmembers}`}</p>
       {productdetails?.Group==="true"  && parseInt(productdetails?.Noofgroupmembers)-1<10 &&!(Object.keys(userid).length===parseInt(productdetails.Noofgroupmembers)-1) &&
  <div>
  {
    !(Object.keys(userid).length>=parseInt(productdetails?.minimum)) &&
      <p>&nbsp;*All Group leaders are requested to Sign In to the Nakshatra website. <br></br><br></br>
      *&nbsp;All users in the group should also mandatorily Sign In to the website and should give their respective Nakshatra IDs to the group leader.<br></br><br></br>
      
      *&nbsp;After receiving all the IDs in a group, the group leader can add each member to the specific events that they wish to participate. <br></br><br></br>
      
      *&nbsp;NB: Every events are required to have a minimum number of participants. Registration will be open only after attaining minimum participants for each events.
      <br></br><br></br>
      *&nbsp;<span className='minimum_required'>{productdetails?.minimum} participants minimum required to register this event.</span>  </p>
    }


         <form className='add_div' onSubmit={submit}>
          <input onChange={handleChange} placeholder='Enter participant Nakshatra ID'></input>
          <input className='count_div' defaultValue={productdetails?.Noofgroupmembers} placeholder='Enter participant Nakshatra ID'></input>
          <input className='count_div' defaultValue={productdetails?.productId} placeholder='Enter userid'></input>
          <button type='submit'>ADD</button>
          </form>
  </div>
 }
      
          <input maxLength="5" onChange={handleChange2} className={(parseInt(productdetails?.minimum)<=Object.keys(userid).length)||(Object.keys(userid).length===parseInt(productdetails.Noofgroupmembers)-1)|| productdetails.Group==="false" || parseInt(productdetails.Noofgroupmembers)-1>=10?'events_com_input':"events_com_input disabled"} placeholder='Referral Code(Optional)'></input>
         
      
        <button disabled={loadingreg}  onClick={() => {user?payoffline(productdetails,address,userid2,userid3,user,setLoadingreg,setPaymentid,history,referal) :history.push('/login')}}  className={(parseInt(productdetails.minimum)<=Object.keys(userid).length)||Object.keys(userid).length===parseInt(productdetails?.Noofgroupmembers)-1|| productdetails?.Group==="false"||parseInt(productdetails.Noofgroupmembers)-1>=10?'events_com_button':"events_com_button disabled"}>{loadingreg?"PLEASE WAIT":"Register Now"}</button>

        </div>
      </motion.div>
    )}
  </Popup> 
      }
    </> :<button className='events_com_button'>Registration closed</button>}
     
        <br></br>
        <h1 className='rules share'>Share</h1>
        <div className="sharebuttons">
                      <WhatsappShareButton title={ user?`Here is my referral code ${address?.userdetails.referID}, you can help me get rewarded by just using this code  while registering for the nakshatra'22 events through the website. You can also win cash prizes by participating in nakshatra'22. So don't miss the opportunity. Hurry up.`:""} url={ `https://nakshatra22.in${shareUrl}` }  round><WhatsappIcon size={32} round></WhatsappIcon></WhatsappShareButton>
                      <FacebookShareButton  hashtag="#nakshatra22" quote={user?`Here is my referral code ${address?.userdetails.referID}, you can help me get rewarded by just using this code while registering for the nakshatra'22 events through the website. You can also win cash prizes by participating in nakshatra'22. So don't miss the opportunity. Hurry up.`:""} url={ `https://nakshatra22.in${shareUrl}` }  round><FacebookIcon size={32} round></FacebookIcon></FacebookShareButton>
                      <TelegramShareButton   title={user?`Here is my referral code ${address?.userdetails.referID}, you can help me get rewarded by just using this code while registering for the nakshatra'22 events through the website. You can also win cash prizes by participating in nakshatra'22. So don't miss the opportunity. Hurry up.`:""} url={ `https://nakshatra22.in${shareUrl}` }  round><TelegramIcon size={32} round></TelegramIcon></TelegramShareButton>
                      <TwitterShareButton   title={user?`Here is my referral code ${address?.userdetails.referID}, you can help me get rewarded by just using this code while  registering for the nakshatra'22 events through the website. You can also win cash prizes by participating in nakshatra'22. So don't miss the opportunity. Hurry up.`:""} url={ `https://nakshatra22.in${shareUrl}` }  round><TwitterIcon size={32} round></TwitterIcon></TwitterShareButton>
                      </div>
        <h1 className='rules'>Rules and Regulations</h1>

    
    
        <br></br>
<div className='rules_fetch'  dangerouslySetInnerHTML={{__html:productdetails&& productdetails?.rulesandregulations}}></div>
<br></br>
        <h1 className='rules'>Prizes</h1>

    
    
        <br></br>
<div dangerouslySetInnerHTML={{__html:productdetails&& productdetails?.prices}}></div>
    </div>
</motion.div>

<motion.ul
 initial="hidden"
 whileInView="visible"
 transition={{ duration: .3 }}
 className="details_sub second">
<h1 className='related'>Related events</h1>
    {        Object.entries(events).map(([productId,productdetails2]) =>{
 
      if(productdetails2?.subcategory===productdetails?.subcategory && productId!==id)
        return(
    
                 <motion.li
                 transition={{ duration: .3 }}
                 initial={{ scale: .6 }}
                 whileInView={{ scale: 1 }}
              viewport={{once:true}}
                 key={productId}
                  className="events_component events_component1">
                     <div className="events_com_sub container events_com_sub1">
                       <img  className="image" alt='event_image' src={productdetails2?.url}></img>
                      <Link   to={`/eventdetails/${productId.replaceAll(/\s/g,'')}`} >                    <div class="overlay">
    <div class="text">View details</div>
  </div></Link>


                      </div>
                      <div className="events_com_sub two events_com_sub1 two1">
                      <h5>{productdetails2.product_name}</h5>
                      
                         {productdetails2?.registration==="true" && productdetails2?.count>0 && evtcontrol==="true"?
                         <div className="two_flex two_flex1">
                                        
                         <button onClick={() => {history.push(`/eventdetails/${productId.replaceAll(/\s/g,'')}`)}} className='events_com_button events_com_button1'>View details</button>
                         {basket.includes(productId.replaceAll(/\s/g,'')) && <span className='alreadyregistered registered'>You have already registered for this event</span>}
                  {user && productdetails2?.payment_mode==="true"?  basket && !basket.includes(productId.replaceAll(/\s/g,''))&&     <Popup
    trigger={<button className='events_com_button events_com_button1 black'> Register Now </button>}
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
        <div className="header">{productdetails2&&productdetails2?.product_name}</div>
        <div className="content">
          {""}
          {productdetails2?.Group==="true"  && Object.entries(userid).map(([Id,Data]) =>{
          
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
        <p className='college_id'> *No of participants:  &nbsp; {productdetails2?.minimum===productdetails2?.Noofgroupmembers?productdetails2?.Noofgroupmembers==="1"?"Individual":productdetails2?.Noofgroupmembers:`${productdetails?.minimum}-${productdetails?.Noofgroupmembers}`}</p>
       {productdetails2?.Group==="true" && parseInt(productdetails2?.Noofgroupmembers)-1<10&& !(Object.keys(userid).length===parseInt(productdetails2?.Noofgroupmembers)-1)  &&
         <div>
             {
      !(Object.keys(userid).length>=parseInt(productdetails2?.minimum)) &&
    <p>&nbsp;*All Group leaders are requested to Sign In to the Nakshatra website. <br></br><br></br>
*&nbsp;All users in the group should also mandatorily Sign In to the website and should give their respective Nakshatra IDs to the group leader.<br></br><br></br>

*&nbsp;After receiving all the IDs in a group, the group leader can add each member to the specific events that they wish to participate. <br></br><br></br>

*&nbsp;NB: Every events are required to have a minimum number of participants. Registration will be open only after attaining minimum participants for each events.
<br></br><br></br>
*&nbsp;<span className='minimum_required'>{productdetails2?.minimum} participants minimum required to register this event</span></p>}
          <form className='add_div' onSubmit={submit}>
          <input onChange={handleChange} placeholder='Enter participant Nakshatra ID'></input>
          <input className='count_div' defaultValue={productdetails2?.Noofgroupmembers} placeholder='Enter participant Nakshatra ID'></input>
          <input className='count_div' defaultValue={productId} placeholder='Enter userid'></input>
          <button type='submit'>Add</button>
          </form></div>}
              
          <input maxLength="5" onChange={handleChange2} className={(parseInt(productdetails2?.minimum)<=Object.keys(userid).length)||(Object.keys(userid).length===parseInt(productdetails2.Noofgroupmembers)-1)|| productdetails2.Group==="false" || parseInt(productdetails2.Noofgroupmembers)-1>=10?'events_com_input':"events_com_input disabled"} placeholder='Referral Code(Optional)'></input>
        <button  onClick={() =>{user?displayRazorpay(productdetails2,address,userid2,userid3,user,setLoadingreg,setPaymentid,history,referal):history.push('/login')}}  className={(parseInt(productdetails2.minimum)<=Object.keys(userid).length) || Object.keys(userid).length===parseInt(productdetails2?.Noofgroupmembers)-1|| productdetails2?.Group==="false" || parseInt(productdetails2.Noofgroupmembers)-1>=10?'events_com_button':"events_com_button disabled"}>{loadingreg?"PLEASE WAIT":"Register Now"}</button>
      
        </div>
      </motion.div>
    )}
  </Popup>:!basket.includes(productId.replaceAll(/\s/g,'')) &&    <Popup
    trigger={<button className='events_com_button events_com_button1 black'> Register Now </button>}
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
        <div className="header">{productdetails2&&productdetails2?.product_name}</div>
        <div className="content">
          {""}
          {productdetails2.Group==="true"  && Object.entries(userid).map(([Id,Data]) =>{
          
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
        <p className='college_id'> *No of participants:  &nbsp; {productdetails2?.minimum===productdetails2?.Noofgroupmembers?productdetails2?.Noofgroupmembers==="1"?"Individual":productdetails2?.Noofgroupmembers:`${productdetails2?.minimum}-${productdetails2?.Noofgroupmembers}`}</p>
       {productdetails2.Group==="true"  && parseInt(productdetails2?.Noofgroupmembers)-1<10 &&!(Object.keys(userid).length===parseInt(productdetails2.Noofgroupmembers)-1) &&
  <div>
  {
    !(Object.keys(userid).length>=parseInt(productdetails2?.minimum)) &&
      <p>&nbsp;*All Group leaders are requested to Sign In to the Nakshatra website. <br></br><br></br>
      *&nbsp;All users in the group should also mandatorily Sign In to the website and should give their respective Nakshatra IDs to the group leader.<br></br><br></br>
      
      *&nbsp;After receiving all the IDs in a group, the group leader can add each member to the specific events that they wish to participate. <br></br><br></br>
      
      *&nbsp;NB: Every events are required to have a minimum number of participants. Registration will be open only after attaining minimum participants for each events.
      <br></br><br></br>
      *&nbsp;<span className='minimum_required'>{productdetails2?.minimum} participants minimum required to register this event.</span>  </p>
    }


         <form className='add_div' onSubmit={submit}>
          <input onChange={handleChange} placeholder='Enter participant Nakshatra ID'></input>
          <input className='count_div' defaultValue={productdetails2?.Noofgroupmembers} placeholder='Enter participant Nakshatra ID'></input>
          <input className='count_div' defaultValue={productId} placeholder='Enter userid'></input>
          <button type='submit'>ADD</button>
          </form>
  </div>
 }
      
          <input maxLength="5" onChange={handleChange2} className={(parseInt(productdetails2.minimum)<=Object.keys(userid).length)||(Object.keys(userid).length===parseInt(productdetails2.Noofgroupmembers)-1)|| productdetails2.Group==="false" || parseInt(productdetails2.Noofgroupmembers)-1>=10?'events_com_input':"events_com_input disabled"} placeholder='Referral Code(Optional)'></input>
         
      
        <button disabled={loadingreg}  onClick={() => {user?payoffline(productdetails2,address,userid2,userid3,user,setLoadingreg,setPaymentid,history,referal) :history.push('/login')}}  className={(parseInt(productdetails2.minimum)<=Object.keys(userid).length)||(Object.keys(userid).length===parseInt(productdetails2.Noofgroupmembers)-1)|| productdetails2.Group==="false" || parseInt(productdetails2.Noofgroupmembers)-1>=10?'events_com_button':"events_com_button disabled"}>{loadingreg?"PLEASE WAIT":"Register Now"}</button>

        </div>
      </motion.div>
    )}
  </Popup> }
                         </div>:<button className='events_com_button events_com_button1'>Registration closed</button>}
                      
                      </div>

                       
                    
                 </motion.li>

    )})}
</motion.ul>
      </div>
  </div>
</LoadingOverlay>)
}

export default Eventdetails;
