import React, { useEffect} from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { auth } from '../../firebase';
import "./myaccount.css"
import { useHistory } from "react-router-dom";
import { Container, Grid } from '@mui/material';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion"
import { selectsub } from '../../features/subSlice';

toast.configure();

function Myaccount({products,payments,events}) {

    let history = useHistory();
    const user = useSelector(selectUser);
    const address=useSelector(selectsub)

    useEffect(() => {
        if(!user){
            history.push("/")     
 }
      }, [ user,history])
  
  return <div className='myaccount'>

      <motion.div

      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: .8 }}
     >
        
            <div className="signout">
          <p>{user && user.email}</p>
          <p onClick={() => auth.signOut()}>Sign out</p>
          </div>
          <div className="profile">
              <div className='uid'>
              <p>NK'22 ID : {address && address.nkid}</p>
          <CopyToClipboard text={address && address.nkid}
          onCopy={() => {toast.success("Copied")}}>
          <span>Copy to clipboard</span>
        </CopyToClipboard>
              </div>
      
        <button onClick={() =>{ history.push("./profile")}}>Profile</button>
          </div>
          <div className='card_college'>
          <h4>NB:The participants should have their college Identity card with them.</h4> 
          </div>
       
      </motion.div>
    
          <motion.ul
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 3 }}
        
          >

      <Container>
      <h1 >Regi<span className="flicker-fast">s</span>tered even<span className="flicker-slow">t</span>s</h1>
         
          <Grid container spacing={1}>
          {payments ? Object.entries(payments).map(([productId,productData]) =>{
    
          if(productData.productid)
                return(    
                    <Grid  key={productId} item xs={12} sm={6} md={4}>
                    <motion.li
                    transition={{ duration: .4 }}
                    initial={{ scale: .5 }}
                    whileInView={{ scale: 1 }}
                 
                                        key={productId}
                                         className="events_component">
                                            <div className="events_com_sub container">
                                                
                                             {events &&  <img  className="image" alt='event_image' src={events&& events[productData.productid]?.url}></img>}
                                             </div>
                                             <div className="events_com_sub two">
                                             <h5>{events[productData.productid]?.product_name}</h5>
                                            
                                             <div className="two_flex">
                     <button   onClick={() => {history.push(`/myaccount/${productId}`)}} className='events_com_button'>View Ticket</button>
                 </div>
                                             </div>
                    
                                              
                                           
                                        </motion.li>
                                        </Grid>
                     )
            }):""}
          
          </Grid>
        
      </Container>
  

      </motion.ul>
      {Object.keys(payments).length===0 && 
        <div className='no_event_registered'>
        <h5>You have no registered events</h5></div>
      }
    
  </div>;
}

export default Myaccount;
