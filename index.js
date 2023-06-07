const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()

  })
  .then((response) => {
    // Run your code here, after you have insured that the connection was made
    
    return Recipe.create({
         title: "Rissoto a la Jose Luis",
         cuisine: "Italiana"

    })

  })
  
   .then((response) => {
    return Recipe.insertMany(data)
   })

   .then((response) => {
    return Recipe.find()
    .select({title:1})
  })

  

  .then((response) => {
      console.log(response)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
