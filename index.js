//import "dotenv/config"; mjs
require("dotenv").config();   //cjs

const express = require("express");
const mongoose = require('mongoose');
const studentRoute = require("./routes/studentRoutes.js");
const productRoute = require("./routes/productRoutes.js");
const compass_string = process.env.COMPASS_STRING;
const atlas_string = process.env.ATLAS_STRING;

mongoose.connect(compass_string)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("Connection Error: ", err));


const app = express();
const port = 1212;


app.use(express.json());

app.get("/", (req, res) => {
    res.send("server is active");
});
app.use("/students", studentRoute);
app.use("/products", productRoute);
app.listen(port, () => {
    console.log(`server is up and running on port :${port}`);
});