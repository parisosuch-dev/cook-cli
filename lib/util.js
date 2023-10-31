const os = require('os');
const fs = require('fs');

const homeDir = os.homedir();
const folder = homeDir + "/.cook";
const todoFile = folder + "/todo.json";

const getLineCount = () => {
    if (!fs.existsSync(todoFile)) {
        return 0;
    }
    let data = fs.readFileSync(todoFile, 'utf8');

    let obj = JSON.parse(data);

    return obj.todo.length;
};

const validIndex = (index) => {
    var lineCount = getLineCount() - 1;
    if (index > lineCount | index < 0) {
        console.log("Index out of bounds. Check list for indices.".red);
        return false;
    }
    return true;
}

module.exports = { getLineCount, validIndex };