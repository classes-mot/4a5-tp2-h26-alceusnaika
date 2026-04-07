import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) return;

    let uri = 'mongodb://localhost:27017/Alcéus_BD';

    try {
        await mongoose.connect(uri);
        isConnected = true;
        console.log("Connectée à la BD avec succès !");
    } catch (err) {
        console.log('Erreur lors de la connexion', err);
        process.exit(1);
    }
}

export default connectDB;