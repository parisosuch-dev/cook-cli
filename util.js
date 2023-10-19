const os = require('os');
const fs = require('fs');

const homeDir = os.homedir();
const folder = homeDir + "/.cook";
const todoFile = folder + "/to-do.txt";

const getLineCount = () => {
    var data = fs.readFileSync(todoFile);
    var res = data.toString().split('\n').length;
    return res - 1;
};

module.exports = { getLineCount };