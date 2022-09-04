import React, { useEffect, useState } from 'react'
import "./refer.css"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { selectsub } from '../../features/subSlice';
import { motion } from "framer-motion"
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";
import { WhatsappIcon,FacebookIcon,TwitterIcon,TelegramIcon } from "react-share";
import ScrollToTop from '../Scroll';
import Popup from 'reactjs-popup';

toast.configure();
function Refer() {
    const refer=useSelector(selectsub)
    const [refertop,setRefertop] = useState({})
useEffect(()  => {
  async function fetchData() {
    const data = await fetch('https://asia-south1-nakshatra-1c394.cloudfunctions.net/app/refercount').then((t) =>
    t.json()
).catch((error) => {
    console.log("error")
}

)
if(data){
  setRefertop(data);
}
  }
  fetchData()

  return () => {
  setRefertop(
    {}
  )
  }
}, [])


   
  return (
    <motion.div 
    
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: .8 }}
    className='refer'>
          <h1 >Campus Ambassador</h1>
          <img  alt='campus' src='https://ik.imagekit.io/p4td4xk6gcki/ezgif.com-gif-maker_dEqlxBkVw.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649512822594'></img>
          <div className="refercount">
      <ScrollToTop/>
      <h3>Your referral id : {refer?.userdetails?.referID}</h3>
 
      <CopyToClipboard  text={refer?.userdetails?.referID}
          onCopy={() => {toast.success("Copied")}}>
          <h3>Copy to clipboard</h3>
         
        </CopyToClipboard>
  </div>

          <div className="refercount">
      
              <h3>Event Referrals : {refer?.userdetails?.referCount?refer?.userdetails?.referCount:" 0"}</h3>
           
              
          </div>
         {Object.keys(refertop).length>0? <Popup
    trigger={<button className="events_com_button refercount_butt">Campus Ambassador<br></br>TOP 5</button>}
    modal
 
    nested
  >
    {close => (
      <motion.div className="modal"
      transition={{ duration: .4 }}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
   
     viewport={{ once: true }}>
        <button className="close" onClick={()=>{close();}}>
          &times;
        </button>
   
        <div className="content">
          <h2>Most Event Referrals</h2>
          {""}
          {refertop && Object.entries(refertop).map(([Id,Data]) =>{
          
            if(Data)
            return(
              <div className='mem_div' key={Id}>

                <div className="div_mem1">
                <p>{Data.name}</p>
    <p>{Data.college}</p>
                </div>
                <div className="div_mem2">
                <span>{Data.count}</span>
                </div>
   

              </div>
        
            )
          })}
        
        </div>
      
      </motion.div>
    )}
  </Popup>:""}
          <div className='refer_details_div'>
          <h4>If your spirit thrives to drive into something vibrant, we got you covered. 'Campus Ambassador' is an online event curated to promote the events and programmes of our college by providing a referrel code with which the participants could take part in other events of our college and triumph over by involving maximum participants.Get ready to bounce off the walls.</h4>
      
          <h1 className='rules share referh1'>Share</h1>
          <div className="sharebuttons">
                      <WhatsappShareButton title={`Here is my referral code ${refer?.userdetails.referID}, you can help me get rewarded by just using this code while registering for the nakshatra'22 events through the website. You can also win cash prizes by participating in nakshatra'22. So don't miss the opportunity. Hurry up.`} url={ `https://nakshatra22.in` }  round><WhatsappIcon size={32} round></WhatsappIcon></WhatsappShareButton>
                      <FacebookShareButton  hashtag="#nakshatra22" quote={`Here is my referral code ${refer?.userdetails.referID}, you can help me get rewarded by just using this code while registering for the nakshatra'22 events through the website. You can also win cash prizes by participating in nakshatra'22. So don't miss the opportunity. Hurry up.`} url={ `https://nakshatra22.in` }  round><FacebookIcon size={32} round></FacebookIcon></FacebookShareButton>
                      <TelegramShareButton   title={`Here is my referral code ${refer?.userdetails.referID}, you can help me get rewarded by just using this code while registering for the nakshatra'22 events through the website. You can also win cash prizes by participating in nakshatra'22. So don't miss the opportunity. Hurry up. https://nakshatra22.in` }  round><TelegramIcon size={32} round></TelegramIcon></TelegramShareButton>
                      <TwitterShareButton   title={`Here is my referral code ${refer?.userdetails.referID}, you can help me get rewarded by just using this code while registering for the nakshatra'22 events through the website. You can also win cash prizes by participating in nakshatra'22. So don't miss the opportunity. Hurry up.`} url={ `https://nakshatra22.in` }  round><TwitterIcon size={32} round></TwitterIcon></TwitterShareButton>
                      </div>
                      <h1 className='rules share referh1'>HOW TO PARTICIPATE</h1>
                      <p><br></br><br></br>
                      Event Referring<br></br><br></br>

i. Once you sign up in the app or website, you will receive a referral code from the refer and earn tab.<br></br><br></br>

ii. You are supposed to share this code with your friends using the share option from the same thus your friends can register in all the events of nakshatra using the code.<br></br><br></br>

iii. The person whose referral has the most number of participants will be the winner of the event.<br></br><br></br>

iv. A cash prize of ₹5k will be awarded for the most referred code for event registration in the app.<br></br><br></br>

v. And a cash prize of 5k will be awarded for the most referred code for event registration on the website.<br></br><br></br>

vi. For event registration, the referral code obtained from the application and website can only be used in the app and website respectively.<br></br><br></br>
                      </p>
                      <h1 className='rules share referh1'>RULES</h1>
                      <p>
                    
<br></br><br></br>
1. The one who uses the referral code for registering in all other nakshatra events should participate in the respected events, then only the referral will be counted and considered valid.<br></br><br></br>
3. If tied, prize money will be shared.<br></br><br></br>
4. The winners should submit their valid college id cards to get the cash prize.<br></br><br></br>
4. Certificates will be provided to the winners only.<br></br><br></br>
6. Committee decisions will be final.<br></br><br></br>
                      </p>

                      <h1 className='rules share referh1'>CONTACT</h1>
                      <br></br>
                      <h4>
Head: Aravind Sreelal<br></br>
Mob: +91 9633580797<br></br>
<br></br><br></br>
Sub Head: Meenu Nandakumar <br></br>
Mob: +91 83308 80325<br></br>
Sub Head: Farha Zakhir Hussain<br></br>
Mob: +919744112668</h4>
          </div>

          </motion.div>
   
      
  )
}

export default Refer