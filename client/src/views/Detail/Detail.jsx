import React from "react"; 
import { useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getDogById} from "../../redux/actions";
import { useEffect,useState } from "react";
import s from "./Detail.module.css"

export default function Detail(props){
    const dispatch = useDispatch();
    const { id } = useParams();
    const [dog, setDog] = useState({});
  
    useEffect(() => {
      dispatch(getDogById(id)).then((res) => {
        setDog(res.payload);
      });
    }, [dispatch, id]);

    return (
        
        <div className={s.container}>
            <div>
            <img  src={dog.image} alt={dog.name}  />
            </div>
            <h1>{dog.name}</h1>
                <div> 

                    <h3>Weight</h3>
                    <p>{dog.minWeight}- {dog.maxWeight} Kg</p>

                    <h3>Height</h3>
                    <p>{dog.minHeight}- {dog.maxHeight} Cm</p>

                    <h3>Temperaments</h3>
                    <p>
                    {Array.isArray(dog.temperaments)
                  ? dog.temperaments.map((e) => e.name).join(", ")
                  : dog.temperament}
                    </p>

                    {/* <p>{dog.temperament}</p> */}

                    <h3>Life span</h3>
                    <p>{dog.life_span}</p>
                </div>
            
        </div>
    )
} 