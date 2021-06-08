import express from 'express';

import { getTeams, postTeam } from '../controllers/teams.js'

const router = express.Router();

router.get('/', getTeams);
router.post('/', postTeam);

export default router;