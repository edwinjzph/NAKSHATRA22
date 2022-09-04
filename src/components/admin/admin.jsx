import React, { useCallback, useEffect, useState } from 'react'
import db, { addevent } from '../../firebase';
import './admin.scss'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from '../Scroll';
import Popup from 'reactjs-popup';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectsub } from '../../features/subSlice';
import exportFromJSON from 'export-from-json'
import { useHistory } from 'react-router-dom';


toast.configure();

function Admin({events}) {
  
    const [page, setPage] = useState(1);
    const [submit, setSubmit] = useState(true);
    const [submit2, setSubmit2] = useState(true);
    const   admin=useSelector(selectsub)
    const [members, setMembers] = useState({});
    const [options, setOptions] = useState(
[
  "Total_Registration",
  "STREETART",
  "5x5basketball(Women)",
  "5x5basketball(Men)",
  "ART-A-HOLIC",
  "AUTOQUIZ",
  "Animezing",
  "Arduinoprogramming",
  "BGMI",
  "BRICKLAYER",
  "BattleofFlavours",
  "BlindTasteTest",
  "BlockchainWorkshop",
  "CADMASTER",
  "CHEMBRANE",
  "CHEMCAR",
  "CIRCUITMANIAC",
  "COBRALEDERE",
  "COUNTYCRICKET",
  "DOUBLETROUBLE",
  "DUODANCE",
  "Dumbcharades",
  "Electrohunt",
  "FILMTRIVIA",
  "Futsal(3X3)",
  "Groove",
  "HAUTECOUTURE",
  "HYPERLINK",
  "IMAGICA",
  "JAM(Eng)",
  "JAM(Mal&Eng)",
  "Kaptured''22",
  "LEGION",
  "LINEFOLLOWER",
  "LaugherCruise",
  "MECHFACTORY",
  "MYSTICALCARNIVAL",
  "Machinomer",
  "Manofsteel2022",
  "MechManiac",
  "Movietalkies",
  "Mr&MsNakshatra",
  "NirvanaNation",
  "PESTournament",
  "PencilMania",
  "Pic-O-Mania",
  "QUEEN'SGAMBIT",
  "ROBOFIESTA",
  "Racquettes",
  "Racquettes(Women)",
  "Reelflix",
  "Reelistic",
  "RollATroll",
  "STRIKE'EMDOWN",
  "SURVEYOR",
  "Scenedecrime",
  "SpeedTyping",
  "SyncSteps",
  "TITANACTORS",
  "TreasureHunt",
  "VRGAMING",
  "ValorantChallengers",
  "Voiceofnakshtra",
  "StringsUnplugged"
]
  );
    const [userid, setUserid] = useState("");
    const [registered, setRegistered] = useState({});
    const [updateevent, setUpdateevent] = useState({});
    const [exportdata2, setExportdata2] = useState([]);

    const [eventselect,setEventselect]=useState("STREETART")
    const [eventselect2,setEventselect2]=useState("STREETART")
    const [event, setUser] = useState({
        category:"technical",
        subcategory:"home_event",
        Noofgroupmembers: "0",
        Active:"true",
        payment_mode: "true",
        registration:"true",
        event_type:"online",
        g_form_link:"",
        Group:"true"
    } );
  
    let history = useHistory();

    const [loading, setLoading] = useState(false)
    const exportType =  exportFromJSON.types.xls
    const handleChange =useCallback((e) => {
        const { name, value } = e.target;
        setUser({ ...event, [name]: value.trim()});
      },[event]);
      const handleChange5 =useCallback((e) => {
        const { name, value } = e.target;
        setUpdateevent({ ...updateevent, [name]: value.trim()});
      },[updateevent]);
      const handleChange3 =useCallback((e) => {
        const {  value } = e.target;
        setUserid(value.trim());
      },[]);
      const submitt= () => {
        setExportdata2([])
          setSubmit(!submit)
      }
      const submitt2= () => {
        setSubmit2(!submit2)
    }
 
      const handleChange2 =useCallback((e) => {
        const {  value } = e.target;
        setEventselect(value.trim());
      },[]);
      const handleChange4 =useCallback((e) => {
        const {  value } = e.target;
        setEventselect2(value.trim());
      },[]);
      const registers =(e) => {
        e.preventDefault();
   setLoading(true)
        addevent(event).then(() => {
            setLoading(false)
           toast.success("Added Successfully")
                    })
            
    } 
    const registers2 =(e) => {
        e.preventDefault();
   setLoading(true)
        addevent(updateevent).then(() => {
            setLoading(false)
           toast.success("Added Successfully")
                    })
            
    } 
    useEffect(() => {
if(!admin?.userdetails?.admin){
  history.push("/")
}

    if(events){
  Object.entries(events).forEach( async ([productId,productData]) =>{
    if (!options.includes(productId)) {
      setOptions(prevState =>[...prevState,productId])
    }
   
  })
    }

  
    }, [events,admin,options])





    useEffect(() =>{

        const fetchregistered =() =>{
     
   
          if(eventselect!=="Total_Registration"){
        setLoading(true)
         db.collection("registerededevents")
        .where("productId","==",eventselect)
         .get()
          .then((querySnapshot) =>{
        setLoading(false)
if(!querySnapshot.empty){
    querySnapshot.forEach(async productDoc =>{
        if(productDoc.exists){
            setRegistered(prevState =>({...prevState,[productDoc.id.replaceAll(/\s/g,'')]:productDoc.data()}))
              db.collection('appUsers').doc(productDoc.data().uid).get().then(data2=>{
             
        setExportdata2(prevState => ([...prevState,{
          'Event':productDoc.data()?.eventname,
          'NK-ID': data2.data()?.unique,
     Name:data2.data()?.Name,
     Department:data2.data()?.department,
     College:data2.data()?.collegename,
   Email:data2.data()?.Email,
       Amount:productDoc.data()?.payment_mode==="Online"?events[productDoc.data()?.productId]?.amount:"0",
       'Mobile Number':data2.data()?.phoneNumber,
       'Payment Mode': productDoc.data()?.payment_mode,
       'Payment-ID':  productDoc.id,
        
        }]))
              })
        
         


        }
     
    })
}else{
    setLoading(false)
    setRegistered({})
}
   
          
         })
     
        } 
        else{
          setLoading(true)
          db.collection("registerededevents")
          .get()
           .then((querySnapshot) =>{
         setLoading(false)
 if(!querySnapshot.empty){
     querySnapshot.forEach(async productDoc =>{
         if(productDoc.exists){
   
             setRegistered(prevState =>({...prevState,[productDoc.id.replaceAll(/\s/g,'')]:productDoc.data()}))
               db.collection('appUsers').doc(productDoc.data().uid).get().then(data2=>{
              
         setExportdata2(prevState => ([...prevState,{
           'Event':productDoc.data()?.eventname,
                'NK-ID': data2.data()?.unique,
           Name:data2.data()?.Name,
           Department:data2.data()?.department,
           College:data2.data()?.collegename,
         Email:data2.data()?.Email,
         Amount:productDoc.data()?.payment_mode==="Online"?events[productDoc.data()?.productId]?.amount:"0",
             'Mobile Number':data2.data()?.phoneNumber,
             'Payment Mode': productDoc.data()?.payment_mode,
             'Payment-ID':  productDoc.id,
           
         
         }]))
               })
         
          
 
 
         }
      
     })
 }else{
     setLoading(false)
     setRegistered({})
 }
    
           
          })

        }
      }
        fetchregistered()
        return () => {
      setRegistered({})
        }

             },[submit]);
   
             
             useEffect(() =>{
                const fetchregistered =() =>{
                setLoading(true)
                 db.collection("events")
                 .where("productId","==",eventselect2)
                 .get()
                  .then((querySnapshot) =>{
                setLoading(false)
        if(!querySnapshot.empty){
            querySnapshot.forEach(async productDoc =>{
                if(productDoc.exists){
                    setUpdateevent(productDoc.data())
                   
                }
             
            })
        }else{
            setLoading(false)
            setRegistered({})
            toast.error("ERROR")
        }
           
                   
                 }).catch(error =>{
                     console.log(error)
                 })
                } 
               
                fetchregistered()
        
                     },[submit2]);
                 
          const fetchnkid= (nkid)=>{
        
            db.collection('users')
            .doc(nkid).get('user1')
            .then(querySnapshop =>{
             
              if(querySnapshop.exists){
                setMembers(querySnapshop.data())
              }else{
             
                db.collection('users').where("unique","==",nkid).get().then(querySnapshop =>{
                  querySnapshop.forEach(async productDoc =>{
                  setMembers(productDoc.data())
        
                })
                   })
              }
        
   
        
            }).catch(error => {
     
            })
          }
console.log(exportdata2)
  return (

    
<div 
      className='Signup_box'>
<ScrollToTop/>
              <div className="filter_admin">
        <div class="dropdown">
  <button onClick={() =>{setPage(1)}} className={page===1?"dropbtn dropshadow":"dropbtn"}>Add event</button>
  <button onClick={() =>{setPage(2)}} className={page===2?"dropbtn dropshadow":"dropbtn"}>registration details</button>
  <button onClick={() =>{setPage(3)}} className={page===3?"dropbtn dropshadow":"dropbtn"}>Fetch user</button>
  <button onClick={() =>{setPage(4)}} className={page===4?"dropbtn dropshadow":"dropbtn"}>Update event</button>
</div>
</div>
<div className='flex_1 adminflex1'>
{
    page===1&&
         <motion.div
         
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: .8 }}
         className="signup">
                 <form  className='addevent' onSubmit={registers} >
        <h1>ADD EVENT</h1>
        <span>Event Name</span>
        <input  onChange={handleChange}  required={true} name='product_name'  placeholder='Name'  type="text"></input>
        <span>Event Image Url</span>
        <input  onChange={handleChange}  required={true} name='url'  placeholder='Url'  type="text"></input>
        <span>Event Type</span>
        <select  onChange={handleChange}  required={true} name='event_type'   type="text" >
            <option selected={true} value="online" placeholder="Technical">Online</option>
            <option value="offline" placeholder="Technical">Offline</option>
        </select>
        <span>Description</span>
        <textarea  onChange={handleChange}  required={true} name='description' placeholder='description'  ></textarea>
        <span>Rules and Regulations</span>
        <textarea  onChange={handleChange}  required={true}  name='rulesandregulations' placeholder="Rules and Regulations"></textarea>
        <span>Prizes</span>
        <textarea  onChange={handleChange}  required={true}  name='prices' placeholder="Prices"></textarea>
        <span>Venue</span>
        <input  onChange={handleChange}  required={true} name='venue' placeholder="Venue"  type="text" ></input>
        <span>Date,Time</span>
        <input  onChange={handleChange}  required={true} name='date' placeholder="Date-Time"  type="text" ></input>
        <span>Head Name</span>
        <input  onChange={handleChange}  required={true} name='Head_name' placeholder="Head_name"  type="text" ></input>
        <span>Head Phonenumber</span>
        <input  onChange={handleChange}  required={true}   name='Head_phonenumber' placeholder="Head_phonenumber"  type="text" ></input>
        <span>Subhead1 Name</span>
        <input  onChange={handleChange}  required={true} name='SubHead1' placeholder="Subhead1_name"  type="text" ></input>
        <span>Subhead1 Phonenumber</span>
        <input  onChange={handleChange}  required={true}   name='SubHead1_phonenumber' placeholder="SubHead1_phonenumber"  type="text" ></input>
        <span>Subhead2 Name</span>
        <input  onChange={handleChange}  required={true} name='SubHead2' placeholder="Subhead2_name"  type="text" ></input>
        <span>Subhead2 Phonenumber</span>
        <input  onChange={handleChange}  required={true}  name='SubHead2_phonenumber' placeholder="SubHead2_phonenumber"  type="text" ></input>
        <span>Category</span>
        <select  onChange={handleChange}  required={true} name='category' placeholder="technical or nontechnical"  type="text" >
            <option selected={true} value="technical" placeholder="Technical">Technical</option>
            <option value="nontechnical" placeholder="Technical">Non Technical</option>
        </select>
        <span>Sub Category</span>
        <select  onChange={handleChange}  required={true} name='subcategory' placeholder="subcategory"  type="text" >
        <option selected={true}  value="home_event" placeholder="homeevent">Home-event</option>
            <option value="wrokshop" placeholder="workshop">Workshop</option>
            <option value="art" placeholder="workshop">Art</option>
            <option value="sports" placeholder="workshop">Sports</option>
            <option value="creative" placeholder="workshop">Creative</option>
        </select>
        <span>Amount</span>
        <input  onChange={handleChange}  required={true} name='amount' placeholder="amount"  type="number" ></input>
        <span>Group Event</span> 
        <select  onChange={handleChange}  required={true} name='Group' placeholder="Group  - true or false"  type="text" >
        <option selected={true} value="true">True</option>
            <option value="false" >False</option>
        </select>
        <span>No of members</span> 
        <input onChange={handleChange}  name='Noofgroupmembers' placeholder="0-10"  type="number" ></input>
        <span>Minimum no of participants</span>
        <input  onChange={handleChange}  required={true} name='minimum' placeholder="0,1,2.."  type="number" ></input>
        <span>G_FORM_LINK</span>
 <input   onChange={handleChange}    name='g_form_link' placeholder="G_FORM_LINK"  type="text" ></input>
        <span>Limit</span> 
 <input   onChange={handleChange}  name='count' placeholder="0,1,2..."  type="number" ></input>
        <span>Event Active</span> 
        <select  onChange={handleChange}  required={true} name='Active' placeholder="Active  - true or false(optional)"  type="text" >
        <option selected={true} value="true" placeholder="Technical">True</option>
            <option value="false" placeholder="Technical">False</option>
        </select>
        <span>Registration opened or closed</span> 
        <select  onChange={handleChange}  required={true} name='registration'  type="text" >
        <option selected={true} value="true" >True</option>
            <option value="false">False</option>
        </select>
        <span>Paymode mode</span> 
 <select  onChange={handleChange}  required={true} name='payment_mode'  type="text" >
 <option selected={true} value="true" >Online</option>
     <option value="false">Offline</option>
 </select>
        <button   type="submit" >{loading?"UPDATED":"SUBMIT"}</button>
        </form>

        </motion.div>}
        {page===2 &&
        <motion.div
        
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: .8 }}
         className='button_registered'>
           <div className="select_div">
    
           {options.length>0&&
            <select  onChange={handleChange2} className='fetch_select_div'>
           {options.map(data =>{
               return(
                   <option>{data}</option>
               )
           })}
        </select>
            }
