import React, { useEffect, useState,Suspense,lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch,Route } from 'react-router-dom';
import './App.css';
import MetaTags from 'react-meta-tags';
import {useDispatch, useSelector} from "react-redux"
import Events from './components/events/events';
import {login,logout, selectUser} from "./features/userSlice"
import Navbar from './components/Navbar/navbar';
import db, { auth } from './firebase';
import {int,out} from "./features/subSlice"

import Spinner from './components/Spinner';


import Footer from './components/footer/footer';
import { Data } from './components/data';









const Signup = lazy(() => import('./components/signup/signup'));
const Registered = lazy(() => import('./components/regitereredevents/registered'));
const Myaccount = lazy(() => import('./components/myaccount/myaccount'));
const Eventdetails = lazy(() => import('./components/eventdetails/eventdetails'));
const Header = lazy(() => import('./components/Header/header'));
const Aboutus = lazy(() => import('./components/aboutus/aboutus'));
const Profile = lazy(() => import('./components/profile/profile'));
const Contactus = lazy(() => import('./components/contactus/contactus'));
const Admin = lazy(() => import('./components/admin/admin'));
const Terms = lazy(() => import('./components/Termsofservice'));
const Refer = lazy(() => import('./components/refer/refer'));
const Privacy = lazy(() => import('./components/privacy/privacy'));
const Refund = lazy(() => import('./components/refund/refund'));
const Credits = lazy(() => import('./components/credits/credits'));

