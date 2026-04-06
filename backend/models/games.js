import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    categorie: { type: String, required: true },
    description: { type: String },
    nbJoueurs: { type: Number, required: true },
    dureePartie: { type: Number, required: true },

});

export const Game = mongoose.model('Game', gameSchema);