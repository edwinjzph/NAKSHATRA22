import React from 'react'
import "./footer.css"
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
import Faq from "react-faq-component";

function Footer() {
  const data = {
    title: "FAQ",
    rows: [
        {
            title: "Is there any chance of getting Activity point for participating in an event?",
            content: `Activity Points is given according to regulations and norms under KTU, However the points varies depending upon the type of event (Technical / Non-technical )which the candidate is participating.`,
        },
        {
            title: "Is there any Accomodation Facility available for the participants to attend Nakashtra 22?",
            content:
                <p>Those who wish to avail Accomodation Facility should contact the Accomodation Head and Inform ASAP and Should Confirm whether you have been arranged a facility or not 3 days prior to the event.<br></br>Accomodation Head<br></br>Asher Daniel Mathew<br></br>+91 96564 31038</p>,
        },
        {
            title: "Does everyone who registered for an event will get a  Certificate for Participation ?",
            content: `No,  Certificate for Participation is only given for those who attend the event on the scheduled day. Those who fail to show on the event  day are not eligible for the certification.`,
        },
        {
            title: "Is there any Transportation Facility available for the participants to attend Nakashtra 22?",
            content: <p>Transportation Facility could be arranged for participants. However those who wish to avail transportation Facility should contact the Transportation Head and Inform ASAP and Should Confirm whether you have been arranged a facility or not 3 days prior to the event.
                <br></br>
            Transportation Head :
            <br></br>
            Vijay R
            <br></br>
            +91 94950 72481</p>,
        },
    ],
};

const styles = {
     bgColor: 'black',
    titleTextColor: "white",
   
    rowTitleTextSize: '17px',
    rowContentTextSize: '14px',
 arrowColor: "white",
    rowContentPaddingLeft: "30px",
    rowContentColor:"white",
    rowTitleColor: "white",
    // rowContentColor: 'grey',
  
};

const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
};

  return (
    <div
    className='footer1'>

    <motion.div
    className='faq'
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: .8 }}
    >
    
    
     
              <Faq
                data={data}
                styles={styles}
                config={config}
            />
               <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62959.764160801366!2d76.51634047910156!3d9.510009600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062ed484f475a7%3A0xea66b5d0e55062ca!2sSaintgits%20College%20of%20Engineering%20(Autonomous)%2C%20Kottayam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1647975066242!5m2!1sen!2sin"
              width="90%"
              height="300px"
              opacity=".8"
              title='map'
              frameBorder="0"
              style={{ margin:"auto", border:"2px solid #f2039a",padding:"10px",borderRadius:"10px" }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            />
    </motion.div>

    <footer className="footer" >
      <div>
        <p>Saintgits College of Engineering</p>
        <p>Kottukulam Hills, Pathamuttam P. O, Kerala 686532</p>
      </div>
      <ul className="list">
          
          <li>
              <Link to="/aboutus"  className="anc">About us</Link>
          </li>
          <li>
              <Link to="/refund" className="anc">Refund policy</Link>
          </li>
      
          <li>
              <Link to="/privacypolicy" className="anc"> Privacy policy</Link>
          </li>
          <li>
              <Link to="/terms"  className="anc">Terms of service</Link>
          </li>
          <li>
              <Link to="/contact" className="anc">Contact us</Link>
          </li>
      </ul>
        <div className="social">
            <a href="https://instagram.com/nakshatra.2022?igshid=YmMyMTA2M2Y="><i className="fab fa-instagram"></i> </a>
            <a href="https://www.youtube.com/c/SaintgitsGroupofInstitutions"><i className="fab fa-youtube"></i> </a>
        </div>
       <p>
      <p>Powered by</p> <Link to="/developers" className="anc2">NK22 Website committee</Link>
       </p>
   
    </footer>

   

    </div>
    

  )
}

export default Footer