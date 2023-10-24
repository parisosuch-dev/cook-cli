const os = require("os");
const fs = require("fs");
const util = require("./util.js")
const colors = require("colors");

const homeDir = os.homedir();
const folder = homeDir + "/.cook";
const todoFile = folder + "/todo.json";

const addTask = (task) => {
  task = task + "\r\n";
  // make .cook folder if not exist
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  // write to file
  fs.appendFileSync(homeDir + "/.cook/todo.json", task, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
  console.log("Task added to list.".cyan);
};

const listTasks = () => {
  // check to see if to-do list is empty
  let lineCount = util.getLineCount();
  if (lineCount == 0) {
    console.log("TO-DO list empty! Add a task.".red);
    console.log("To Add Task: ".magenta + 'cook add "{task}"'.cyan);
    return;
  }
  // read file contents and console out
  fs.readFile(todoFile, "utf-8", (err, data) => {
    if (err) {
      throw err;
    }
    let arr = data.split("\n");
    arr.splice(-1);
    console.log("YOUR TO-DO LIST:".green);
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
    console.log("Index out of bounds. Check list for indices.".red);
    return;
  }

  fs.readFile(todoFile, "utf-8", (err, data) => {
    if (err) {
      throw err;
    }
    let linesExceptIndex = data.split("\n");
    linesExceptIndex.splice(index - 1, 1);
    linesExceptIndex = linesExceptIndex.join("\n");
    // write new lines to file
    fs.writeFile(todoFile, linesExceptIndex, (err, data) => {
      if (err) {
        throw err;
      }
    });
  });
  console.log("Task removed from list.".cyan)
  if (lineCount - 1 == 0) {
    console.log("You have no more tasks on your TO-DO list!".green);
  }
};

const clearAll = () => {
  // clear all tasks from to-do list
  // simply by deleting the file! (for now)
  let lineCount = util.getLineCount();
  if (lineCount === 0) {
    console.log("Cannot clear empty to-do list.".red);
    return;
  }
  fs.unlink(todoFile, (err) => {
    if (err) {
      console.log(err);
    }
  });
  console.log("All tasks have been cleared.".green);
}

module.exports = {
  addTask,
  listTasks,
  checkTask,
  clearAll
};
