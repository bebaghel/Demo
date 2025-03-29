import { asyncHandler } from '../utils/asyncHandler.mjs';

import { ApiError } from '../utils/ApiError.mjs';
import { User } from '../models/user.model.mjs';
import { uploadCloudinary } from '../utils/cloudinary.mjs';
import { ApiResponse } from '../utils/ApiResponse.mjs';

// const generateAccessAndRefereshTokens = async (userId) => {
//     try {
//         const user = await User.findById(userId)
//         const accessToken = user.generateAccessToken()
//         const refreshToken = user.generateRefreshToken()

//         user.refreshToken = refreshToken
//         await user.save({ validateBeforeSave: false }) // save directly without validation
//         return { accessToken, refreshToken }

//     } catch (error) {
//         throw new ApiError(500, "Something went wrong")
//     }
// }
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };

    } catch (error) {
        console.error("Error generating tokens:", error);  // Log the error for debugging
        throw new ApiError(500, error.message || "Something went wrong");
    }
}

const ping = (req, res) => {
    res.json({ status: true, message: "This is alpha application" })
}

export { ping };


const registerUser = asyncHandler(async (req, res) => {
    // Destructure user details from request body
    const { fullname, username, email, password } = req.body;
    // console.log("Request body:", req.body);

    // if(!email) {
    //     throw new ApiError(400, "Email is requied")
    // }

    // Validate required fields are not empty
    // if ([fullname, username, email, password].some((field) => field?.trim() === "")) {
    //     throw new ApiError(400, "All fields are required");
    // }
    // using Map method for validation
    // if ([fullname, username, email, password].map(field => field?.trim() === "").includes(true)) {
    //     throw new ApiError(400, "All fields are required");
    // }

    // if ([fullname, username, email, password].map(field => (field == null || field.trim() === "")).includes(true)) {
    //     throw new ApiError(400, "All fields are required");
    // }


    if ([fullname || "", username || "", email || "", password || ""].map(field => field.trim() === "").includes(true)) {
        throw new ApiError(400, "All fields are required");
    }

    // Email format validation
    if (!email || !email.includes("@")) {
        throw new ApiError(400, "Invalid email format");
    }

    // Optionally, use regex for stricter email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Invalid emailRegex format");
    }

    // Check if user already exists by username or email
    const existUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existUser) {
        throw new ApiError(409, "User already exists");
    }

    // Ensure avatar file is present in the request
    // const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const avatarLocalPath = req.files?.avatar[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }
    // console.log("Avatar File:", avatarLocalPath);

    console.log("Request File :: ", req.files);

    //    const coverImageLocalPath = req.files?.coverImage[0]?.path; // when we not checked or not send the coverImage file show the error below the solution

    // Initialize coverImageLocalPath and check if the coverImage exists in request files
    let coverImageLocalPath;
    // classic if else condition for check
    if (req.files && req.files.coverImage && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path; // here no need optional chaining for check
        // console.log("Cover Image File:", coverImageLocalPath);
        // here now if not get coverImage cloudinary return empty string not return any error
    }
    // console.log("Request File :: ", req.files)

    // Upload avatar and coverImage to Cloudinary
    const avatar = await uploadCloudinary(avatarLocalPath);
    // Check if avatar upload was successful
    if (!avatar) {
        throw new ApiError(400, "Avatar file upload failed in Cloudinary");
    }
    let coverImage = null;
    if (coverImageLocalPath) {
        coverImage = await uploadCloudinary(coverImageLocalPath);
    }

    // If cover image exists, check if upload was successful
    if (coverImageLocalPath && !coverImage) {
        throw new ApiError(400, "Cover image file upload failed in Cloudinary");
    }

    // Create a new user in the database
    const userdata = await User.create({
        fullname,
        avatar: avatar.url,
        // coverImage: coverImage ? coverImage.url : null, // Handle null case if coverImage was not uploaded
        coverImage: coverImage?.url || "", // Handle null case if coverImage was not uploaded
        email,
        password,
        username: username.toLowerCase(),
    });
    console.log("user Data :: ", userdata)

    //or
    // Remove password field before logging
    // const {password, ...userWithoutPassword } = userdata.toObject();
    // console.log("User Data (without password):", userWithoutPassword);
    // or
    // Exclude password from the logged data
    // const userWithoutPassword = userdata.toObject();
    // delete userWithoutPassword.password;
    // console.log("User Data (without password):", userWithoutPassword);

    // Fetch the created user and remove sensitive information
    const createdUser = await User.findById(userdata._id).select("-password -refreshToken");
    console.log("Created User :: ", createdUser);

    // Check if user was created successfully
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // Return success response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    );
});

