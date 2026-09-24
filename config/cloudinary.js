const cloudinary = require('cloudinary').v2; //cjs
//import{v2 as cloudinary} from 'cloudinary'; //ejs

cloudinary.config({
    cloud_name: "f9z6d8w0",
    api_key: "823687888916579",
    api_secret: "s0nGmiobCxDzH_xRiohu6WaZaEM"
});

module.exports = cloudinary;