const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create({
      title: "Berenjenas a la parmesana",
      level: "Amateur Chef",
      ingredients: [
        "berenjenas",
        "passata",
        "mozzarela",
        "albahaca",
        "parmesano",
        "aceite de oliva",
      ],
      cuisine: "Italiana",
      dishType: "main_course",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Parmigiana_di_melanzane.jpg/640px-Parmigiana_di_melanzane.jpg",
      duration: 60,
      creator: "Nonna",
    });
  })
  .then((result) => {
    console.log(result);
    return Recipe.insertMany(data);
  })
  .then((result) => {
    result.forEach((recipe) => console.log(recipe.title));
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((result) => {
    console.log(`success!, ${result.duration}`);
    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  .then((result) => {
    console.log(`${result.title} removed from db`);
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("db closed");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
