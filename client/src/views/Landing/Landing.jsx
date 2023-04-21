import Landingvideo from "../../img/Landingvideo.mp4"
import React from "react"; 
import {Link} from "react-router-dom"
import s from "./Landing.module.css"
const Landing = ()=>{
    return(
        <div className={s.container}>
            <h1 >Welcome to app Dogs</h1>
            <Link  to="/home"><button>Let's go</button></Link>
            
                <video src={Landingvideo} autoPlay loop muted/>
            

         </div>
    )
}

export default Landing;