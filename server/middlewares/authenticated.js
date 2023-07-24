const jwt = require("../utils/jwt");

function asureAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({msg: "la cabecera no tiene la petición de autenticación"});
        
    }
    const token = req.headers.authorization.replace("Bearer ","");

    try{
        const payload = jwt.decoded(token);
        const {exp} = payload;
        const currentDate = new Date().getTime();

        if(currentDate >= exp)
            return res.status(400).send({msg: "token expirado"});

        req.user = payload;
        next();

    }catch (error){
        return res.status(400).send({msg: "Invalid Token"});
    }
}

module.exports = {
    asureAuth,
};