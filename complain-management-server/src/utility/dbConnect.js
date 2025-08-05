const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose")

const dbConnect = async () => {
    try{
        mongoose.set('strictQuery', false);
        let uri = process.env.MONGO_URI;
        //let option = {user:process.env.MONGO_USER, pass:process.env.MONGO_PASS,autoIndex:true};

        await mongoose.connect(uri);
        console.log("Database connection success")
    }
    catch(error){
        console.log("Connection Failed");
        console.log(error);
    }
}


module.exports = dbConnect