const express = require('express');
const router = express.Router();
const { GetQuests, CreateQuest, OrderQuests, RemoveQuests } = require('../controllers/questController');

router.post('/', GetQuests);
router.post('/create', CreateQuest);
router.post('/orderQuests', OrderQuests);
router.delete('/removeQuests', RemoveQuests);

module.exports = router;
