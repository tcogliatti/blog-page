const Post = require("../models/post");
const image = require("../utils/image");

async function createPost(req, res) {
    const post = new Post(req.body);
    post.created_at = new Date();

    const imagePath = image.getFilePath(req.files.miniature);
    post.miniature = imagePath;

    try {
        const postStored = await Post.save();
        res.status(201).send(postStored);
    } catch (error) {
        res.status(400).send({ msg: "Error when try to create post" });
    }
}

async function getPost(req, res){
    const {page = 1, limit = 10} = req.query;
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: {created_at: "desc"},
    };
    
    try{
        const postsStorted = await Post.paginate({}, options);
        res.status(201).send(postsStorted);
    }catch(error){
        res.status(400).send({ msg: "Error when try to get post" });
    }
}

async function updatePost(req, res){
    const { id } = req.params;
    const postData = req.body;


    if(req.files.miniature){
        const imagePath = image.getFilePath(req.files.miniature);
        postData.miniature = imagePath;
    }

    try {
        const postUpdated = await Post.findByIdAndUpdate({_id: id}, postData, { new: true });

        if (postUpdated) 
            res.status(201).send(postUpdated);
        else
            res.status(404).send({ msg: "Post id not found" });

    } catch (error) {
        res.status(400).send({ msg: "Error when try to update post" });
    }
}

async function deletePost(req, res) {
    const {id} = req.params;


    try{
        await Post.findByIdAndDelete(id);
        res.status(200).send({ msg: "Post correctly deleted" });
    }catch (error) {
        res.status(400).send({ msg: "Error when try to delete post" });

    }
}

async function getByPath(req, res) {
    const { path } = req.params;

    try{
        const postFinded = await Post.findOne({path});

        if(!postFinded)
            res.status(400).send({ msg: "Post path doesnt exist" });
        else
            res.status(200).send(postFinded);
    }catch (error) {
        res.status(400).send({ msg: "Error when try to find post" });

    }

}


module.exports = {
    createPost,
    getPost,
    updatePost,
    deletePost,
    getByPath,
}