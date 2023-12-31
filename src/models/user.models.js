import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String, // cloudinary URL
        required: true,
    },
    coverImage: {
        type: String, // cloudinary URL
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video',
        },
    ],
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    refreshTokens: {
        type: String,
    },
}, { timestamps: true });

// Use a function to hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (error) {
        return next(error);
    }
});

// Method to check if the password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Method to generate an access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

// Method to generate a refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const User = mongoose.model('User', userSchema);



// import mongoose from 'mongoose'

// import { Jwt } from 'jsonwebtoken';

// import bcrypt from 'bcrypt'



// const userSchmea = new mongoose.Schema(
//     {
//         username : {
//             type : String,
//             required : true,
//             unique : true,
//             lowercase : true,
//             trim : true,
//             index : true,
//         },
//         email : {
//             type : String,
//             required : true,
//             lowercase : true,
//             trim : true,
//             unique : true
//         },
//         fullName : {
//             type : String,
//             required : true,
//             trim : true,
//             index : true
//         },
//         avatar : {
//             type : String, // cloudnary url
//             required : true
//         },
//         coverImage : {
//             type : String // cloudnary url
//         },
//         watchHistory : [
//             {
//                 type : Schema.Types.ObjectId,
//                 ref : "Video"
//             }
//         ],
//         password :{
//         type : String,
//         required : [true,'Password is required']
//         },
//         refreshTokens : {
//             type : String,
//         }
        
// },{timestamps : true})

// // in mongoose hooks never use arrow function as a call back since,
// // arrow function does not have this keyword
// userSchmea.pre("save",async function(next){ 
//     if(!this.isModified("password")) return next()
    
//     this.password = bcrypt.hash(this.password,10);
//     next()
// })

// userSchmea.methods.isPasswordCorrect = async function (password){
//     return await bcrypt.compare(password,this.password)
// }

// userSchmea.methods.generatAcessToken = function(){
//    return jwt.sign(
//     {
//         _id: this._id,
//         email: this.email,
//         username: this.username,
//         fullName: this.fullname
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//         expiresIn : process.env.ACCESS_TOKEN_EXPIRY
//     }
//    )
// }
// userSchmea.methods.generateRefreshToken = functoin () {
//     return jwt.sign(
//         {
//             _id: this._id
//         },
//         process.env.REFRESH_TOKEN_SECRET,
//         {
//             expiresIn : process.env.REFRESH_TOKEN_EXPIRY,
//         }
//        )
// }
// export const User = mongoose.model('User',userSchmea);