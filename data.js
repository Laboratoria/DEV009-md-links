const fs = require('node:fs');
const path = require('path');

function convertToAbsolutePath(pathReceived){
    if (path.isAbsolute (pathReceived)){
        return pathReceived;
    }else{
       return path.resolve(pathReceived);
    }
}


module.exports = fs.existsSync;
module.exports = convertToAbsolutePath;