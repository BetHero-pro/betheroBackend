const PlaylistSchema = require('../models/playlistModel');
const mongoose = require('mongoose');

const GetSpecificPlaylist = async (req, res) => {
  try {
    const { userID, playlistName } = req.body;
    // if a playlist name is provided, return the specific playlist
    const findPlaylist = await PlaylistSchema.findOne({ ID: userID, name: playlistName });

    if (findPlaylist) {
      // filter out quests that are not checked
      const uncheckedQuests = findPlaylist.quests.filter(quest => quest.isChecked === false);
      // replace the quests array with the filtered array
      findPlaylist.quests = uncheckedQuests;
    }
    return res.status(200).json(findPlaylist);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};

const handleError = (error, req, res, next) => {
  console.error(error);
  res.status(400).json({ error: error });
};

const StorePlaylist = async (req, res) => {
  try {
    var userID = req.body.userID;
    var playlistData = req.body.playlist;
    const playlist = await PlaylistSchema.create({
      ID: userID,
      ...playlistData,
    });
    return res.status(200).json(playlist);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};

const DeletePlaylists = async (req, res) => {
  try {
    var userID = req.body.userID;
    const delPlaylists = await PlaylistSchema.deleteMany({ ID: userID });
    return res.status(200).json(delPlaylists);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};

const DeleteSpecificPlaylist = async (req, res) => {
  try {
    var userID = req.params.userId;
    var playlistID = req.params.playlistId;
    console.log('pID', playlistID);

    // Convert string to ObjectId
    const playlistId = new mongoose.Types.ObjectId(playlistID);
    console.log('playlistId', playlistId);

    // get all playlist for the user
    const deletePlaylist = await PlaylistSchema.deleteOne({ _id: playlistId });
    // const delPlaylists = await PlaylistSchema.deleteMany({ ID: userID });
    return res.status(200).json({ check: 'OK' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};

const GetAllPlaylists = async (req, res) => {
  try {
    var userID = req.params.userId;
    const findPlaylists = await PlaylistSchema.find({ ID: userID });
    return res.status(200).json(findPlaylists);
  } catch (error) {
    handleError(error, req, res, next);
  }
};

const GetPlaylist = async (req, res) => {
  try {
    var userID = req.body.userID;
    var playlistName = req.body.playlistName;
    if (playlistName) {
      // if a playlist name is provided, return the specific playlist
      const findPlaylist = await PlaylistSchema.findOne({ ID: userID, name: playlistName });

      if (findPlaylist) {
        // filter out quests that are not checked
        const uncheckedQuests = findPlaylist.quests.filter(quest => quest.isChecked === false);

        // replace the quests array with the filtered array
        findPlaylist.quests = uncheckedQuests;
      }
      return res.status(200).json(findPlaylist);
    } else {
      // if no playlist name is provided, return all playlists
      const findPlaylists = await PlaylistSchema.find({ ID: userID });
      return res.status(200).json(findPlaylists);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};

module.exports = {
  GetPlaylist,
  GetAllPlaylists,
  DeletePlaylists,
  StorePlaylist,
  DeleteSpecificPlaylist,
};
