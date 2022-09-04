import firebase from "firebase/compat/app"
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import { getAnalytics } from "firebase/analytics";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth=firebase.auth();
  const analytics = getAnalytics(firebaseApp);


  export {auth,analytics};
  export default db;
  export const createUserDocument = async (user,user1) => {
    
    if (!user) return;
    if (!user1) return; 

    const uniqueidgenerate = async  () =>{
      const uniqueId = (length=5) => {
        return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
      }
      const unique = "NK-"+uniqueId()

      const userRef2 = db.doc(`users/${user.uid}`);
      const userRef3 = db.doc(`appUsers/${user.uid}`);
      const { email,phonenumber,fullname,department,collagename,semister} = user1
 
      
      const snapshot2 = await userRef2.get();
      const eventdetails ={
        unique: unique
    }
    const data = await fetch('https://asia-south1-nakshatra-1c394.cloudfunctions.net/app/checkuser',{method: 'POST',headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify(eventdetails)}).then((t) =>
        t.json()
    ).catch((error) => {
      toast.error("Please try again after some time")
     return
    }
   
    )
    if(!data?.check){
      uniqueidgenerate()
    }
  
      if(!snapshot2.exists  && data?.check){
        try {
          await userRef2.set({
            user1,
            uid:user.uid,
            unique:unique,
            createdAt: new Date(),
          });
        } catch (error) {
          console.log('Error in creating user', error);
        }

        const snapshot3 = await userRef3.get();
        if(!snapshot3.exists){
          try {
            await userRef3.set({
              Email: email,
              Name: fullname,
              UID: user.uid,
       
        
              department: department,
              collegename: collagename,
              semister: semister,
            
          
          
              unique: unique,
              referCount: 0,
              webreferCount:0,
              isAdmin: false,
              isHead: false,
          
              phoneNumber: phonenumber,
          
              referID: user.uid.substring(1,6).toUpperCase(),
            
              createdAt: new Date(),
            });
          } catch (error) {
            console.log('Error in creating user', error);
          }
        }
      }else{
        uniqueidgenerate()
      }
      }
    
 

    
      uniqueidgenerate()

  };
  export const createUserDocument2 = async (user,user1,unique) => {
    
    if (!user) return;
    if (!user1) return; 

 
      const userRef = db.doc(`appUsers/${user.uid}`);
      const userRef2 = db.doc(`users/${unique}`);

      
      const snapshot2 = await userRef2.get();
      if(snapshot2.exists){
        try {
          await userRef2.update({
            user1,
         
          });
        } catch (error) {
          console.log('Error in creating user', error);
        }}else{
          const userRef10 = db.doc(`users/${user.uid}`);
          try {
            await userRef10.update({
              user1,
           
            });
          } catch (error) {
            console.log('Error in creating user', error);
          }

        }
        const {collagename,email,semister,fullname,department,phonenumber} = user1;
        const snapshot = await userRef.get();
 
        if (snapshot.exists) {
         
          try {
            await userRef.update({
              Email:email,
              collegename:collagename,
              department:department,
              phoneNumber:phonenumber,
              semister:semister,
              Name:fullname
            
            });
     
          } catch (error) {
            console.log('Error in creating user', error);
          }
        }
        
      
      
    

  };
  export const createUserDocument3 = async (message) => {
    
    if (!message) return;
    const uniqueId = (length=8) => {
      return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
    }
    const unique = uniqueId()


      const userRef2 = db.doc(`messages/${unique}`);

   
        try {
          await userRef2.set({
            createdAt: new Date(),
            message
         
          });
        } catch (error) {
          console.log('Error in creating user', error);
        }
     
      
      
    

  };
 
  export const addevent = async (event) => {
    
    if (!event) return;
  


      const userRef2 = db.doc(`events/${event.product_name}`);
      
  const {Active,Group,Head_name,Head_phonenumber,SubHead1,SubHead1_phonenumber,SubHead2,SubHead2_phonenumber,amount,product_name,category,subcategory,description,rulesandregulations,Noofgroupmembers,url,venue,date,event_type,registration,minimum,prices,count,payment_mode,g_form_link} =event;


        try {
          await userRef2.set({
            createdAt: new Date(),
         Active:Active,
         product_name:product_name,
         url:url,
         event_type:event_type,
         description:description,
         rulesandregulations:rulesandregulations,
         venue:venue,
         date:date,
         amount:amount,
         Group:Group,
         Noofgroupmembers:Noofgroupmembers,
         category:category,
         subcategory:subcategory,
         Head_name:Head_name,
         Head_phonenumber:Head_phonenumber,
         SubHead1:SubHead1,
         SubHead1_phonenumber:SubHead1_phonenumber,
         SubHead2:SubHead2,
         count: parseInt(count),
         SubHead2_phonenumber:SubHead2_phonenumber,
         registration:registration,
         minimum:minimum,
         prices:prices,
productId: product_name.replaceAll(/\s/g,''),
payment_mode:payment_mode,
g_form_link:g_form_link

         
          });
        } catch (error) {
          console.log('Error in creating user', error);
        }
     
      
      
    

  };