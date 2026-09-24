const studentModel = require("../model/studentModel.js");
const bcrypt = require("bcrypt");

/**
- CRUD
- CREATE STUDENT (POST)
- READ STUDENT (GET) : GENERAL GET , SINGLE GET
- UPDATE STUDENT
- DELETE STUDENT
*/

//CREATE STUDENT
const createStudent = async (req, res) => {
    try {
        const { name, regNo, email, password } = req.body;
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, genSalt);
        const student = await studentModel.create({
            name,
            regNo,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Student created successfully",
            data: student
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await studentModel.findOne({ email });
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
        return res.status(200).json({
            message: "Student logged in successfully",
            data: student
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

//GENERAL GET
const getAllStudents = async (req, res) => {
    try {
        const getAll = await studentModel.find();

        return res.status(200).json({
            message: "All students fetched successfully",
            data: getAll
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

//SINGLE GET
const getSingleStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const getSingleStudent = await studentModel.findById(id);

        if (!getSingleStudent) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        return res.status(200).json({
            message: "Student fetched successfully",
            data: getSingleStudent
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

//UPDATE STUDENT
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const update = await studentModel.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );

        if (!update) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        return res.status(200).json({
            message: "Student updated successfully",
            data: update
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

//DELETE STUDENT
const deleteStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        const deleteStudent = await studentModel.findByIdAndDelete(studentId);

        if (!deleteStudent) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        return res.status(200).json({
            message: "Student deleted successfully",
            data: deleteStudent
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    loginStudent,
    createStudent,
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent
};
