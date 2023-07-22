const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY, EXPIRATION_ACCESS_TKN, EXPIRATION_REFRESH_TKN } = require("../constants");

function createAccessToken(user) {
    const expToken = new Date();
    expToken.setHours(expToken.getHours() + EXPIRATION_ACCESS_TKN); // tiempo de expiracion del token

    const playload = {
        token_type: "access",
        user_id: user._id,
        iat: Date.now(), // fecha de creacion de token
        exp: expToken.getTime(), // fecha de expiracion de token
    };

    return jwt.sign(playload, JWT_SECRET_KEY);
}

function createRefreshToken(user) {
    const expToken = new Date();
    expToken.setMonth(expToken.getMonth() + EXPIRATION_REFRESH_TKN); // tiempo de expiracion del token

    const playload = {
        token_type: "refresh",
        user_id: user._id,
        iat: Date.now(), // fecha de creacion de token
        exp: expToken.getTime(), // fecha de expiracion de token
    };

    return jwt.sign(playload, JWT_SECRET_KEY);
}

function decoded(token) {
    return jwt.decode(token, JWT_SECRET_KEY, true);
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    decoded
}