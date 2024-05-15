import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(String(process.env.MONGO_URI))
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log("MongoDb Connected successfully")
        })
        connection.on('error',(err)=>{
            console.log('MongoDb Connection error '+err)
            process.exit()
        })
    } catch(error){
        console.log(`Something went wrong ${error}`)
    }
}