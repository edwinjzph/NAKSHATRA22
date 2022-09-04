import React, {  useCallback, useState } from 'react'
import { createUserDocument3 } from '../../firebase';
import './contactus.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
 const Contactus =() => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({  
    email: "",
    message:"",
  });
  const handleChange =useCallback((e) => {
    const { name, value } = e.target;
    setMessage({ ...message, [name]: value});
  },[message]);
  const submit =(e) => {
    e.preventDefault();
setLoading(true)
    createUserDocument3(message).then(() => {
        setLoading(false)
       toast.success("Sended Successfully")
                })

} 

  return (
    <div className="contactus_top">
      <div>
      <h1>Contact us</h1>
      </div>
  
 <div className='contactus'>
  
  <div className="info">
  <div className='info_sub'>
    <p>Email</p>
    <p>nakshatra@saintgits.org</p>
  </div>
  <div  className='info_sub'>
    <p>Phone</p>
    <p>+91-6238830855</p>
  </div>
  <div className='info_sub'>
    <p>Address</p>
    <p>Saintgits College of Engineering, Kottukulam Hills, Pathamuttom P.O, Kottayam-686 532.</p>
  </div>
  </div>
  <div className="infoform">
    <h4>WRITE TO US</h4>
    <form onSubmit={submit} className='informinput'>
    <input required={true} onChange={handleChange} name='email' type="email" placeholder='Email'>
    </input>
    <textarea required={true} onChange={handleChange} name='message' type="text"  placeholder='Message' >
    </textarea>
    <button>{loading?"PLEASE WAIT":"SUBMIT"}</button>
    </form>
  
  </div>
  </div>
    </div>

  )
}

export default Contactus