const os = require('os');
const fs = require('fs');

const homeDir = os.homedir();
const folder = homeDir + "/.cook";
const todoFile = folder + "/todo.json";

const getLineCount = () => {
    if (!fs.existsSync(todoFile)) {
        return 0;
    }
    var data = fs.readFileSync(todoFile);
    var res = data.toString().split('\n').length;
    return res - 1;
};

module.exports = { getLineCount };