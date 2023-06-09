const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db.js");

const infoApi = async () => {
  // Uso axios para traer la informacion de la api para luego usarla en el front
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  // Mapeo todos los Dogs y devuelvo el array
  let dogsApi = await apiUrl.data.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      life_span: dog.life_span,
      temperament: dog.temperament,
      minWeight: dog.weight.metric.slice(0, 2).replace(" ", ""),
      maxWeight: dog.weight.metric.slice(4).replace(" ", ""),
      minHeight: dog.height.metric.slice(0, 2).replace(" ", ""),
      maxHeight: dog.height.metric.slice(4).replace(" ", ""),
      image: dog.image.url,
    };
  });
  const dogDb = await Dog.findAll({
    include: [
      {
        model: Temperament,
        attributes: ["name"],
        through: {    //a traves
          attributes: [],
        },
      },
    ],
  });
  dogsApi = [...dogsApi].concat(dogDb);
  return dogsApi;
};

const infoTemperament_DB = async () => {
  try {
    let temperamentApi = new Set();
    const consultaApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    consultaApi.data.forEach((temp) => {
      let resultTempArray = temp.temperament
        ? temp.temperament.split(", ") 
        : [];
      resultTempArray.forEach((temp) => temperamentApi.add(temp));
    });
    const temperamentApiResult = Array.from(temperamentApi);
    temperamentApiResult.forEach(async (e) => {
      await Temperament.findOrCreate({ where: { name: e } }); //donde
    });
    const temperamentDb = await Temperament.findAll();
    return temperamentDb;
  } catch (error) {
    console.log(error);
  }
};

// Con esta funcion devuelvo un objeto con todos los dogs de la api y de la base de datos.
const getAllDogs = async () => {
  try {
    const allDogs = await infoApi();
    const temperamentDb = await infoTemperament_DB();
    return {
      all_Dogs: allDogs,
      DB_Temperament: temperamentDb,
    };
  } catch (error) {
    console.error(error);
  }
};

// const getById= async(nameTem)=>{
  
// const dbInfo = await Temperament.findAll({where: {name: nameTem}})
    
//     const infoID= dbInfo.dataValues.id;
    
//     return infoID;  

// }


module.exports = { getAllDogs, infoTemperament_DB};


