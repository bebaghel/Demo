
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.mjs";
import {Comment} from '../models/comment.model.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'





const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    // get video, upload to cloudinary, create video
})
const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    // get video by ID
})
const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    // update video details like title, description, thumbnail
})
const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    // delete video
})
const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    // delete video
})


export {
    getAllVideo,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,

}