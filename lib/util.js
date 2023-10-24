const os = require('os');
const fs = require('fs');

const homeDir = os.homedir();
const folder = homeDir + "/.cook";
const todoFile = folder + "/todo.json";

const getLineCount = () => {
    if (!fs.existsSync(todoFile)) {
        return 0;
    }
    fs.readFile(todoFile, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        var obj = JSON.parse(data);

        return obj.todo.length;
    });
};

module.exports = { getLineCount };