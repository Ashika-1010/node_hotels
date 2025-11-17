// const notes = require('./notes');
// var _ = require('lodash');

// console.log('server file is running');

// console.log(notes.age);

// let arr = ['ashika','ritesh',1,4,2,1,2,3,4,'ashika','shetty'];
// let unique = _.uniq(arr);
// console.log(unique);




const express = require("express");
const db = require("./db");
const Person = require("./models/Person");
const MenuItem = require("./models/MenuItem");
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');
require('dotenv').config();


const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to Shetty's hotel");
});


app.use('/person',personRoutes);
app.use('/menu-item',menuRoutes);


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});
