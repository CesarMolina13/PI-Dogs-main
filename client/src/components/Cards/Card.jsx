import React from "react"; 
import {Link} from "react-router-dom"
import s from "./Cards.module.css"

 export const Card = ({name, temperament, image,id, temperaments, minWeight, maxWeight})=>{
    return(

        <Link to={`/dogs/${id}`}>
        <div className={s.container}>
            <div className={s.card}>

            <img  src={image} alt="name"/>
            <div className={s.contenido}>
            <h2 >{name}</h2>
            <p >{temperaments ? temperaments : temperament}</p>
            <h5 >Weight: {minWeight} - {maxWeight} Kg</h5>
            </div>
            </div>
        </div>
        </Link>
        
    )
}

// export default Card;