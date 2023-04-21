
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {getAllDogs} =require ('./src/controllers/controllers')

// Syncing all the models at once.
conn.sync({ force:true}).then(() => {
  getAllDogs();
  server.listen(3001, () => {
   
    // infoTemperament_DB()
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});

