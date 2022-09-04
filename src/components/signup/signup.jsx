import React, { useState,useCallback } from 'react';
import "./signup.scss"
import { useHistory } from "react-router-dom";
import { auth, createUserDocument } from '../../firebase';
import { toast } from 'react-toastify';
import { motion } from "framer-motion"
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
 const Signup=()=> {
    let history = useHistory();
    const [page, setPage] = useState(1);
    const [login,setLogin] = useState(false)
    const [user, setUser] = useState({
        password: "",
        email: "",
        fullname:"",
        phonenumber:"",
        collagename:"",
        department: "",
        semister:"",
        webreferal:""
      });
  
      const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
      },[user]);
    const signIn =(e) =>{
    e.preventDefault();
    setLogin(true)
        auth.signInWithEmailAndPassword(
            user.email,
            user.password
    
        ).then((authUser) => {
     setLogin(false)
     history.push("/")
     toast.success("Successfully logged In")
                }).catch((error) =>{
                    setLogin(false)
                    toast.error(error.message)
                   
                });}
                const registers = (e) => {
                    e.preventDefault();
                    setLogin(true);
                        auth.createUserWithEmailAndPassword(
                            user.email,
                            user.password
                        ).then((authUser) => {
                            setLogin(false)
                            history.push("/")
                            toast.success("Successfully logged In")
                            delete user.password;
                    createUserDocument(authUser.user,user).then( async() => {
                        if(user.webreferal){
                            const webreferalinfo ={
                                webreferral:user.webreferal.trim(),
                                webname: user.fullname,
                                secret: process.env.REACT_APP_WEB_REFERAL
                            }
                            const data = await fetch('https://asia-south1-nakshatra-1c394.cloudfunctions.net/app/webreferal',{method: 'POST',headers: {
                                'Content-Type': 'application/json'
                              }, body: JSON.stringify(webreferalinfo)}).then((t) =>
                                t.json()
                            ).catch((error) => {
                                console.log("error")
                            }
                           
                            )
                            console.log(data)
                        }
                      
                    auth.currentUser.updateProfile({
                            displayName: user.fullname
                        })
                       
                                }
                        
                
                    )
                        }).catch((error) =>{
                            setLogin(false)
                        toast.success(error.message)
                        });
                    
                  
                } 
                const forgots =(e) =>{
                    e.preventDefault();
                    setLogin(true);
                    auth.sendPasswordResetEmail(
                        user.email,
                    ).then(() => {
                        setLogin(false)
                        toast.success("Reset Mail send")
                            }).catch((error) =>{
                                setLogin(false)
                                toast.error(error.message)
                            });
                }
                
  return <div className='Signup_box'>
   <motion.div 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: .8 }}
  className="flex_1">
  <h1>Nakshatra</h1>
    {
        page===2 &&
        <motion.div 
        
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: .8 }}
        className="signup">
                 <form onSubmit={registers} >
        <h1 >Sign up</h1>
        <input  onChange={handleChange} name='fullname' required={true} value={user.fullname}  type="text" placeholder='Full Name'></input>
        <input  onChange={handleChange} name='email' required={true} value={user.email} type="email" placeholder='Email'></input>
        <input type="number"  onChange={handleChange} name='phonenumber' required={true} value={user.phonenumber}   placeholder='Phone Number'></input>
        <input  onChange={handleChange} name='collagename' required={true} value={user.collagename}  type="text" placeholder='college'></input>
        <input  onChange={handleChange} name='department' required={true} value={user.department}  type="text" placeholder='Department'></input>
        <input onChange={handleChange} name='semister' required={true} value={user.semister} placeholder='Semester'></input>
        <input  onChange={handleChange} name='password' required={true} value={user.password} type="password" placeholder='Password'></input>

        <button  type="submit" disabled={login} >{login?"Please wait":"SIGN UP"}</button>
        </form>
    <h5 className='already_account'>Already have an account ? <span onClick={() => {setPage(1)}}>  Sign in</span></h5>
        </motion.div>
   
    }
{
page===1 &&       
<motion.div 
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
transition={{ duration: .8 }}
>
<form onSubmit={signIn}>
<h1 className='sign_in'>Sign in</h1>
<h5 className='already_account  to_sign_up'>Don't have an account ? <span onClick={() => {setPage(2)}}>  Sign up here</span></h5>

<input   onChange={handleChange} name='email' required={true} value={user.email} type="email" placeholder='Email'></input>
<input  onChange={handleChange}  name='password'required value={user.password} type="password" placeholder='Password'></input>
<h5 className='forgot_h5' onClick={()=>{setPage(3)}}>Forgot password ?</h5>
<button  type="submit" disabled={login} >{login?"Please wait":"SIGN IN"}</button>


</form>
</motion.div>
}
{
page===3 &&     
<motion.div 
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
transition={{ duration: .8 }}
>  <form onSubmit={forgots}>
<h1 className='sign_in'>Forgot your password ?</h1>

<input  className='forgot_margin' onChange={handleChange} name='email' required={true} value={user.email} type="email" placeholder='Enter your email address'></input>
<button type="submit" disabled={login}>{login?"Please wait":"SEND"}</button>
<h5 className='already_account  to_sign_up sign_redirect' >Did you remember your password ?<span onClick={() => {setPage(1)}}> Sign in</span></h5>
</form>
</motion.div>
}
</motion.div>
      
  </div>;
}

export default Signup;
