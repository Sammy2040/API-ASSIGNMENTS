const express = require("express");

const studentRoute = express.Router();

const {
    createStudent,
    deleteStudent,
    getAllStudents,
    getSingleStudent,
    updateStudent
} = require("../controller/studentController.js");


studentRoute.post("/new-student", createStudent);
studentRoute.get("/all-students", getAllStudents);
studentRoute.get("/get-one-student/:id", getSingleStudent);
studentRoute.delete("/delete-student/:studentId", deleteStudent);
studentRoute.patch("/update-student/:id", updateStudent);
studentRoute.get("/login", loginStudent);


module.exports = studentRoute;
