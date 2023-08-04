const express = require('express');
const router = express.Router();
const { GetQuests, CreateQuest, OrderQuests } = require('../controllers/questController');

router.post('/', GetQuests);
router.post('/create', CreateQuest);
router.post('/orderQuests', OrderQuests);

module.exports = router;
