import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.mjs";
import {Comment} from '../models/comment.model.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'

const getVideoComments = asyncHandler(async(req, res) => {
    // get all comments for a video
    const {videoId} = req.params
    const {page=1, limit=10} = req.query

})

const addComment = asyncHandler (async (req, res) => {
    // add a comment to a video
})
const updateComment = asyncHandler (async (req, res) => {
    // update a comment to a video
})
const deleteComment = asyncHandler (async (req, res) => {
    // delete a comment to a video
})

export {getVideoComments,
    addComment,
    updateComment,
    deleteComment
}