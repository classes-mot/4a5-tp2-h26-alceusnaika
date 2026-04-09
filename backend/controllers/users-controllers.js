import jwt from 'jsonwebtoken';
import { User } from "../models/users.js";

const getUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find();
    } catch (err) {
        console.error(err);
        const error = new HttpError('Erreur serveur', 500);
        return next(error);
    }
    res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const getUserById = async (req, res, next) => {
    let user;
    const userId = req.params.uid;

    try {
        user = await User.findById(userId);
    } catch (err) {
        console.error(err);
        const error = new HttpError('Erreur serveur', 500);
        return next(error);
    }
    if (!user) {
        res.status(404).json({ message: 'Utilisateur non trouvé.' });
    } else {
        res.json({ user });
    }
};

const registerUser = async (req, res, next) => {
    console.log('registering');
    const { name, email, password, image, role } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        console.error(err);
        const error = new HttpError('Enregistrement échoué...', 500);
        return next(error);
    }
    if (existingUser) {
        res.status(422).json({ message: 'Cet email est déjà utilisé.' });
        return;
    }
    const createdUser = new User({
        name,
        email,
        password,
        image,
        role,
        game
    });
    try {
        await createdUser.save();
    } catch (err) {
        console.error(err);
        const error = new HttpError('Enregistrement échoué...', 500);
        return next(error);
    }
    console.log('registered');
    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        console.error(err);
        const error = new HttpError('Enregistrement échoué...', 500);
        return next(error);
    }
    const identifiedUser = find(
        (user) => user.email === email && user.password === password
    );
    console.log(identifiedUser);
    if (!identifiedUser || existingUser.password !== password) {
        res.status(401).json({ message: 'Identification échouée, vérifiez vos identifiants.' });
    } else {
        let token;
        try {
            console.log('identifiée!');
            token = jwt.sign({ userId: identifiedUser.id, email: identifiedUser.email }, 'cleSecrete!', { expiresIn: '1h' });
            console.log(token);
        } catch (err) {
            console.error(err);
            const error = new HttpError('Échec de la connexion, veuillez réessayer plus tard.', 500);
            return next(error);
        }
        res.status(201).json({ userId: identifiedUser.id, email: identifiedUser.email, token: token, });
    }
};

const updatedUserById = (req, res, next) => {
    const userId = req.params.uid;
    const { name, email, password, image, role } = req.body;
    const userIndex = findIndex((user) => user.id === userId);
    const updatedUser = {
        name,
        email,
        password,
        image,
        role,
    };
    res.status(200).json({ user: updatedUser });
};
export default {
    getUsers, getUserById, registerUser, login, updatedUserById,
};

