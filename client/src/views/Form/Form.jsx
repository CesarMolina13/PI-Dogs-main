import React from "react"; 
import {useState,useEffect} from "react";
import { getTemperaments, createDog } from "../../redux/actions";
import { useDispatch,useSelector } from "react-redux";
import s from "./Form.module.css"

const onlyNumber= /^\d+$/;
const isUrl= /^https?:.+.(jpg|jpeg|png|webp|avif|gif|svg)$/;
const inputEmpty= /^\s+$/;

const Form = ()=>{

    const dispatch = useDispatch()
    const temperament = useSelector((state)=>state.temperaments);

    useEffect(()=>{
        dispatch(getTemperaments());
    },[dispatch])

    const [input,setInput]= useState({

        name:"",
        life_span:"",
        temperament:[],
        minWeight:"",
        maxWeight:"",
        minHeight: "",
        maxHeight: "",
        image:"",
        
        
    });
    console.log(input)
    const [error,setError]= useState({
        name:"",
        life_span:"",
        temperament:[],
        minWeight:"",
        maxWeight:"",
        minHeight: "",
        maxHeight: "",
        image:"",  
    });

    function validate ({name,life_span,minWeight,maxWeight,minHeight,maxHeight,image}){
        let errors={}
        // validate name
        if(!name){
            errors.name = "enter a name"
        }  else if(inputEmpty.test(name)){ 
            errors.name= "the input is empty"
        }
        // validate Number
        if(!life_span){
            errors.life_span= "enter a life span"
        }else if(inputEmpty.test(life_span)){
            errors.life_span="the input is empty"
        }else if(!onlyNumber.test(life_span)){
            errors.life_span="you must enter a number"
        }


         if(!minWeight){
            errors.minWeight= "enter a minWeight"
        }
         else if(inputEmpty.test(minWeight)){
            errors.minWeight="the input is empty"
        }else if(!onlyNumber.test(minWeight)){
            errors.minWeight="you must enter a number"
        }


        if(!maxWeight){
            errors.maxWeight= "enter a maxWeight"
        }
         else if(inputEmpty.test(maxWeight)){
            errors.maxWeight="the input is empty"
        }else if(!onlyNumber.test(maxWeight)){
            errors.maxWeight="you must enter a number"
        }


        if(!minHeight){
            errors.minHeight= "enter a minHeight"
        }
         else if(inputEmpty.test(minHeight)){
            errors.minHeight="the input is empty"
        }else if(!onlyNumber.test(minHeight)){
            errors.minHeight="you must enter a number"
        }


        if(!maxHeight){
            errors.maxHeight= "enter a maxHeight"
        }
         else if(inputEmpty.test(maxHeight)){
            errors.maxHeight="the input is empty"
        }else if(!onlyNumber.test(maxHeight)){
            errors.maxHeight="you must enter a number"
        }


        if(!image){
            errors.image= "enter a Url"
        }
         else if(inputEmpty.test(image)){
            errors.image="the input is empty"
        }else if(!isUrl.test(image)){
            errors.image="you must enter a Url"
        }
        
        return errors;


    }

    function handleSelect(e) {
        if (input.temperament.find((t) => t.id === e.target.value.split(",")[0])) {
          console.log({ input });
          alert("Already in the list");
        } else {
          setInput({
            ...input,
            temperament: [
              ...input.temperament,
              e.target.value
              // {
              //   id: e.target.value.split(",")[0],
              //   name: e.target.value.split(",")[1],
              // },
            ],
          });
        }
      }

    // function handlerpush(){
    //     let temperam= [];
    //        input.temperament=temperam
    // }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
          })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value,
          }))
        }
    
    function handleSubmit(e){
        // handlerpush()
        e.preventDefault()
        dispatch(createDog(input))
        console.log(input)
        alert("you have created a dog")
        setInput({
        name:"",
        life_span:"",
        temperament:[],
        minWeight:"",
        maxWeight:"",
        minHeight: "",
        maxHeight: "",
        image:"",
             })}

        
    return(
        <div>
            <h1>CREATE A DOG</h1>
        <div className={s.container}>
           
            <form onSubmit={handleSubmit}>
                <div>
                    
                   <div> <label>Name:</label>
                     <input type="text" placeholder="Name" value={input.name} name="name" onChange={handleChange}/> {error.name?<p>{error.name}</p>:null}
                 </div>
                </div>
                <div>
                    <label>Life span:</label>
                    <input
                    type="text"
                   
                    placeholder="life_span"
                    value={input.life_span}
                    name="life_span"
                    onChange={handleChange}
                    />{error.life_span?<p>{error.life_span}</p>:null}
                </div>
                <div>
                    <label> MinHeight:</label>
                    <input
                    type="text"
                    
                    placeholder="MinHeight"
                    value={input.minHeight}
                    name="minHeight"
                    onChange={handleChange}
                    />{error.minHeight?<p>{error.minHeight}</p>:null}
                </div>
                <div>
                    <label> MaxHeight:</label>
                    <input
                    type="text"
                    
                    placeholder="MaxHeight"
                    value={input.maxHeight}
                    name="maxHeight"
                    onChange={handleChange}
                    /> {error.maxHeight?<p>{error.maxHeight}</p>:null}
                </div>
                <div>
                    <label> MinWeight:</label>
                    <input
                    type="text"
                   
                    placeholder="MinWeight"
                    value={input.minWeight}
                    name="minWeight"
                    onChange={handleChange}
                    /> {error.minWeight?<p>{error.minWeight}</p>:null}
                </div>
                <div>
                    <label> MaxWeight:</label>
                    <input
                    type="text"
                   
                    placeholder="MaxWeight"
                    value={input.maxWeight}
                    name="maxWeight"
                    onChange={handleChange}
                    /> {error.maxWeight?<p>{error.maxWeight}</p>:null}
                </div>
                <div>
                    <label> Image:</label>
                    <input
                    type="text"
                    placeholder="Url of image"
                    value={input.image}
                    name="image"
                    onChange={handleChange}
                    /> {error.image?<p>{error.image}</p>:null}
                </div>
                <div>
            
          </div>
                <div>
                    <label>Temperament</label>
                    
                    <select onChange={(e) => handleSelect(e)}>
              {temperament?.map((el, i) => (
                <option value={el.name} key={i}>
                  {el.name}
                </option>
              ))}
            </select>
  
                </div>

                <input className={s.submit} type="submit" value="Create Dog"
                disabled={Object.entries(error).length===0? false:true}
                />
                
            </form>
        </div>
        </div>
    )
}

export default Form; 



