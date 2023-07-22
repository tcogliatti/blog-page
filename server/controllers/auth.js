const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

async function register(req, res){
    console.log(req.body);
    const {firstname, lastname, email, password} = req.body;
    
    if(!email) res.status(400).send({msg: "mail cant be empty"});
    if(!password) res.status(400).send({msg: "password cant be empty"});
    
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        password: hashPassword,
        role: "user",
        active: false,
    });

    try{
        await user.save();
        res.status(200).send({ msg: "User created successfully" });

    } catch (error) {
        res.status(500).send({ msg: "Error when trying to create user" });
    }
}

async function login(req, res){
    const  {email, password} = req.body;

    if(!email) {
        res.status(400).send({msg: "mail cant be empty"});
        return;
    }
    if(!password){
        res.status(400).send({msg: "password cant be empty"});
        return;
    } 

    const emailToLowercase =  email.toLowerCase();

    try{
        userStore = await User.findOne ({email : emailToLowercase});
        
        console.log("Password: ", password);
        console.log("Email: ", email);
        console.log(userStore);

        bcrypt.compare(password, userStore.password, (bcryptError, check) => {
            if(bcryptError)
                res.status(500).send({ msg: "User login error" });
            else if(!userStore.active)
                res.status(500).send({ msg: "User login error" });
            else if(!check)
                res.status(500).send({ msg: "User login error" });
            else if(!check)
                res.status(500).send({ msg: "User login error" });
            else    
                res.status(200).send({ 
                    access: jwt.createAccessToken(userStore),
                    refresh: jwt.createRefreshToken(userStore)
                 });
        })

        // res.status(200).send({ msg: "User find" });

    } catch(error){
        res.status(500).send({ msg: "User login error" });

    }
}

async function refreshAccessToken(req, res) {
    const { token } = req.body;

    if(!token){
        res.status(400).send({ msg: "Required token" });
        return;
    }

    const { user_id } = jwt.decoded(token);

    try{
        const userStorage = await User.findOne({ _id: user_id});
        res.status(200).send({
            accessToken: jwt.createAccessToken(userStorage)
        })
    } catch(error){
        res.status(500).send({ msg: "Server error" });
    }

}

module.exports = {
    register,
    login,
    refreshAccessToken,
}