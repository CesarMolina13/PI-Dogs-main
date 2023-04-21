import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getDogByName} from "../../redux/actions"
import s from "./SearchBar.module.css"

export function SearchBar (){
const dispatch =useDispatch()
const [name,setName] =useState("")

function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
}

function handleSumit(e){
    e.preventDefault()
    dispatch(getDogByName(name))
}

return (
    <div className={s.container}>
        <input
        type ="text"
        placeholder="Search..."
        onChange={(e)=>handleInputChange(e)}
        />
        <button type="submit" onClick={(e)=>handleSumit(e)}>Search</button>
    </div>
)

}