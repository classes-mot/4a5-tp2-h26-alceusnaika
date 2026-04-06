import HttpError from '../util/http-error,js';
import { validationResult } from 'express-validator';
import {v4 as uuid} from 'uuid';
import {Game} from '../models/games.js';
import {User} from '../models/users.js';

const DUMMY_GAME = [
    {
        title: 'échec',
        categorie: 'stratégie',
        description: 'jeu de société opposant deux joueurs',
        nbJouers: 2,
        dureePartie : 60
    },
];

const getGames = async (req, res, next) => {

};

const getGamesByUserId = async (req, res, next) => {

};

const createGame = async (req, res, next) => {

};

const updateGame = async (req, res, next) => {

};

const deleteGame = async (req, res, next) => {
    
};

export default {
    getGames, getGamesByUserId, createGame, updateGame, deleteGame,
};
