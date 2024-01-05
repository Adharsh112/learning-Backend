import { asyncHandler } from "../utils/async-handler.js";

const registerUser = asyncHandler(async(req,res)=>{
    // get user details from frontend
    // validation
    // check if user already exsists with username and email
    // check for images , check for avatar
    // upload them to cloudinary, avatar 
    // create user object - crate entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response if created other wise return error
    
    
    const { fullName , email,username, password}= req.body()
    console.log("email : ",email)
})


export {registerUser}