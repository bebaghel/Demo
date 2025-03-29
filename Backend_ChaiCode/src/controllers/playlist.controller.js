import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.mjs";
import { Playlist } from '../models/playlist.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body

    // create Playlist
})
const getUserPlaylist = asyncHandler(async (req, res) => {
    const { userId } = req.params

    // get user Playlist
})
const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params

    // get Playlist by Id
})
const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params

})
const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params

})
const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
    //delete playlist
})
const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
    const { name, description } = req.body
    //update playlist
})



export {
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    getUserPlaylist,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist
}