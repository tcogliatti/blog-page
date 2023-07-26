const Course = require("../models/courses");
const image = require("../utils/image");

async function createCourse(req, res) {
    const course = new Course(req.body);

    const imagePath = image.getFilePath(req.files.miniature);
    course.miniature = imagePath;

    try {
        const courseStored = await course.save();
        res.status(201).send(courseStored);
    } catch (error) {
        res.status(400).send({ msg: "Error when try to create course" });
    }
}

async function getCourses(req, res){
    const {page = 1, limit = 10} = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };
    
    try{
        const courses = await Course.paginate({}, options)
        res.status(200).send(courses);
    }catch(error){
        res.status(400).send({msg: "error when try to get courses"});
    }

}
async function updateCourse(req, res){
    const {id} = req.params;
    const courseData = req.body;

    if(req.files.miniature){
        const imagePath = image.getFilePath(req.files.miniature);
        courseData.miniature = imagePath;
    }

    try{
        await Course.findByIdAndUpdate({_id : id}, courseData);
        res.status(200).send({msg: "Course data correctly updated"});
    } catch(error) {
        res.status(400).send({msg: "error when try to update course"});
    }
}

async function deleteCourse(req, res) {
    const {id} = req.params;

    try{
        await Course.findByIdAndDelete(id);
        res.status(200).send({msg: "Course correctly deleted"});
    } catch(error) {
        res.status(400).send({msg: "Error when try to delete course"});
    }

}

module.exports = {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse,
};