// require('dotenv').config({path: './env'})
import dotenv from 'dotenv'

import connectDB from './db/index.js';

dotenv.config({
    path: './env'
})


connectDB(); 






















/* this is an alternative method for connecting to the database in this approach 
   we use IIFE for connecting the mongoose database to the backend
(async ()=>{
    try{
       await mongoose.connect(`${process.env.MONGODB_URI}/{DB_NAME}`)
        app.on("error",()=>{
            console.log("error",error);
            throw error;
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    }
    catch(error){
        console.log(error);
        throw error;
    }
})();

*/