function App() {
  const user = useSelector(selectUser);
  
  const dispatch = useDispatch();

  const [events,setEvents]=useState(Data);
  const [loading,setLoading]=useState(false);
     
  const [defaultfilter,setDefaultfilter]=useState("nontechnical");
  const [payments,setPayments]=useState([]);
  const [basket,setBasket]=useState([]);
  const [loadingreg,setLoadingreg]=useState(true);
  const [paymentid,setPaymentid]=useState("");
  const [evtcontrol,setEvtcontrol]=useState("true");

  const [trigger,setTrigger]=useState(false);
useEffect(() =>{
    const fetchevents = async () =>{

     db.collection("events")
     .where("Active","==","true")
     .get()
      .then((querySnapshot) =>{
         querySnapshot.forEach(async productDoc =>{
             events[productDoc.id.replaceAll(/\s/g,'')] =productDoc.data(); 
 
         })
         setLoadingreg(false)
         setLoading(false)
     
     })
   

    } 

   
    fetchevents()

         },[]);
    
     
        useEffect(() => {
          const fetchpayments =() =>{
            if(user!==null){
              db.collection('appUsers')
               .doc(user && user.uid).collection('payments').get()
               .then((querySnapshot) =>{
  
                  const payments= {};
                  querySnapshot.forEach(async productDoc =>{
                      if(productDoc.data().notes){
                      payments[productDoc.id] ={
                          productid: productDoc.data().notes && productDoc.data().notes.productId,
                      }}
                      if(productDoc.data().notes.productId&&!basket.includes(productDoc.data().notes.productId)){
                        basket.push( productDoc.data().notes.productId)
                      }
              
               
                  })
                  setPayments(payments);
                  
              }) 
              }
          }
          setTimeout(fetchpayments,5000)
         
           }, [user,paymentid])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      if(userAuth){
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }));
        
      }else{
        dispatch(logout());
          dispatch(out())
          setBasket([])
      }
    });

    return () =>{
      unsubscribe();
    }
  },[dispatch])
  useEffect(() => {
    
    const  fetchuserdetails = () => {
      if(user!==null){
        db.collection('appUsers')
        .doc(user && user.uid).get()
        .then(querySnapshop =>{
          if(querySnapshop.exists){
          
            dispatch(int({
              userdetails:{
                collagename: querySnapshop.data().collegename,
                department: querySnapshop.data().department,
                email: querySnapshop.data().Email,
                fullname:  querySnapshop.data().Name,
                phonenumber: querySnapshop.data().phoneNumber,
                semister : querySnapshop.data().semister,
                admin:querySnapshop.data().isAdmin,
                referCount:querySnapshop.data()?.referCount,
                webreferCount:querySnapshop.data()?.webreferCount,
                referID:querySnapshop.data()?.referID,
              },
            nkid:querySnapshop.data().unique,}
            ))
          }else{
  
          }   
        }) 
      }
    } 
   setTimeout(fetchuserdetails,5000)
   }, [dispatch,user,trigger])

   useEffect(() => {
      db.collection('registrationcontrol').doc(
        'rmhvgwrNgoDWxrnMZnJw').get('active').then( querySnapshot =>{

          if(querySnapshot.exists){
            setEvtcontrol(querySnapshot.data().active)
          }

        })
   
     
   }, [])


  

  return (
    <div className="app">  
 
    {loading? <Spinner/>:
    <BrowserRouter>
 
  
    
  <MetaTags>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    </MetaTags>
 
     <Navbar/>
  
      <Switch>
      <Route exact path="/">

<Suspense fallback={<Spinner/>}>
<Header/>
<Aboutus/>
      </Suspense>

<Events  defaultfilter={defaultfilter} setDefaultfilter={setDefaultfilter} evtcontrol={evtcontrol} events={events} basket={basket} loadingreg={loadingreg} setLoadingreg={setLoadingreg} setPaymentid={setPaymentid} />

<Footer/> 

</Route>
      <Route exact path= "/events">
<Events  defaultfilter={defaultfilter} setDefaultfilter={setDefaultfilter} evtcontrol={evtcontrol} events={events}  basket={basket} loadingreg={loadingreg} setLoadingreg={setLoadingreg} setPaymentid={setPaymentid} />
</Route>
<Route exact path= "/login">
<Suspense fallback={<Spinner/>}>
<Signup/>
      </Suspense>

</Route>
<Route exact path="/myaccount">
<Suspense fallback={<Spinner/>}>
<Myaccount  payments={payments} events={events}/>
      </Suspense>

</Route>
<Route exact path="/myaccount/:id">
<Suspense fallback={<Spinner/>}>
<Registered  events={events} />
      </Suspense>

</Route>
<Route exact path="/eventdetails/:id">
<Suspense fallback={<Spinner/>}>
<Eventdetails 
 basket={basket} evtcontrol={evtcontrol} events={events} loadingreg={loadingreg} setLoadingreg={setLoadingreg} setPaymentid={setPaymentid}/>
      </Suspense>
</Route>
<Route exact path="/faq">
  <Footer/>
</Route>
<Route exact path="/aboutus">
<Suspense fallback={<Spinner/>}>

<Aboutus/>
      </Suspense>

</Route>
<Route exact path="/profile">
<Suspense fallback={<Spinner/>}>

<Profile trigger={trigger} setTrigger={setTrigger}/>
      </Suspense>

</Route>
<Route exact path="/contact">
<Suspense fallback={<Spinner/>}>
<Contactus/>
      </Suspense>
</Route>
<Route exact path="/admin">
<Suspense fallback={<Spinner/>} >
<Admin events={events}/>
      </Suspense>
</Route>
<Route exact path="/terms">
<Suspense fallback={<Spinner/>}>
<Terms/>
      </Suspense>
</Route>
<Route exact path="/privacypolicy">
<Suspense fallback={<Spinner/>}>
<Privacy/>
      </Suspense>
</Route>
<Route exact path="/referandwin">
<Suspense fallback={<Spinner/>}>
<Refer/>
      </Suspense>
</Route>
<Route exact path="/refund">
<Suspense fallback={<Spinner/>}>
<Refund/>
      </Suspense>
</Route>
<Route exact path="/developers">
<Suspense fallback={<Spinner/>}>
<Credits/>
      </Suspense>
</Route>
      </Switch>
    </BrowserRouter>
  }  </div>  

  );
}

export default App;
