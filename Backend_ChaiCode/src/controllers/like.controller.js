import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.mjs";
import { Like } from '../models/like.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    // toggle like on video
})
const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    // toggle like on comment
})
const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    // toggle like on tweet
})
const getLikedVideos = asyncHandler(async (req, res) => {
    // get all liked videos
})

export {
    toggleCommentLike,
    toggleVideoLike,
    toggleTweetLike,
    getLikedVideos
}