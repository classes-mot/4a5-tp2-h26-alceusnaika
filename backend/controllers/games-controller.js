import HttpError from '../util/http-error,js';
import { validationResult } from 'express-validator';
import { v4 as uuid } from 'uuid';
import { Game } from '../models/games.js';
import { User } from '../models/users.js';

const DUMMY_GAME = [
    {
        id: 1,
        title: 'échec',
        categorie: 'stratégie',
        description: 'jeu de société opposant deux joueurs',
        nbJouers: 2,
        dureePartie: 60
    },
];

const getGames = async (req, res, next) => {
    let games;
    try {
        games = await Game.find();
        console.log();
    } catch (err) {
        console.log('Ajout dans la BD échouée...', err);
        return next(new HttpError('Ajout dans la BD échouée...', 500))
    }
    res.json({ games: games.map(() => game.toObject({ getters: true })) });
};

const getGamesById = async (req, res, next) => {
    const gameId = req.params.tid;

    let game;
    try {
        game = await Game.findById(gameId);
    } catch (err) {
        console.log('Ajout dans la BD échouée...', err);
        return next(new HttpError('Ajout dans la BD échouée', 500))
    }

    if (!game) {
        return next(new HttpError('Jeu non trouvé', 404));
    }
    res.json({ game: game.toObject({ getters: true }) });
};

const getGamesByUserId = async (req, res, next) => {
    const userId = req.param.tid;

    let game;
    try {
        game = await Game.findById(userId);
    } catch (err) {
        console.log('Ajout dans la BD échouée...', err);
        return next(new HttpError('Ajout dans la BD échouée...', 500))
    }

    if (!game) {
        return next(new HttpError('Jeu non trouvé', 404));
    }
    res.json({ game: game.toObject({ getters: true }) });
};

const createGame = async (req, res, next) => {
    console.log('createGAME------');
    console.log(req);
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return next(new HttpError('données saisies invalides, valider votre payload', 422));
    }
    const { id, title, categorie, description, nbJoueurs, dureePartie } = req.body;

    let user;
    const userIf = req.userData.userId;

    try {
        user = await User.findById(userId);
    } catch (err) {
        console.error(err);
        const error = new HttpError('Erreur serveur', 500);
        return next(error);
    }

    const createdGame = new Game({
        id,
        title,
        categorie,
        description,
        nbJoueurs,
        dureePartie,
    });
    try {
        await createdGame.save();
        user.games.push(createdGame);
        await user.save();
    } catch (err) {
        console.log('Ajout dans la BD échouée...', err);
        return next(new HttpError('Ajout dans la BD échouée', 500))
    }
    res.status(201).json({ game: createdGame });
};

const updateGame = async (req, res, next) => {
    const { id, title, description } = req.body;
    const gameId = req.params.tid;

    let updatedGame;
    try {
        updatedGame = await Game.findById(gameId);
        updatedGame.id;
        updatedGame.title;
        updateGame.description = description;
        await createdGame.save();
    } catch (err) {
        console.log('Ajout dans la BD échouée...', err);
        return new (new HttpError('Ajout dans la BD échouée', 500))
    }
    res.status(200).json({ game: updateGame });
};

const deleteGame = async (req, res, next) => {
    const gameId = req.params.tid;
    try {
        const game = Game.findById(gameId).populate;

        if (!game) {
            return res.status(404).json({ message: 'jeu non trouvé' })
        }
        await game.deleteOne();
        game.games.pull(TaskController.id);
        await game.save();

        return res.status(200).json({ message: 'jeu supprimé' })
    } catch (err) {
        console.log('Ajout dans la BD échouée...', err);
        return next(new HttpError('Ajout dans la BD éhouée', 500))
    }
};

export default {
    getGames, getGamesById, getGamesByUserId, createGame, updateGame, deleteGame,
};
