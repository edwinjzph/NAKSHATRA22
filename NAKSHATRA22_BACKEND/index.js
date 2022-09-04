const functions = require("firebase-functions");
const express = require('express');
const Razorpay = require('razorpay')
const shortid = require('shortid')
const cors = require('cors');
const app = express();
const admin = require('firebase-admin')
const service = require('./service.json')
const sgMail = require('@sendgrid/mail')

admin.initializeApp({
    credential: admin.credential.cert(service)
  });
  const db = admin.firestore();

app.use(cors({ origin: true }));
app.use(express.json({limit : '1mb' }))
const razorpay= new Razorpay({ key_id: 'rzp_**********',
 key_secret: '*******************' })

 app.post('/verification',async (req,res) =>{
	// do a validation
	const secret = '************'


	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
        if(req.body.payload.payment.entity?.notes?.app !== "isApp"){
            const obj =  JSON.parse(req.body.payload.payment.entity?.notes?.groupmembers);
            const obj3 =  JSON.parse(req.body.payload.payment.entity?.notes?.groupmembers2);
            const obj2 = JSON.parse(req.body.payload.payment.entity?.notes?.profile);
            {obj && Object.entries(obj).map(([Id,Data]) =>{
               
                db.collection('appUsers')
                .doc(Data.toString())
                .collection('payments').doc(req.body.payload.payment.entity.id).set(
                    req.body.payload.payment.entity
                ).then(() => {
                    console.log("write success")
          
                })
  

              })}
            
              {obj && Object.entries(obj).map(async ([Id,Data])=>{
                const userRef2 = db.doc(`users/${Id}`);
                  try {
                    await userRef2.update(
                        {
                            registered: admin.firestore.FieldValue.arrayUnion(req.body.payload.payment.entity.notes.productId)
                        }
                    );
                  } catch (error) {
                    console.log('Error in creating user', error);
                  }}
        
  

              )}
   

              {obj3 && Object.entries(obj3).map(([Id,Data]) =>{
                db.collection('appUsers')
                .doc(Data.toString())
                .collection('payments').doc(req.body.payload.payment.entity.id).set(
                    req.body.payload.payment.entity
                ).then(() => {
                    console.log("write success")
                
                })
        
              })}
              {obj3 && Object.entries(obj3).map(async ([Id,Data])=>{
                const userRef2 = db.doc(`users/${Id}`);
                  try {
                    await userRef2.update(
                        {
                            registered: admin.firestore.FieldValue.arrayUnion(req.body.payload.payment.entity.notes.productId)
                        }
                    );
                  } catch (error) {
                    console.log('Error in creating user', error);
                  }}
        
  

              )}
      
    if(obj2){
        db.collection('appUsers').where("referID","==",req.body.payload.payment.entity?.notes?.referal).get().then((querySnapshop) =>{
        
            querySnapshop.forEach(doc => {
              if(doc.exists)
       {      db.collection("appUsers").doc(doc.data().UID).update({
           referCount: admin.firestore.FieldValue.increment(1),
           referevent: admin.firestore.FieldValue.arrayUnion(obj2.userdetails.fullname)
       })
       db.collection("users").doc(doc.data().unique).update({
        referCount: admin.firestore.FieldValue.increment(1),
        referevent: admin.firestore.FieldValue.arrayUnion(obj2.userdetails.fullname)
    }).catch(error => {
      db.collection("users").doc(doc.data().UID).update({
        referCount: admin.firestore.FieldValue.increment(1),
        referevent: admin.firestore.FieldValue.arrayUnion(obj2.userdetails.fullname)
    })
    })}
            })
             })
    
            db.collection('appUsers')
            .doc(req.body.payload.payment.entity.notes.uid)
            .collection('payments').doc(req.body.payload.payment.entity.id).set(
                req.body.payload.payment.entity
            ).then(() => {
                console.log("write success")
            })
            db.collection('events').where("productId","==",req.body.payload.payment.entity?.notes?.productId).get().then((querySnapshop) =>{
        
                querySnapshop.forEach(doc => {
                  if(doc.exists)
           {      db.collection("events").doc(doc.id).update({
               count: admin.firestore.FieldValue.increment(-1),
         
           })
}
                })
                 })
        
              const userRef5 = db.doc(`users/${obj2.nkid}`);
              const snapshot10 = await userRef5.get();
              if(snapshot10.exists){
                try {
                  await userRef5.update(
                      {
                          registered: admin.firestore.FieldValue.arrayUnion(req.body.payload.payment.entity.notes.productId)
                      }
                  );
                } catch (error) {
                  console.log('Error in creating user', error);
                }
              }else{
                const userRef11 = db.doc(`users/${req.body.payload.payment.entity.notes.uid}`);
                try {
                  await userRef11.update(
                      {
                          registered: admin.firestore.FieldValue.arrayUnion(req.body.payload.payment.entity.notes.productId)
                      }
                  );
                } catch (error) {
                  console.log('Error in creating user', error);
                }
              }

            const userRef2 = db.doc(`registerededevents/${req.body.payload.payment.entity.id}`);
          
            const snapshot2 = await userRef2.get();
            if(!snapshot2.exists){
              try {
                await userRef2.set(
                    req.body.payload.payment.entity.notes
                );
              } catch (error) {
                console.log('Error in creating user', error);
              }}
            sgMail.setApiKey('**********************************')
            const msg = {
              to: obj2.userdetails.email, // Change to your recipient
              from: 'edwinjzph2000@gmail.com', // Change to your verified sender
              subject: 'Nakshatra 2022',
              text: 'Thank your for registering',
              html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
              <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
              <head>
              <!--[if gte mso 9]>
              <xml>
                <o:OfficeDocumentSettings>
                  <o:AllowPNG/>
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
              </xml>
              <![endif]-->
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta name="x-apple-disable-message-reformatting">
                <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
                <title></title>
                
                  <style type="text/css">
                    @media only screen and (min-width: 620px) {
                .u-row {
                  width: 600px !important;
                }
                .u-row .u-col {
                  vertical-align: top;
                }
              
                .u-row .u-col-50 {
                  width: 300px !important;
                }
              
                .u-row .u-col-100 {
                  width: 600px !important;
                }
              
              }
              
              @media (max-width: 620px) {
                .u-row-container {
                  max-width: 100% !important;
                  padding-left: 0px !important;
                  padding-right: 0px !important;
                }
                .u-row .u-col {
                  min-width: 320px !important;
                  max-width: 100% !important;
                  display: block !important;
                }
                .u-row {
                  width: calc(100% - 40px) !important;
                }
                .u-col {
                  width: 100% !important;
                }
                .u-col > div {
                  margin: 0 auto;
                }
              }
              body {
                margin: 0;
                padding: 0;
              }
              
              table,
              tr,
              td {
                vertical-align: top;
                border-collapse: collapse;
              }
              
              p {
                margin: 0;
              }
              
              .ie-container table,
              .mso-container table {
                table-layout: fixed;
              }
              
              * {
                line-height: inherit;
              }
              
              a[x-apple-data-detectors='true'] {
                color: inherit !important;
                text-decoration: none !important;
              }
              
              table, td { color: #000000; } a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_image_1 .v-src-width { width: auto !important; } #u_content_image_1 .v-src-max-width { max-width: 60% !important; } #u_content_heading_1 .v-font-size { font-size: 18px !important; } #u_content_heading_2 .v-font-size { font-size: 30px !important; } #u_content_text_1 .v-container-padding-padding { padding: 10px !important; } #u_content_button_1 .v-container-padding-padding { padding: 30px 10px 80px !important; } #u_content_button_1 .v-padding { padding: 10px 20px !important; } }
                  </style>
                
                
              
              <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
              
              </head>
              
              <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #000000;color: #000000">
                <!--[if IE]><div class="ie-container"><![endif]-->
                <!--[if mso]><div class="mso-container"><![endif]-->
                <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #000000;width:100%" cellpadding="0" cellspacing="0">
                <tbody>
                <tr style="vertical-align: top">
                  <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #000000;"><![endif]-->
                  
              
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                  <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                    
              <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
              <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
                
              <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                      
                <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #000000;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                  <tbody>
                    <tr style="vertical-align: top">
                      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <span>&#160;</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
                <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                </div>
              </div>
              <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              
              
              
              <div class="u-row-container" style="padding: 0px;background-image: url(https://ik.imagekit.io/5iaqs2tchv9/images/Group_2_8LW9MyPwU.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649531516626);background-repeat: no-repeat;background-position: center top;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                  <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-image: url('images/image-7.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                    
              <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
              <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                <div style="width: 100% !important;">
                <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
                
              <table id="u_content_image_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
                      
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right: 0px;padding-left: 0px;" align="center">
                    
                    <img align="center" border="0" src="https://ik.imagekit.io/5iaqs2tchv9/images/image-6_lEoTPHRjq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649530526514" alt="Logo" title="Logo" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 35%;max-width: 203px;" width="203" class="v-src-width v-src-max-width"/>
                    
                  </td>
                </tr>
              </table>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <table id="u_content_heading_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:50px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
                      
              
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <table id="u_content_heading_2" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                      
                <h1 class="v-font-size" style="margin: 0px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: 400; font-family: 'Montserrat',sans-serif; font-size: 30px;">
                  <strong>Hi ${obj2.userdetails.fullname}</strong><br /><strong>You have been successfully registered with Nakshatra 22 for the event ${req.body.payload.payment.entity.notes.eventname}.</strong>
                </h1>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <table id="u_content_text_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 60px;font-family:arial,helvetica,sans-serif;" align="left">
                      
                <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
                  <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px;"><span style="line-height: 25.2px; font-family: 'Montserrat', sans-serif; font-size: 18px;">Its our big pleasure you to be a part for Nakshatra22.We wish all success in your all events participating with us <br>Thank you</span></span></p>
                </div>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <table id="u_content_button_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 105px;font-family:arial,helvetica,sans-serif;" align="left">
                      
              <div align="center">
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:arial,helvetica,sans-serif;"><tr><td style="font-family:arial,helvetica,sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://unlayer.com" style="height:39px; v-text-anchor:middle; width:193px;" arcsize="77%" stroke="f" fillcolor="#14b99f"><w:anchorlock/><center style="color:#FFFFFF;font-family:arial,helvetica,sans-serif;"><![endif]-->
                  <a href="https://nakshatra22.in/" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:arial,helvetica,sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: purple; border-radius: 30px;-webkit-border-radius: 30px; -moz-border-radius: 30px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                    <span class="v-padding" style="display:block;padding:10px 20px;line-height:120%;"><strong><span style="font-size: 16px; line-height: 19.2px;">View Website</span></strong></span>
                  </a>
                <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
              </div>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
                <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                </div>
              </div>
              <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              
              
              
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                  <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                    
              <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
              <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
                
              <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
              
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
                <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                </div>
              </div>
              <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              
              
              
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                  <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                    
              <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
              <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
                <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
                
              <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                      
              <div align="center">
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:arial,helvetica,sans-serif;"><tr><td style="font-family:arial,helvetica,sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://unlayer.com" style="height:38px; v-text-anchor:middle; width:131px;" arcsize="10.5%" stroke="f" fillcolor="#14b99f"><w:anchorlock/><center style="color:#FFFFFF;font-family:arial,helvetica,sans-serif;"><![endif]-->
                  <a href="https://nakshatra22.in/myaccount" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:arial,helvetica,sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: purple; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                    <span class="v-padding" style="display:block;padding:10px 20px;line-height:120%;"><strong><span style="font-size: 14px; line-height: 16.8px; font-family: 'Montserrat', sans-serif;">⚪ Dashboard</span></strong></span>
                  </a>
                <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
              </div>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                      
              <div align="center">
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:arial,helvetica,sans-serif;"><tr><td style="font-family:arial,helvetica,sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://unlayer.com" style="height:37px; v-text-anchor:middle; width:162px;" arcsize="11%" stroke="f" fillcolor="#14b99f"><w:anchorlock/><center style="color:#FFFFFF;font-family:arial,helvetica,sans-serif;"><![endif]-->
                  <a href="https://nakshatra22.in/referandwin" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:arial,helvetica,sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: purple; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                    <span class="v-padding" style="display:block;padding:10px 20px;line-height:120%;"><strong>⚪ Refer and Win</strong></span>
                  </a>
                <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
              </div>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
                <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                </div>
              </div>
              <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
              <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
                <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
                
              <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                      
              <div align="center">
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:arial,helvetica,sans-serif;"><tr><td style="font-family:arial,helvetica,sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://unlayer.com" style="height:37px; v-text-anchor:middle; width:124px;" arcsize="11%" stroke="f" fillcolor="#14b99f"><w:anchorlock/><center style="color:#FFFFFF;font-family:arial,helvetica,sans-serif;"><![endif]-->
                  <a href="https://nakshatra22.in/contact" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:arial,helvetica,sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: purple; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                    <span class="v-padding" style="display:block;padding:10px 20px;line-height:120%;"><strong>⚪ Contact us</strong></span>
                  </a>
                <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
              </div>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                      
              <div align="center">
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:arial,helvetica,sans-serif;"><tr><td style="font-family:arial,helvetica,sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://unlayer.com" style="height:37px; v-text-anchor:middle; width:162px;" arcsize="11%" stroke="f" fillcolor="#14b99f"><w:anchorlock/><center style="color:#FFFFFF;font-family:arial,helvetica,sans-serif;"><![endif]-->
                  <a href="https://nakshatra22.in/events" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:arial,helvetica,sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: purple; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                    <span class="v-padding" style="display:block;padding:10px 20px;line-height:120%;"><strong>⚪ Events</strong></span>
                  </a>
                <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
              </div>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
                <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                </div>
              </div>
              <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              
              
              
              <div class="u-row-container" style="padding: 0px 0px 20px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                  <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px 0px 20px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                    
              <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
              <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
                
              <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
                      
                <h1 class="v-font-size" style="margin: 0px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: 'Montserrat',sans-serif; font-size: 19px;">
                  Follow Us On:
                </h1>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
                      
              <div align="center">
                <div style="display: table; max-width:209px;">
                <!--[if (mso)|(IE)]><table width="209" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:209px;"><tr><![endif]-->
                
                  
                  <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
                  <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
                    <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                      <a href="https://www.facebook.com/nakshatra.saintgits" title="Facebook" target="_blank">
                        <img src="https://ik.imagekit.io/5iaqs2tchv9/images/image-1_eGv_dqmTS.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649530526176" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                      </a>
                    </td></tr>
                  </tbody></table>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  
                  <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
                 
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  
                  <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
                 
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  
                  <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
                  <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
                    <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                      <a href="https://www.instagram.com/nakshatra.2022/" title="Instagram" target="_blank">
                        <img src="https://ik.imagekit.io/5iaqs2tchv9/images/image-1_eGv_dqmTS.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649530526176" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                      </a>
                    </td></tr>
                  </tbody></table>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  
                  <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
              
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  
                  
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                      
                <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
                  <p style="font-size: 14px; line-height: 140%;"><strong><span style="text-decoration: underline; font-size: 14px; line-height: 19.6px;"></span>Powered by</strong> Saintgits nakshatra22 website committee</p>
                </div>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
                <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                </div>
              </div>
              <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              
              
                  <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                </tbody>
                </table>
                <!--[if mso]></div><![endif]-->
                <!--[if IE]></div><![endif]-->
              </body>
              
              </html>
              `,
            }
            sgMail
              .send(msg)
              .then(() => {
                console.log('Email sent')
              })
              .catch((error) => {
                console.error(error)
              })}
        }
     
		// process it
		
	} else {
		// pass it
	}
   
	res.json({ status: 'ok' })
})
 
app.post('/razorpay', async (req,res) =>{
    console.log(req.body)
    const payment_capture =1
    const amount =req.body.amount
    const options ={
        amount: amount,
        currency: "INR",
        receipt: shortid.generate(),
        payment_capture
    }
    try{
        const response = await razorpay.orders.create(options)
        console.log(response)
        res.json({
            id:response.id,
            currency:response.currency,
            amount: response.amount
          })
    }catch(error){
console.log(error)
    }
  
})  
app.post('/webreferal', async (req,res) =>{
    const secret = "3167967";
    console.log(req.body)
 if(req.body?.secret===secret){
    const webreferral =req.body.webreferral
    const name = req.body.webname
    db.collection('appUsers').where("referID","==",webreferral).get().then((querySnapshop) =>{
        
        querySnapshop.forEach(doc => {
          if(doc.exists)
   {      db.collection("appUsers").doc(doc.data().UID).update({
    webreferCount: admin.firestore.FieldValue.increment(1),
       webreferevent: admin.firestore.FieldValue.arrayUnion(name)
   })
   db.collection("users").doc(doc.data().unique).update({
    webreferCount: admin.firestore.FieldValue.increment(1),
    webreferevent: admin.firestore.FieldValue.arrayUnion(name)
})}
        })
         })
         
	res.json({ status: 'ok' })
 }else{
    res.json({ status: 'error' })
 }
  
  
})  
app.post('/payoffline', async (req,res) =>{
  const secret = "********";
  console.log(req.body)
  if(req?.body.notes.secret===secret){
    const obj =  JSON.parse(req.body.notes?.groupmembers);
    const obj3 =  JSON.parse(req.body.notes?.groupmembers2);
    const obj2 = JSON.parse(req.body.notes?.profile);
    const id = shortid.generate()
    const payoffline = req.body;
    delete payoffline.notes.secret;
    if(obj2){
      db.collection('appUsers').where("referID","==",req.body.notes?.referal).get().then((querySnapshop) =>{
        
        querySnapshop.forEach(doc => {
          if(doc.exists)
   {      db.collection("appUsers").doc(doc.data().UID).update({
       referCount: admin.firestore.FieldValue.increment(1),
       referevent: admin.firestore.FieldValue.arrayUnion(obj2.userdetails.fullname)
   })
   db.collection("users").doc(doc.data().unique).update({
    referCount: admin.firestore.FieldValue.increment(1),
    referevent: admin.firestore.FieldValue.arrayUnion(obj2.userdetails.fullname)
  }).catch(error => {
    db.collection("users").doc(doc.data().UID).update({
      referCount: admin.firestore.FieldValue.increment(1),
      referevent: admin.firestore.FieldValue.arrayUnion(obj2.userdetails.fullname)
  })
  })
}
        })
         })
  
        db.collection('appUsers')
        .doc(req.body.notes.uid)
        .collection('payments').doc(id).set(
          {
            notes:payoffline.notes,
            amount:0,
            id:"Pay offline"
          }
        ).then(() => {
            console.log("write success")
        })
        db.collection('events').where("productId","==",req.body.notes?.productId).get().then((querySnapshop) =>{
    
            querySnapshop.forEach(doc => {
              if(doc.exists)
       {      db.collection("events").doc(doc.id).update({
           count: admin.firestore.FieldValue.increment(-1),
     
       })
  }
            })
             })
    

          const userRef5 = db.doc(`users/${obj2.nkid}`);
          const snapshot10 = await userRef5.get();
          if(snapshot10.exists){
            try {
              await userRef5.update(
                  {
                      registered: admin.firestore.FieldValue.arrayUnion(req.body.notes.productId)
                  }
              );
            } catch (error) {
              console.log('Error in creating user', error);
            }
          }else{
            const userRef11 = db.doc(`users/${req.body.notes.uid}`);
            try {
              await userRef11.update(
                  {
                      registered: admin.firestore.FieldValue.arrayUnion(req.body.notes.productId)
                  }
              );
            } catch (error) {
              console.log('Error in creating user', error);
            }
          }
        const userRef2 = db.doc(`registerededevents/${id}`);
      
        const snapshot2 = await userRef2.get();
        if(!snapshot2.exists){
          try {
            await userRef2.set(
                req.body.notes
            );
          } catch (error) {
            console.log('Error in creating user', error);
          }}
  
    }
  

    
    {obj && Object.entries(obj).map(([Id,Data]) =>{
       
        db.collection('appUsers')
        .doc(Data.toString())
        .collection('payments').doc(id).set(
           {
           notes:payoffline.notes,
           amount:0,
           id:"Pay offline"
           }
        ).then(() => {
            console.log("write success")
  
        })


      })}
       
      {obj && Object.entries(obj).map(async ([Id,Data])=>{
        const userRef2 = db.doc(`users/${Id}`);
          try {
            await userRef2.update(
                {
                    registered: admin.firestore.FieldValue.arrayUnion(req.body.notes.productId)
                }
            );
          } catch (error) {
            console.log('Error in creating user', error);
          }}



      )}


      {obj3 && Object.entries(obj3).map(([Id,Data]) =>{
        db.collection('appUsers')
        .doc(Data.toString())
        .collection('payments').doc(id).set(
          {
            notes:payoffline.notes,
            amount:0,
            id:"Pay offline"
            }
        ).then(() => {
            console.log("write success")
        
        })

      })}
      {obj3 && Object.entries(obj3).map(async ([Id,Data])=>{
        const userRef2 = db.doc(`users/${Id}`);
          try {
            await userRef2.update(
                {
                    registered: admin.firestore.FieldValue.arrayUnion(req.body.notes.productId)
                }
            );
          } catch (error) {
            console.log('Error in creating user', error);
          }}



      )}
      
  }
	res.json({ status: 'ok' })

})  
app.post('/checkuser', async (req,res) =>{
  console.log(req.body)
      try{
    

           db.collection("users").doc(req.body.unique).get().then((querySnapshop) =>{
             if(querySnapshop.exists){
              res.json({
                check: false
              })
             }else{
              db.collection('users').where('unique','==',req.body.unique).get()
              .then((querySnapshot) =>{
                res.json({
                  check:querySnapshot.empty
                })
                 })
             }
           })
      

    }catch(error){
console.log(error)
    }

})
app.get('/refercount', async (req,res) =>{
 
  db.collection("appUsers")
  .orderBy("referCount", "desc").limit(5).get().then((querySnapshop) => {
    const referals ={}
    querySnapshop.forEach(refer =>{
      referals[refer.id]={
        name:refer.data().Name,
        college: refer.data().collegename,
        count: refer.data().referCount
      }
    })
    res.json(
    referals
    )
  })

})
app.listen(1337, () => {
    console.log('listening on 1337')
}) 

exports.app =functions.region('asia-south1').https.onRequest(app)