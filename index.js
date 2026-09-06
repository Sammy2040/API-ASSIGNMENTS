const express = require("express");
const mongoose = require('mongoose');
const studentRoute = require("./routes/studentRoutes.js");

const compass_string = "mongodb://localhost:27017/cohort8_db";
const atlas_string = "mongodb+srv://erisuena081_db_user:Tega2040@cluster0.ckheo2p.mongodb.net/cohort8_db?appName=Cluster0";

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
app.listen(port, () => {
    console.log(`server is up and running on port :${port}`);
});