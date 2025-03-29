import { ApiError } from "../utils/ApiError.mjs";
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.mjs';
import { asyncHandler } from "../utils/asyncHandler.mjs";

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // Retrieve token from cookies or Authorization header
       const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        console.log("Token :: ", token);  // Log the token for debugging

        if (!token) {
            throw new ApiError(401, "Unauthorized token");
        }

        if (!token || token.split('.').length !== 3) {
            throw new ApiError(401, "Invalid token format");
        }
        

        // Verify token
        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Check if user exists based on the decoded token's _id
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        // Attach user to request object for use in later middleware
        req.user = user;
        next();

    } catch (error) {
        console.error("JWT Verification Error:", error);
    
        // Check if the error is a token expiration error
        if (error.name === "TokenExpiredError") {
            throw new ApiError(401, "Access token has expired");
        }
    
        // For any other error, treat it as invalid token
        throw new ApiError(401, "Invalid access token");
    }
});

export default verifyJWT;
