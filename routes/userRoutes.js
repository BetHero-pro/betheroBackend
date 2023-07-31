const express = require('express')
const router = express.Router()
const {
  AuthUser,
  VerifyToken,
  StoreQuest,
  SetOrder,
  FetchQuest,
  DeleteQuest,
  MarkQuest,
  activeUsers,
  SendActiveUsers,
  StoreLogs,
  FetchLogs,
  StorePlaylist,
  GetPlaylist,
  DeletePlaylists,
  StorePlaylistQuest,
  MarkPlaylistQuest,
  UpdatePlaylistQuests,
} = require('../controllers/userController')

//Routes
router.get('/', (req, res) => {
    res.json({ mssg: "Hello" })
})

router.get('/home', (req, res) => {
    res.json({ mssg: "Home" })
})

router.post('/userAuth', AuthUser)
router.post('/verifyUser', VerifyToken)
router.post('/storeQuest', StoreQuest)
router.post('/setOrder', SetOrder)
router.post('/fetchQuest', FetchQuest)
router.post('/deleteQuest', DeleteQuest)
router.post('/markQuest', MarkQuest)
router.post('/ActiveUsers', activeUsers)
router.post('/getActiveUsers', SendActiveUsers)
router.post('/storeLogs', StoreLogs)
router.post('/fetchLogs', FetchLogs)

//playlist
router.post('/storePlaylist', StorePlaylist);
router.post('/getPlaylist', GetPlaylist);
router.post('/deletePlaylists', DeletePlaylists);
router.post('/storePlaylistQuest', StorePlaylistQuest);
router.post('/markPlaylistQuest', MarkPlaylistQuest);
router.post('/updatePlaylistQuests', UpdatePlaylistQuests);

module.exports = router