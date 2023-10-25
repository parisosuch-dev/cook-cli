const os = require("os");
const fs = require("fs");
const util = require("./util.js")
const colors = require("colors");

const homeDir = os.homedir();
const folder = homeDir + "/.cook";
const todoFile = folder + "/todo.json";

const addTask = (task) => {
  // create cookTask
  var today = new Date();

  var cookTask = { date: today.toLocaleString([], { month: "2-digit", day: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" }), task: task }

  // make .cook folder if not exist
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  // if the file doesnt not exist create it
  if (!fs.existsSync(todoFile)) {
    var obj = {
      todo: []
    };
    obj.todo.push(cookTask)
    var json = JSON.stringify(obj)
    fs.writeFile(todoFile, json, (err) => {
      if (err) {
        throw err;
      }
    });
    console.log("Task added to list.".cyan);

    return;
  }

  // file exists: append
  fs.readFile(todoFile, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    obj = JSON.parse(data);
    obj.todo.push(cookTask);
    json = JSON.stringify(obj);
    fs.writeFile(todoFile, json, (err) => {
      if (err) {
        throw err;
      }
    });
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
  fs.readFile(todoFile, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    console.log("\nYour TODO list:".green)
    var obj = JSON.parse(data);
    obj.todo.forEach((item, index) => {
      var indexOutput = "[" + index.toString() + "]"
      console.log(indexOutput.gray, item.date.magenta, item.task.cyan)
    })
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
