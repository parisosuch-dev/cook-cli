const os = require("os");
const readline = require("readline");
const fs = require("fs");
const util = require("./util.js")

const homeDir = os.homedir();
const folder = homeDir + "/.cook";
const todoFile = folder + "/to-do.txt";

const addTask = (task) => {
  task = task + "\r\n";
  // make .cook folder if not exist
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  // write to file
  fs.appendFileSync(homeDir + "/.cook/to-do.txt", task, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Task added to list.");
    }
  });
};

const listTasks = () => {
  // read file contents and console out
  fs.readFile(todoFile, "utf-8", (err, data) => {
    if (err) {
      throw err;
    }
    let arr = data.split("\n");
    arr.splice(-1);
    console.log("\nYOUR TO-DO LIST".green);
    console.log("===============\n".green);
    arr.forEach((todo, i) => {
      let pos = (i + 1).toString();
      index = "(" + pos + ") ";
      console.log(index.gray + todo.cyan);
    });
  });
};

const checkTask = (index) => {
  // remove item from to-do list
  index = parseInt(index);
  let lineCount = util.getLineCount();

  if (index > lineCount | index <= 0) {
    console.log("Index out of bounds. Check list for indices.");
    return;
  }

  fs.readFile(todoFile, "utf-8", (err, data) => {
    if (err) {
      throw err;
    }
    let linesExceptIndex = data.split("\n");
    linesExceptIndex.splice(index, 1);
    linesExceptIndex = linesExceptIndex.join("\n");
    // write new lines to file
    fs.writeFile(todoFile, linesExceptIndex, (err, data) => {
      if (err) {
        throw err;
      }
    });
  });
};

module.exports = {
  addTask,
  listTasks,
  checkTask,
};