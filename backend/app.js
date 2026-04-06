import express from 'express';
import gamesRoutes from './routes/games-routes.js';
import usersRoutes from './routes/users-routes.js';
import errorHandler from './handler/error-handler.js';
import { connectDB } from './util/bd.js';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Acess-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/api/games', gamesRoutes);

app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    const error = new Error('Route non trouvée...');
    error.code = 404;
    next(error);
});

app.use(errorHandler);

await connectDB();

app.listen(5000, () => {
    console.log('serveur écoute au', `http://localhost:5000`);
})

