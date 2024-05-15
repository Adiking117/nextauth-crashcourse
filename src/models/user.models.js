import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Plaese provide username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Plaese provide email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Plaese provide password"],
    },
    isVerified:{
        type:Boolean,
        default: false
    },
    isAdmin:{
        type:Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

// since its the edge time framweoork
const User = mongoose.models.users || mongoose.model("User",userSchema)

export default User