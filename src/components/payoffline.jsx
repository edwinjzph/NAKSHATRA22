
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


export const payoffline  = async (amounts,address,userid2,userid3,user,setLoadingreg,setPaymentid,history,referal) => {
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
      
        const payoffline ={
            notes: {
                profile: profile?JSON.stringify(profile):"null",
                groupmembers:Object.keys(userid2).length>=1 && amounts.Group==="true"?JSON.stringify(userid2):"null",
                groupmembers2:Object.keys(userid3).length>=1 && amounts.Group==="true"?JSON.stringify(userid3):"null",
                productId:amounts?.productId,
                uid:user.uid,
             eventname:amounts.product_name,
             app:"notapp",
             referal:referal?referal:"",
             payment_mode:"Offline",
             secret: process.env.REACT_APP_WEB_REFERAL
        },
        }
        const data = await fetch('https://asia-south1-nakshatra-1c394.cloudfunctions.net/app/payoffline',{method: 'POST',headers: {
            'Content-Type': 'application/json'
          }, body: JSON.stringify(payoffline)}).then((t) =>
            t.json()
        ).catch((error) => {
            setLoadingreg(false);
       
            console.log("error")
        }
       
        )
        if(data?.status==="ok"){
            setLoadingreg(false)
            history.push("/myaccount")
            setPaymentid(data.status)
            toast(<Added name={address?.userdetails.fullname} history={history}/>)
        }else{
            setLoadingreg(false)
            toast.error("error")
        }
   
}