<button className='button_admin admin_btn' onClick={() =>{setRegistered({});submitt();}}>Submit</button>
<button className='button_admin' onClick={() =>   
        exportFromJSON( {data:exportdata2,fileName:eventselect,exportType: exportType} )

    }>
    Download Data
  </button>
           </div>
         
<h3 className='noof'>No of registrations:&nbsp;{Object.keys(registered)?.length}</h3>
<h3 className='noof'>Total amount:&nbsp;{Object.keys(registered).length*events[eventselect]?.amount}</h3>
{
    
Object.entries(registered).map(([productId,productData]) =>{

    const profile =  JSON.parse(productData?.profile);
    const groupmembers =  JSON.parse(productData?.groupmembers);
    const groupmembers2 =  JSON.parse(productData?.groupmembers2);
   
    return(
        <div className="team">
          <h4>Payment Mode:&nbsp;{productData?.payment_mode==="Offline"?"OFFLINE":"ONLINE"}</h4>
<Popup
    trigger={<button className="events_com_button black2">{profile?.nkid}</button>}
    modal
    onOpen={()=>{fetchnkid(profile?.nkid,productData.uid);}}
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
        {}
<div className="member_details_div">
<h4>Created at :&nbsp;{members?.createdAt?.toDate().toDateString()}</h4>
<h4>Name :&nbsp;{members?.user1?.fullname}</h4>

        <h4>Phonenumber :&nbsp;{members?.user1?.phonenumber}</h4>
        <h4>Email :&nbsp;{members?.user1?.email}</h4>
        <h4>Collegename :&nbsp;{members?.user1?.collagename}</h4>
        <h4>Department :&nbsp;{members?.user1?.department}</h4>
        <h4>Semester :&nbsp;{members?.user1?.semister}</h4>
        <h4>UID :&nbsp;{members?.uid}</h4>

</div>
   
      </motion.div>
    )}
  </Popup>
<h4>{profile?.userdetails?.fullname}</h4>
<h4>{profile?.userdetails?.phonenumber}</h4>
<h4>{profile?.userdetails?.email}</h4>
{groupmembers &&<h4 className='group_members'>Groupmembers</h4>}
<div className="groupmember_row">
{groupmembers && Object.entries(groupmembers).map(([productId,productData])=>{
    return(
        <Popup
        trigger={<button className="events_com_button black2">{productId}</button>}
        modal
        onOpen={()=>{fetchnkid(productId);}}
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
            {}
    <div className="member_details_div">
    <h4>Created at :&nbsp;{members?.createdAt?.toDate().toDateString()}</h4>
    <h4>Name :&nbsp;{members?.user1?.fullname}</h4>
    
            <h4>Phonenumber :&nbsp;{members?.user1?.phonenumber}</h4>
            <h4>Email :&nbsp;{members?.user1?.email}</h4>
            <h4>Collegename :&nbsp;{members?.user1?.collagename}</h4>
            <h4>Department :&nbsp;{members?.user1?.department}</h4>
            <h4>Semester :&nbsp;{members?.user1?.semister}</h4>
            <h4>UID :&nbsp;{members?.uid}</h4>
    
    </div>
       
          </motion.div>
        )}
      </Popup>
    )
})}
{groupmembers2 && Object.entries(groupmembers2).map(([productId,productData])=>{
    return(
        <Popup
        trigger={<button className="events_com_button black2">{productId}</button>}
        modal
        onOpen={()=>{fetchnkid(productId);}}
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
            {}
    <div className="member_details_div">
    <h4>Created at :&nbsp;{members?.createdAt?.toDate().toDateString()}</h4>
    <h4>Name :&nbsp;{members?.user1?.fullname}</h4>
    <h4>Phonenumber :&nbsp;{members?.user1?.phonenumber}</h4>
    <h4>Email :&nbsp;{members?.user1?.email}</h4>
    <h4>Collegename :&nbsp;{members?.user1?.collagename}</h4>
    <h4>Department :&nbsp;{members?.user1?.department}</h4>
    <h4>Semester :&nbsp;{members?.user1?.semister}</h4>
    <h4>UID :&nbsp;{members?.uid}</h4>
    
    </div>
       
          </motion.div>
        )}
      </Popup>
    )
})}
</div>

        </div>
    )
 
})}
            </motion.div>
       
        }
        {page===3 && 
        <motion.div 
        
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: .8 }}
        className='button_registered'>
     <div className="select_div">
        <input  onChange={handleChange3} className='fetch_select_div' placeholder='Enter NK-ID'>
    
    </input>
    
    <Popup
        trigger={<button className="button_admin">SUBMIT</button>}
        modal
        onOpen={()=>{fetchnkid(userid);}}
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
            {}
    <div className="member_details_div">
    <h4>Created at :&nbsp;{members?.createdAt?.toDate().toDateString()}</h4>
    <h4>Name :&nbsp;{members?.user1?.fullname}</h4>
    
            <h4>Phonenumber :&nbsp;{members?.user1?.phonenumber}</h4>
            <h4>Email :&nbsp;{members?.user1?.email}</h4>
            <h4>Collegename :&nbsp;{members?.user1?.collagename}</h4>
            <h4>Department :&nbsp;{members?.user1?.department}</h4>
            <h4>Semester :&nbsp;{members?.user1?.semister}</h4>
            <h4>UID :&nbsp;{members?.uid}</h4>
            {members?.registered &&   <h4 className='group_members'>Registered Events</h4>}
            <div className="groupmember_row">
    {members?.registered && members.registered.map(data =>{
        return(
         
                         <button className="events_com_button black2">{data}</button>
        
   
        )
     
    })}
        </div>
    </div>
       
          </motion.div>
        )}
      </Popup>

      </div>
        </motion.div> }
        {page===4&&
          <motion.div 
          
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: .8 }}
          className="signup">
  <div className="select_div">
  {options.length>0&&
            <select  onChange={handleChange4} className='fetch_select_div'>
           {options.map(data =>{
               return(
                   <option>{data}</option>
               )
           })}
        </select>
            }
            <button className='button_admin' onClick={() =>{submitt2();}}>Submit</button>
  </div>
 
          <form  className='addevent' key={updateevent.productId} onSubmit={registers2} >
 <h1>UPDATE EVENT</h1>


 <span>Event Image Url</span>
 <input defaultValue={updateevent.url} onChange={handleChange5}  required={true} name='url'  placeholder='Url'  type="text"></input>
 <span>Event Type</span>
 <select  onChange={handleChange5}  required={true} name='event_type'   type="text" >
     <option selected={true} value="online" placeholder="Technical">Online</option>
     <option value="offline" placeholder="Technical">Offline</option>
 </select>
 <span>Description</span>
 <textarea defaultValue={updateevent.description}   onChange={handleChange5}  required={true} name='description' placeholder='description'  ></textarea>
 <span>Rules and Regulations</span>
 <textarea defaultValue={updateevent.rulesandregulations}  onChange={handleChange5}  required={true}  name='rulesandregulations' placeholder="Rules and Regulations"></textarea>
 <span>Prizes</span>
 <textarea defaultValue={updateevent.prices}  onChange={handleChange5}  required={true}  name='prices' placeholder="Prices"></textarea>
 <span>Venue</span>
 <input  defaultValue={updateevent.venue}   onChange={handleChange5}  required={true} name='venue' placeholder="Venue"  type="text" ></input>
 <span>Date,Time</span>
 <input defaultValue={updateevent.date}   onChange={handleChange5}  required={true} name='date' placeholder="Date-Time"  type="text" ></input>
 <span>Head Name</span>
 <input defaultValue={updateevent.Head_name}   onChange={handleChange5}  required={true} name='Head_name' placeholder="Head_name"  type="text" ></input>
 <span>Head Phonenumber</span>
 <input defaultValue={updateevent.Head_phonenumber}  onChange={handleChange5}  required={true}   name='Head_phonenumber' placeholder="Head_phonenumber"  type="text" ></input>
 <span>Subhead1 Name</span>
 <input defaultValue={updateevent.SubHead1} onChange={handleChange5}  required={true} name='SubHead1' placeholder="Subhead1_name"  type="text" ></input>
 <span>Subhead1 Phonenumber</span>
 <input defaultValue={updateevent.SubHead1_phonenumber} onChange={handleChange5}  required={true}   name='SubHead1_phonenumber' placeholder="SubHead1_phonenumber"  type="text" ></input>
 <span>Subhead2 Name</span>
 <input defaultValue={updateevent.SubHead2}    onChange={handleChange5}  required={true} name='SubHead2' placeholder="Subhead2_name"  type="text" ></input>
 <span>Subhead2 Phonenumber</span>
 <input defaultValue={updateevent.SubHead2_phonenumber}  onChange={handleChange5}  required={true}  name='SubHead2_phonenumber' placeholder="SubHead2_phonenumber"  type="text" ></input>

 <span>Category</span>
 <select  onChange={handleChange5}  required={true} name='category' placeholder="technical or nontechnical"  type="text" >
     <option selected={true} value="technical" placeholder="Technical">Technical</option>
     <option value="nontechnical" placeholder="Technical">Non Technical</option>
 </select>
 <span>Sub Category</span>
 <select  onChange={handleChange5}  required={true} name='subcategory' placeholder="subcategory"  type="text" >
 <option selected={true}  value="home_event" placeholder="homeevent">Home-event</option>
     <option value="wrokshop" placeholder="workshop">Workshop</option>
     <option value="art" placeholder="workshop">Art</option>
     <option value="sports" placeholder="workshop">Sports</option>
     <option value="creative" placeholder="workshop">Creative</option>
 </select>
 <span>Amount</span>
 <input defaultValue={updateevent.amount}onChange={handleChange5}  required={true} name='amount' placeholder="amount"  type="number" ></input>
 <span>Group Event</span> 
 <select  onChange={handleChange5}  required={true} name='Group' placeholder="Group  - true or false"  type="text" >
 <option selected={true} value="true">True</option>
     <option value="false" >False</option>
 </select>
 <span>No of members</span> 
 <input defaultValue={updateevent.Noofgroupmembers}  onChange={handleChange5}  name='Noofgroupmembers' placeholder="0-10"  type="number" ></input>
 <span>Limit</span> 
 <input defaultValue={updateevent.count}  onChange={handleChange5}  name='count' placeholder="0,1,2,.."  type="number" ></input>
 <span>Minimum no of participants</span>
 <input defaultValue={updateevent.minimum}  onChange={handleChange5}  required={true} name='minimum' placeholder="0,1,2.."  type="number" ></input>
 <span>G_FORM_LINK</span>
 <input defaultValue={updateevent.g_form_link}  onChange={handleChange5}    name='g_form_link' placeholder="G_FORM_LINK"  type="text" ></input>
 
 <span>Event Active</span> 
 <select  onChange={handleChange5}  required={true} name='Active' placeholder="Active  - true or false(optional)"  type="text" >
 <option selected={true} value="true" placeholder="Technical">True</option>
     <option value="false" placeholder="Technical">False</option>
 </select>
 <span>Registration opened or closed</span> 
 <select  onChange={handleChange5}  required={true} name='registration'  type="text" >
 <option selected={true} value="true" >True</option>
     <option value="false">False</option>
 </select>
 <span>Paymode mode</span> 
 <select  onChange={handleChange5}  required={true} name='payment_mode'  type="text" >
 <option selected={true} value="true" >Online</option>
     <option value="false">Offline</option>
 </select>
 <button   type="submit" >{loading?"UPDATED":"UPDATE"}</button>
 </form>

 </motion.div>
        }
    </div>
  

    
      </div>

  )
}

export default Admin