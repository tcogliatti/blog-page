const Menu = require("../models/menu");

async function createMenu(req, res) {
    const menu = new Menu(req.body);

    try{
        const menuStored = await menu.save();
        res.status(200).send(menuStored);
    }catch(error){
        res.status(400).send({msg:"error when try to create menu"})
    }
}

async function getMenu(req, res){
    const { active } = req.query;

    let response = null;
    if( active == undefined )
        response = await Menu.find().sort({order: "asc"});
    else
        response = await Menu.find({active}).sort({order: "asc"});

    if(!response)
        res.status(400).send({msg: "Error when try to get all menu"});
    else
        res.status(200).send(response);
}

async function updateMenu(req, res) {
    const { id } = req.params;
    const menuData = req.body;

    try{
        await Menu.findByIdAndUpdate({_id: id}, menuData);
        res.status(200).send({msg: "Data Menu Updated"});
    }catch(error){
        res.status(400).send({msg: "Error when try to update menu data"})
    }
}

async function deleteMenu(req, res) {
    const {id} = req.params;

    try{
        await Menu.findByIdAndDelete(id);
        res.status(200).send({ msg: "Menu correctly deleted" });
    }catch (error) {
        res.status(400).send({ msg: "Error when try to delete menu" });

    }
}
module.exports = {
    createMenu,
    getMenu,
    updateMenu,
    deleteMenu,
};