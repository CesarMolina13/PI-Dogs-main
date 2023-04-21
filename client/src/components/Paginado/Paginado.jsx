import React from "react";
import s from "./Paginado.module.css";

export default function Paginado({dogsPerPage,allDogs,paginado}){
    const pageNumbers =[]

for(let i=1; i<=Math.ceil(allDogs/dogsPerPage);i++){
    pageNumbers.push(i)
}

return(
    <nav>
        
        <div className={s.conteiner}>
            {pageNumbers &&
            pageNumbers.map(number=>(
                <button  onClick={()=>paginado(number)} className="number" key={number}>
                {number}
                </button>
                ))}
        </div>
    </nav>
)
}