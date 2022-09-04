import React, { useCallback } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectsub } from '../../features/subSlice'
import { selectUser } from '../../features/userSlice'
import { createUserDocument2 } from '../../firebase'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./signup.scss"
import { motion } from "framer-motion"
toast.configure();
function Profile({trigger,setTrigger}) {
    const address=useSelector(selectsub)
    const user1 = useSelector(selectUser);
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        
        email: address?.userdetails.email,
        fullname:address?.userdetails.fullname,
        phonenumber:address?.userdetails.phonenumber,
        collagename:address?.userdetails.collagename,
        department:address?.userdetails.department,
        semister:address?.userdetails.semister
      });
      
      const handleChange =useCallback((e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value.trim()===""?address?.userdetails[name]:value });
      },[user,address]);
      const registers =(e) => {
        e.preventDefault();
   setLoading(true)
        createUserDocument2(user1,user,address.nkid).then(() => {
            setLoading(false)
           toast.success("Updated")
           setTrigger(!trigger)
                    })
            
    
        
      
    } 

  return (
      <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: .8 }} className='Signup_box'>
    <div className='flex_1'>
         <div className="signup">
                 <form onSubmit={registers} >
        <h1>PROFILE</h1>
        <span>Full Name</span>
        <input onChange={handleChange} name='fullname'    type="text" placeholder={address?.userdetails.fullname}></input>
        <span>Phone Number</span>
        <input onChange={handleChange}  name='phonenumber' placeholder={address?.userdetails.phonenumber}></input>
        <span>College</span>
        <input onChange={handleChange}  name='collagename'   type="text" placeholder={address?.userdetails.collagename}></input>
        <span>Department</span>
        <input onChange={handleChange}  name='department'  type="text" placeholder={address?.userdetails.department}></input>
        <span>Semister</span>
        <input onChange={handleChange} name='semister' placeholder={address?.userdetails.semister}></input>

        <button   type="submit" >{!loading?"UPDATE":"Please wait"}</button>
        </form>

        </div>
    </div>
      </motion.div>

  )
}

export default Profile