const Newsletter = require("../models/newsletter");

async function suscribeEmail(req, res) {
    const { email } = req.body;

    const newsletter = new Newsletter({
        email: email.toLowerCase(),
    });

    try{
        await newsletter.save()
        res.status(200).send({msg: "email suscribe ok"})
    }catch(error){
        res.status(400).send({msg: "error when try to suscribe email"})

    }
}

async function getMails(req, res){
    const { page = 1, limit = 10} = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    }

    try{
        const emailStored = await Newsletter.paginate({}, options);
        res.status(200).send(emailStored);
    }catch(error){
        res.status(400).send({msg: "error when try to get all newsletter emails"})
    }

}

async function deleteMail(req, res) {
    const { id } = req.params;

    try{
        await Newsletter.findByIdAndDelete(id);
        res.status(200).send({msg: "email deleted ok"})
    } catch(error) {
        res.status(400).send({msg: "error when try to delete email"})
    }
}


module.exports = {
    suscribeEmail,
    getMails,
    deleteMail,
};