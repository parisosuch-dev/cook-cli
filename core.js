const os = require("os");
const fs = require("fs");

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

module.exports = addTask;
module.exports = listTasks;
