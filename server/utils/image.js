
function getFilePath(file){
    let filePath = file.path;
    filePath = filePath.split("/");
    return `${filePath[1]}/${filePath[2]}`;
}

module.exports = {
    getFilePath,
};