
import { toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@mui/material";
import React from "react";
import "./toast.css"


toast.configure();
const Added = ({name,history}) =>{
    return(
      <div className="toast">
        <h5>{`Congrats ${name}, You have been successfully registered`}</h5>
        <Button  onClick={() => {
          history.push('/myaccount')
        }} color="primary" size="small" className="buttontoast" variant="outlined">View details</Button>
     
      </div>
    )
  }
 const loadScript = (src) =>{

    return new Promise((resolve) => {
    
        const script =document.createElement('script')
        script.src = src;
      
        script.onload= () =>{
            resolve(true)
        } 
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
    
   
}
export const displayRazorpay  = async (amounts,address,userid2,userid3,user,setLoadingreg,setPaymentid,history,referal) => {

    setLoadingreg(true)
if(!address){
setLoadingreg(false)
return
}
const profile = {
  userdetails:{
    email:address?.userdetails?.email,
    phonenumber:address?.userdetails?.phonenumber,
    fullname:address?.userdetails?.fullname
  },
  nkid:  address?.nkid
}

 


    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if(!res){
        alert("Failed to load")
        return
    }
    const eventdetails ={
        amount: parseInt(amounts.amount)*100
    }
    const data = await fetch('https://asia-south1-nakshatra-1c394.cloudfunctions.net/app/razorpay',{method: 'POST',headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify(eventdetails)}).then((t) =>
        t.json()
    ).catch((error) => {
        setLoadingreg(false);
        toast.error("Please try again after some time")
    }
   
    )
  
    const options = {
        key: process.env.REACT_APP_RAZORPAY_PUBLIC_KEY,
        amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: data.currency,
        name: "Nakshatra 2022",
        order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response){
            toast(<Added name={address?.userdetails.fullname} history={history}/>)
            history.push('/myaccount')
            setPaymentid(response.razorpay_payment_id)
        },
        prefill: {
            name: address?.userdetails.fullname,
            email: address?.userdetails.email,
            contact: address?.userdetails.phonenumber
        },
        notes: {
        
                profile: profile?JSON.stringify(profile):"null",
                groupmembers:Object.keys(userid2).length>=1 && amounts.Group==="true"?JSON.stringify(userid2):"null",
                groupmembers2:Object.keys(userid3).length>=1 && amounts.Group==="true"?JSON.stringify(userid3):"null",
                productId:amounts?.productId,
                uid:user.uid,
             eventname:amounts.product_name,
             app:"notapp",
             referal:referal?referal:"",
             payment_mode:"Online"
        },
        theme: {
            color: "#800080"
        },
        modal: {
            ondismiss() {
        toast.error("Payment cancelled")
            },
          },
    };
    var rzp1 = new window.Razorpay(options);
    setLoadingreg(false)
 
  data&&  rzp1.open();
    rzp1.on('payment.failed', function (response){
        toast.error(`Payment Cancelled : ${response.error.reason}`);
        toast.error(response.error.source);
       
});
}
