const express = require('express')
const router = express.Router()
const UserSchema = require('../models/userModel')
const { AuthUser, VerifyToken, StoreQuest, SetOrder, FetchQuest, DeleteQuest, MarkQuest, activeUsers, SendActiveUsers, StoreLogs, FetchLogs } = require('../controllers/userController')


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


module.exports = router