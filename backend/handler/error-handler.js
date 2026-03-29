function errorHandler(error, red, next) {
    if (res.headerSent) {
        return next(error);
    } else {
        res.status(error.code || 500);
        res.json({ message: error.message || "Une erreur inconnue est survenue !" })
    }
} 
