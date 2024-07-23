const fs = require('fs');
const path = require('path');

const directoryPath = __dirname;

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    console.log('Files in directory:', files);
    
    if (files.includes('db.js')) {
        console.log('db.js exists in the directory.');
        fs.access(path.join(directoryPath, 'db.js'), fs.constants.R_OK, (err) => {
            if (err) {
                console.error('No read access to db.js');
            } else {
                console.log('Read access to db.js confirmed.');
            }
        });
    } else {
        console.log('db.js is missing from the directory.');
    }
});