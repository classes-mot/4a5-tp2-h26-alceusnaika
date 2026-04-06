import express from 'express';
import { check} from 'express-validator';
import gamesController from '../controllers/games-controller.js';
import checkAuth from '../middleware/check-auth.js';

const router = express.Router();

router.get('/', gamesController.getGames);

router.get('/', gamesController.getGamesById);

router.get('/', gamesController.getGamesByUserId);

router.user(checkAuth);

router.post(
    '/',
    [
        check('id').not().isEmpty(),
        check('title').not().isEmpty(),
        check('description').isLength({min : 10}),
        check('nbJoueurs').not().isEmpty(),
    ],
    gamesController.createGame
);

router.patch('/:tid', gamesController.updateGame);

router.delete('/:tid', gamesController.deleteGame);

export default router;