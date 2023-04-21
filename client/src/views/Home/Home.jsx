import React, { useState } from "react"; 
import { useEffect } from "react";
import {useDispatch,useSelector} from "react-redux";
import Paginado from "../../components/Paginado/Paginado"
import { getDogs,
    getTemperaments,
    filterByTemperaments,
    filterByName,
    filterByWeight,
    filterCreated,
   } from "../../redux/actions.js";
import {Card} from "../../components/Cards/Card"
import {SearchBar} from "../../components/SearchBar/SearchBar"
import s from "./Home.module.css"




const Home = ()=>{

    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogs);
    const [currentPage,setCurrentPage]= useState(1)
    const dogsPerPage = 8
    const indexOfLastDogs= currentPage * dogsPerPage
    const indexOfFirstDogs=indexOfLastDogs-dogsPerPage
    const currentDogs=allDogs.slice(indexOfFirstDogs,indexOfLastDogs)

    const paginado=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getDogs());
        dispatch(getTemperaments());
    dispatch(filterByTemperaments());
    },[dispatch])

    const temperaments = useSelector((state) => state.temperaments);
  const [temperament, setTemperamets] = useState("all");

  const handleSelectTemperament = (e) => {
    e.preventDefault();
    dispatch(filterByTemperaments(e.target.value));
    setTemperamets(e.target.value);
    setCurrentPage(1);
  };


    function handlerClick(e){
        e.preventDefault();
        dispatch(getDogs());
        setFilterName("az");
        setFilterWeight("normal");
        setFilterBreed("all");
        setTemperamets("all");
        setCurrentPage(1);
    }

    const [filterWeight, setFilterWeight] = useState("");
  const handleSortWeight = (e) => {
    e.preventDefault();
    if (e.target.value === "normal") {
      dispatch(getDogs());
    }
    dispatch(filterByWeight(e.target.value));
    setFilterWeight(e.target.value);
    setCurrentPage(1);
    setFilterName("");
  };

    const [filterName, setFilterName] = useState("");
  const handleSortName = (e) => {
    e.preventDefault();
    dispatch(filterByName(e.target.value));
    setFilterName(e.target.value);
    setCurrentPage(1);
    setFilterWeight("");
  };

    const [filterBreed, setFilterBreed] = useState("");
    const handleSortBreed = (e) => {
      e.preventDefault();
      dispatch(filterCreated(e.target.value));
      setFilterBreed(e.target.value);
      setCurrentPage(1);
    };

    return(
        <div className={s.container}> 
        
        <div >
          <SearchBar  />
        </div>

        <div >
            <span> Filter by temperament </span>
            <select
              value={temperament}
              onChange={(e) => handleSelectTemperament(e)}
            >
              <option value="all"> All </option>
              {temperaments.map((temp, index) => (
                <option onClick={(e) => handlerClick(e)} key={index}>
                  {temp.name}
                </option>
              ))}
            </select>
            <br />
            <span> Sort by weight </span>
            <select value={filterWeight} onChange={(e) => handleSortWeight(e)}>
              <option value="normal"> ----- </option>
              <option value="asc"> Lightest </option>
              <option value="desc"> Heaviest</option>
            </select>
            <br />
            <span>Sort by origin </span>
            <select value={filterBreed} onChange={(e) => handleSortBreed(e)}>
              <option value="all"> All </option>
              <option value="api"> Api </option>
              <option value="created"> Created </option>
            </select>
            <br />
            <span> Sort by name </span>
            <select value={filterName} onChange={(e) => handleSortName(e)}>
              <option value="az"> A - Z </option>
              <option value="za"> Z - A</option>
            </select>
            <br />
           
          </div>
           
            <Paginado 
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginado={paginado} 
             />

            <div>
                {currentDogs?.map(el=>{
                    return<Card 
                    key={el.id}
                    id={el.id}
                    name={el.name}
                    image={el.image}
                    temperament={el.temperament}
                    temperaments={el.temperaments
                      ?.map((t) => t.name)
                      .join(", ")}
                    maxWeight={el.maxWeight}
                    minWeight={el.minWeight} 
                    />
                })}
            </div>
        </div>
    )
}

export default Home;