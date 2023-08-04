const express = require('express');
const router = express.Router();
const { GetPlaylist, GetAllPlaylists, DeletePlaylists, StorePlaylist, DeleteSpecificPlaylist } = require('../controllers/playlistController');

//Routes
router.get('/', (req, res) => {
  res.json({ mssg: 'Hello' });
});

//playlist
router.post('/storePlaylist', StorePlaylist);
router.post('/getPlaylist', GetPlaylist);
router.post('/deletePlaylists', DeletePlaylists);

// new routes
router.get('/playlists/:userId', GetAllPlaylists);

// new id routes
router.delete('/playlists/:userId/:playlistId', DeleteSpecificPlaylist);

module.exports = router;
