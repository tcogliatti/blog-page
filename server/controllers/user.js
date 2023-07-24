const User = require("../models/user");
const { login } = require("./auth");
const bcrypt = require("bcryptjs");
const image = require("../utils/image");

async function getMe(req, res) {
    const { user_id } = req.user;

    const response = await User.findById(user_id);

    if (!response)
        res.status(400).send({ msg: "User not found" });
    else
        res.status(200).send(response);

}

async function getUsers(req, res) {
    const { active } = req.query;

    let response = null;

    if (active == undefined)
        response = await User.find();
    else
        response = await User.find({ active });

    res.status(200).send(response);
}

async function createUser(req, res) {

    const { password } = req.body;
    const user = new User({ ...req.body, active: false })


    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user.password = hashPassword;


    if (req.files.avatar) {
        const imagePath = image.getFilePath(req.files.avatar);
        user.avatar = imagePath;
    }

    try {
        const userStored = await user.save();
        res.status(201).send(userStored);
    } catch (error) {
        res.status(400).send({ msg: "Error when try to create user" });
    }
}

async function updateUser(req, res) {
    const { id } = req.params;
    const userData = req.body;

    if(userData.password){
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(userData.password, salt);
        userData.password = hashPassword;
    }

    if (req.files.avatar) {
        const imagePath = image.getFilePath(req.files.avatar);
        userData.avatar = imagePath;
    }


    try {
        const updatedUser = await User.findByIdAndUpdate(id, userData, {new: true});

        if (updatedUser) 
            res.status(200).send({ msg: "User correctly updated" });
        else
            res.status(404).send({ msg: "User not found" });
            
    } catch (error) {
        res.status(400).send({ msg: "Error when try tu update user data" });
    }


}

async function deleteUser(req, res) {
    const { id } = req.params;
   
    try{
        await User.findByIdAndDelete(id);
        res.status(200).send({ msg: "User correctly deleted" });
    }catch (error) {
        res.status(400).send({ msg: "Error when try tu delete user" });

    }
}

module.exports = {
    getMe,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
}