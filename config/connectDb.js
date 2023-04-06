import mongoose from 'mongoose';

const dbconnect = async () =>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017", { dbName: "auth-demo-db" })
        console.log("db connected :)");
    }catch(error){
        console.log("error while connected db",error);
    }
}

export default dbconnect;