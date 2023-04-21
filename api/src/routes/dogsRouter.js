const {Router}= require ("express")
const {getAllDogs} = require ("../controllers/controllers")
const { Dog, Temperament } = require("../db.js");
dogsRouter = Router()


dogsRouter.get("/", async (req, res)=> {
    try {
      const { name } = req.query;
      // Llama a la funcion GetAllDogs que trae todos los perros
      const { all_Dogs } = await getAllDogs();
  
      if (name) {
        const dogFilter = await all_Dogs.filter((dog) =>
          dog.name.toLowerCase().includes(name.toLowerCase())
        );
        dogFilter.length > 0
          ? res.status(200).send(dogFilter)
          : res.status(404).send(`Dog not found`);
      } else {
        return res.status(200).json(all_Dogs);
      }
    } catch (error) {
        res.status(404).send(`Dog not found`);
    
    }
  });

dogsRouter.get("/:id",async (req, res) => {
    const { id } = req.params;
    try {
      const idDog = await getAllDogs(); // trae todos los perros
      const filterDog = await idDog.all_Dogs.find((dog) => dog.id == id);
      if (filterDog) {
        return res.status(200).json(filterDog);
      }
      // Si no encuentra el perro envia un 404 con un texto diciendo que el perro no existe
      return res.status(404).send(`Dog doesn't exist`);
    } catch (error) {
     
    }
  });

dogsRouter.post("/", async (req, res) => {
    const {
      name,
      maxHeight,
      minHeight,
      minWeight,
      maxWeight,
      life_span,
      image,
      temperament,
    } = req.body;
    if (!name || !maxHeight || !minHeight || !minWeight || !maxWeight) {
      return res.status(400).send(`Bad Request`);
    }
   
    try {
      const newDog = await Dog.create({
        name: name,
        maxHeight: maxHeight,
        minHeight: minHeight,
        minWeight: minWeight,
        maxWeight: maxWeight,
        life_span: life_span,
        image: image,
      });
      const selectTem= await Temperament.findAll({where:{name: temperament}})

      newDog.addTemperament(selectTem);
      return res.status(201).send(newDog);
    } catch (error) {
    }
      
      // temperaments.map(async(t)=>{
       
      //  const elID=await getById(t);
      //  newDog.addTemperaments(elID);
      
      // })
    //   return res.status(201).json(newDog);
    // } catch (error) {
    //   res.status(400).json({error:error.message})
    // }
  });

module.exports= dogsRouter;

