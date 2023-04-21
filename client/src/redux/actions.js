import axios from "axios";
export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENT = "GET_TEMPERAMENT";
export const GET_DETAILS = "GET_DETAILS";
export const GET_NAME_DOG = "GET_NAME_DOG";
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
export const CREATED_DOG= "CREATED_DOG";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const FILTER_BY_WEIGHT = "FILTER_BY_WEIGHT";

export const FILTER_CREATED= "FILTER_CREATED";


export function getDogs() {
  return async function (dispatch) {
    try {
      var allDogs = await axios.get(`http://localhost:3001/dogs`);
      return dispatch({
        type: GET_DOGS,
        payload: allDogs.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    try {
      var allTemperaments = await axios.get(
        `http://localhost:3001/temperaments`
      );
      return dispatch({
        type: GET_TEMPERAMENT,
        payload: allTemperaments.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function getDogById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/dogs/${id}`
      );
      return dispatch({
        type: GET_DETAILS,
        payload: response.data,
      });
    } catch {
      console.log("Try another ID");
    }
  };
}

export function getDogByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios(
        `http://localhost:3001/dogs?name=${name}`
      );
      return dispatch({
        type: GET_NAME_DOG,
        payload: response.data,
      });
    } catch (error) {
      console.error(`Dog not found, try another name`);
      alert(`Dog not found, try another name`);
    }
  };
}

// export function createDog(dog) {
//   return async function () {
//        await axios.post("http://localhost:3001/dogs",dog);
      
//   };
// }

export function createDog (reqboby) {
  return async function (dispatch) {
      let newdog = await axios.post('http://localhost:3001/dogs',
      reqboby)
      return dispatch ({
          type:CREATED_DOG,
          payload: newdog.data
      })
  }
}

export function filterByTemperaments(payload) {
  return {
    type: FILTER_BY_TEMPERAMENTS,
    payload,
  };
}

export function filterByName(payload) {
  return {
    type: FILTER_BY_NAME,
    payload,
  };
}
export function filterByWeight(payload) {
  return {
    type: FILTER_BY_WEIGHT,
    payload,
  };
}
export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

