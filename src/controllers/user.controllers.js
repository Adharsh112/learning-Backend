import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


    // get user details from frontend
    // validation
    // check if user already exsists with username and email
    // check for images , check for avatar
    // upload them to cloudinary, avatar 
    // create user object - crate entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response if created other wise return error
    
    
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body;

    // Check for missing or empty fields
    if ([fullName, email, username, password].some(field => !(field && field.trim()))) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists with the given username or email
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    // Get paths for uploaded avatar and coverImage
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    // Check if avatar path exists
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // Upload avatar and coverImage to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

    // Check if avatar upload was successful
    if (!avatar) {
        throw new ApiError(400, "Avatar file upload failed");
    }

    // Create a new user in the database
    const newUser = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "", // If coverImage is not uploaded, set it to an empty string
        email,
        password,
        username: username.toLowerCase()
    });

    // Fetch the created user details (excluding sensitive fields)
    const createdUser = await User.findById(newUser._id).select("-password -refreshToken");

    // Check if user creation was successful
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // Respond with a success message and the created user details
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
});

export default registerUser;

