const mongoose = require('mongoose'); //import using CJS

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    regNo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
});

const studentModel = mongoose.model('Student', studentSchema);

module.exports = studentModel; //export using CJS
