const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim:true,
            required: [true, "name is required"],
            minLength: [3, "name must be minimum 3 characters"],
            maxLength: [31, "name must be maximum 31 characters"],
        },
        lastName: {
            type: String,
            trim:true,
            required: [true, "name is required"],
            minLength: [3, "name must be minimum 3 characters"],
            maxLength: [31, "name must be maximum 31 characters"],
        },
         phonenumber: {
            type: String,
            required: [true, "phonenumber is required"],
            unique: true,
        },
          password: {
            type: String,
            required: [true, "password is required"],
            minlength: [6, "password must be minimum 6 characters"],
            maxlength: [12, "password must be maximum 12 characters"],
        },
  
        role:{
            type:String,
            enum:["admin","manager","employee"],
             required: [true, "role is required"],
        },
      
    },
    { timestamps: true, versionKey:false}
)


const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;