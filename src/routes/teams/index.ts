import * as express from "express";
const router = express.Router();
const controller = require('./teams.controller');


router.get('/', controller.getAllTeams);
router.get('/:name', controller.getTeam);

router.post('/', controller.create);

module.exports = router;