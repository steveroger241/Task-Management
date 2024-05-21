const express = require('express');
const router = express.Router();

const { createController, readController, updateController, deleteController, doneController, unDoneController, searchController } = require('../controller/taskController.js');

router.post('/create', createController);
router.post('/read', readController);
router.post('/update', updateController);
router.post('/delete', deleteController);
router.post('/done', doneController);
router.post('/undone', unDoneController);
router.post('/search', searchController);

module.exports = router;