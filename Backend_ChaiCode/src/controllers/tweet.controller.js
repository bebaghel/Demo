import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.mjs";
import { Tweet } from '../models/tweet.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const createTweet = asyncHandler(async (req, res) => {

    // create Tweet
})
const getUserTweet = asyncHandler(async (req, res) => {
    const { userId } = req.params

    // get user tweet
})

const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    //delete tweet
})
const updateTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    const { name, description } = req.body
    //update tweet
})



export {
    createTweet,
    updateTweet,
    deleteTweet,
    getUserTweet
}