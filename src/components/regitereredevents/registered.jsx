import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { selectUser } from '../../features/userSlice';
import db from '../../firebase';
import "./registered.css"
import QRCode from "react-qr-code";
import LoadingOverlay from 'react-loading-overlay';
import { motion } from "framer-motion"
import Spinner from '../Spinner';
import { selectsub } from '../../features/subSlice';

import html2canvas from 'html2canvas';



function Registered({products,events}) {
    const {id } = useParams()
    const user = useSelector(selectUser);
    const userdetails = useSelector(selectsub);
    const [event,setEvent]=useState();
    const [loading2,setLoading2]=useState(false);
    const [loading,setLoading]=useState(true);
  
    useEffect(() => {
       
        const id = window.location.pathname.split("/");
        if(user!==null && (id&& id.length>2)){
            db.collection('appUsers')
             .doc(user && user.uid).collection('payments').doc(id[2].toString()).get()
             .then((querySnapshot) =>{
                setEvent(querySnapshot.data());
                setLoading(false)
            }) 
            }
       }, [id,user])
       console.log(event?.notes?.productId)
    console.log(   events[event?.notes?.productId]?.url)
   
 const  exportPdf = () => {
setLoading2(true)
    html2canvas(document.querySelector("#capture"),{
        allowTaint: true, useCORS: true
    }).then(function(canvas) {
      const  image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  link.download = "nakshatra-ticket.png";
  link.href = image;
  link.click();
  setLoading2(false)
    });
}
      
   return (
  
<LoadingOverlay
  active={loading2}
  spinner
  text='Please wait'
  >
        {loading ?
        <Spinner/>:
     <div   className="download">
         
        
         <motion.div
         initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
transition={{ duration: .8 }}
viewport={{ once: true }}
className="colour_div"
id="capture"
         >
         <motion.div  className='registerdetails'  >
         <div className="ticket_image">
         <img  style={{"objectFit":"cover"}} alt='peroductimag' src={(events&& event) && events[event.notes.productId]?.url} ></img>
             </div> 

           <div className="content_registered">
           <h1>{(events&& event) && events[event.notes.productId]?.product_name}</h1>   
           <h2>NK-ID : {userdetails?.nkid}</h2>
           <p>Event : {event.notes.eventname}</p>
           <p>Name : {userdetails?.userdetails.fullname}</p>
           <p>Venue :{events[event.notes.productId]?.venue}</p>
           <p>Date and Time :{events[event.notes.productId]?.date}</p>
           </div>
          
           <div className="qr2">
               <div className="qr2_ele">
                   <p>
                    Saintgits college of engineering,Kottukulam Hills, Pathamuttam P. O, Kerala 686532
                   </p>
               </div>
               <div className="qr2_ele">
               <QRCode size={65} className='qr'   value={event?event.id:1}/>
           <p>{event&& event.id}</p>
           <h3>Paid - { event && event?.amount/100}/-</h3>
               </div>
        
           </div>
         
              
         </motion.div>
       
  
         </motion.div>

<button  onClick={exportPdf}>Download ticket


</button> 
         </div>
}
         </LoadingOverlay>
    
    )
}

export default Registered