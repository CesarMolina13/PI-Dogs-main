const {Router}= require ("express");
const {getAllDogs} =require ("../controllers/controllers")

temperamentsRouter= Router()

temperamentsRouter.get("/",async (req, res) => {
    try {
      const temperamentDB = await getAllDogs();
      res.json(temperamentDB.DB_Temperament);
    } catch (error) {
      console.error(error);
      
    }
  });

module.exports = temperamentsRouter;