// const registerUser = asyncHandler(async (req, res) => {
//     res.status(200).json({ msg: "All Ok" })
// })

// module.exports = { registerUser }
// user.controller.cjs (CommonJS file)
// module.exports.registerUser = registerUser;

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if (!(username || email)) {
        throw new ApiError(400, "Username or email is required");
    }

    const user = await User.findOne({
        $or: [{ username: username?.toLowerCase() }, { email: email?.toLowerCase() }]
    });

    if (!user) {
        throw new ApiError(400, "User does not exist");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid user password credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    };

    //     return res.status(200)
    //         .cookie('accessToken', accessToken, options)
    //         .cookie('refreshToken', refreshToken, options)
    //         .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"));
    // });
    return res.status(200)
        .cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // Only secure in production
            sameSite: 'strict',  // Optional: restricts cookie sending for cross-origin requests
        })
        .cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        })
        .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"));

    })
    const loginUserddd = asyncHandler(async (req, res) => {
        // req body => data
        // username or email
        //find the user
        //password check
        //access and refresh token
        // send cookie

        const { email, username, password } = req.body;
        console.log("Request body :: ", req.body);

        // Ensure either username or email is provided
        if (!(username || email)) {
            throw new ApiError(400, "Username or email is required");
        }

        // Normalize email and username to lowercase for case-insensitive matching
        const user = await User.findOne({
            $or: [      // this is MONGODB operators
                { username: username?.toLowerCase() },
                { email: email?.toLowerCase() }
            ]
        });

        console.log("User details :: ", user);
        if (!user) {
            throw new ApiError(400, "User does not exist");
        }

        // Check if password is correct
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            throw new ApiError(401, "Invalid user password credentials");
        }

        // Generate access and refresh tokens
        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
        console.log("loged In User :: ", loggedInUser)
        // Set cookies with token (secure cookie for production)
        const options = {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production" // Set secure cookies only in production
            secure: true // Set secure cookies only in production
        };

        // Send success response with the tokens and user data
        return res.status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json(new ApiResponse(200, {
                user: loggedInUser, accessToken, refreshToken
            }, "User logged in successfully"));
    });


    const loginUserss = asyncHandler(async (req, res) => {
        // req body -> data
        // username or email
        // find the user
        // password check
        // access and referesh token
        // send cookie

        const { email, username, password } = req.body;
        console.log("Request body :: ", req.body)
        // if (!username && !email) {
        //     throw new ApiError(400, "Username or password is required")
        // }
        if (!(username || email)) {
            throw new ApiError(400, "Username or password is required")
        }

        const user = await User.findOne({
            $or: [{ username }, { email }]
        })
        console.log("User details :: ", user)
        if (!user) {
            throw new ApiError(400, "User does not exist")
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password)

        if (!isPasswordCorrect) {
            throw new ApiError(401, "Invalid user credentials")
        }

        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

        const logedInUser = await User.findById(user._id).selectedExclusively("-password -refreshToken")

        const options = {
            httpOnly: true,
            secure: true
        }
        return res.status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json(new ApiResponse(200, {
                user: logedInUser, accessToken, refreshToken
            },
                "User logged In Successfully"
            )
            )
    })


    const logoutUser = asyncHandler(async (req, res) => {
        await User.findByIdAndUpdate(
            req.user._id,
            // {
            //     $set: { refreshToken: undefined }
            // }
            {
                $unset: { refreshToken: 1 }
            }
        )

        const options = {
            httpOnly: true,
            secure: true
        }
        return res.status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200, {}, "User Logged Out"))
    })

    const refreshAccessToken = asyncHandler(async (req, res) => {

        const incommingRefreshToken = req.cookie.refreshToken
        if (!incommingRefreshToken) {
            throw new ApiError(401, "unauthorized request")
        }
        try {
            const decodedToken = jwt.verigy(
                incommingRefreshToken, process.env.REFRESH_TOKEN_SECRET
            )
            const user = await User.findById(decodedToken?._id)
            if (!user) {
                throw new ApiError(401, "invalid refresh token")
            }
            if (incommingRefreshToken !== user?.refreshToken) {
                throw new ApiError(401, "Refresh token is expired or used")
            }
            const options = {
                httpOnly: true,
                secure: true
            }
            const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id)
            return res.status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", newRefreshToken, options)


        } catch (error) {
            throw new ApiError(401, error?.message || "Invalid refresh token")
        }
    })

    const changeCurrentPassword = asyncHandler(async (req, res) => {
        const { oldPassword, newPassword, confPassword } = req.body
        const user = await User.findById(req.user?._id)
        const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
        // if (!(newPassword === confPassword)) {
        //     throw new ApiError(400, "Invalid confirm password")
        // }
        if (!isPasswordCorrect) {
            throw new ApiError(400, "Invalid old Password")
        }
        user.password = newPassword
        await user.save({ validateBeforeSave: false })

        return res.status(200, {}, "Password Changed Successfully")


    })

    const getCurrentUser = asyncHandler(async (req, res) => {
        return res.status(200).
            json(new ApiResponse(200, req.user, "Current user fetched successfully"))
    })

    const updateAccountDetails = asyncHandler(async (req, res) => {
        const { fullname, email } = req.body

        if (!fullname || !email) {
            throw new ApiError(400, "All fields are requied")
        }
        const user = await User.findByIdAndUpdate(req.user?._id, {
            $set: { fullname, email: email }
        },
            { new: true }
        ).select("-password")

        return res.status(200)
            .json(new ApiResponse(200, user, "Account details update successfully"))
    })

    const updateUserAvatar = asyncHandler(async (req, res) => {
        const avatarLocalPath = req.file?.path
        if (!avatarLocalPath) {
            throw new ApiError(400, "Avatar file is missing")
        }
        const avatar = await uploadCloudinary(avatarLocalPath)

        if (!avatar.url) {
            throw new ApiError(400, "Error file while uploading on avatar")
        }

        // assignment delete old image
        const user = await User.findByIdAndUpdate(req.user?._id,
            {
                $set: {
                    avatar: avatar.url
                },
            },
            { new: true }
        ).select("-password")

        return res.status(200)
            .json(new ApiResponse(200, user, "Avatar updated"))
    })
    const updateUserCoverImage = asyncHandler(async (req, res) => {
        const coverImageLocalPath = req.file?.path
        if (!coverImageLocalPath) {
            throw new ApiError(400, "Cover Image file is missing")
        }
        const coverImage = await uploadCloudinary(avatarLocalPath)

        if (!coverImage.url) {
            throw new ApiError(400, "Error file while uploading on avatar")
        }

        const user = await User.findByIdAndUpdate(req.user?._id,
            {
                $set: {
                    coverImage: coverImage.url
                },
            },
            { new: true }
        ).select("-password")
        return res.status(200)
            .json(new ApiResponse(200, user, "cover Image updated"))

    })

    const getUserChannelProfile = asyncHandler(async (req, res) => {
        const { username } = req.params
        if (!username?.trim()) {
            throw new ApiError(400, "Username is missing")
        }

        const channel = await User.aggregate([
            {
                $match: {
                    username: username?.toLowerCase()
                }
            },
            {
                $lookup: {
                    from: "Subscriptions",
                    localField: "_id",
                    foreignField: "channel",
                    as: "subscribers"
                }
            },
            {
                $lookup: {
                    from: "Subscriptions",
                    localField: "_id",
                    foreignField: "subscriber",
                    as: "subscribedTo"
                }
            },
            {
                $addFields: {
                    subscribersCount: {
                        $size: "$subscribers"
                    },
                    channelsSubscribedToCount:
                    {
                        $size: "$subscribedTo"
                    },
                    isSubscribed: {
                        $cond: {
                            if: { $in: [req.user?._id, "$subscribers.subscriber"] }
                            , then: true,
                            else: false
                        }
                    }
                }
            },
            {
                $project: {
                    fullname: 1,
                    username: 1,
                    subscribersCount: 1,
                    channelsSubscribedToCount: 1,
                    isSubscribed: 1,
                    avatar: 1,
                    coverImage: 1,
                    email: 1,
                }
            }
        ])
        console.log("Channel value :: ", channel)

        if (!channel?.length) {
            throw new ApiError(400, "Channel does not exists")
        }

        return res.status(201)
            .json(new ApiResponse(200, channel[0], "User channel fetched successfully"))
    })

    const getWatchHistory = asyncHandler(async (req, res) => {
        const user = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.user._id)
                }
            },
            {
                $lookup: {
                    from: "videos",
                    localField: "watchHistory",
                    foreignField: "_id",
                    as: "watchHistory",
                    pipeline: [
                        {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullname: 1,
                                        username: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        },
                        {
                            $addFields: {
                                owner: {
                                    $first: "$owner"
                                }
                            }
                        }
                    ]
                }
            }
        ])

        return res.status(200)
            .json(new ApiResponse, user[0].watchHistory, "Watch History fetched successfully")
    })

    export {
        registerUser,
        loginUser,
        logoutUser,
        refreshAccessToken,
        changeCurrentPassword,
        getCurrentUser,
        updateAccountDetails,
        updateUserAvatar,
        updateUserCoverImage,
        getUserChannelProfile,
        getWatchHistory
    }