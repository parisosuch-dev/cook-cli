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
      todo: [],
      done: []
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

const listTasks = (tOption) => {
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
      if (tOption) {
        console.log(indexOutput.gray, item.date.magenta, item.task.cyan)
      } else {
        var date = new Date(item.date);
        console.log(indexOutput.gray, date.toLocaleDateString().magenta, item.task.cyan);
      }
    })
  });
};

const checkTask = (index) => {
  // remove item from to-do list
  index = parseInt(index);

  if (!util.validIndex(index)) {
    return;
  }

  fs.readFile(todoFile, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    var obj = JSON.parse(data);
    // splice out completed task
    var completed = obj.todo.splice(index, 1)[0];
    // add completed @
    var now = new Date().toLocaleString([], { month: "2-digit", day: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })
    completed.completed_at = now;
    // move task to done arr
    obj.done.push(completed);
    // write json back to file
    json = JSON.stringify(obj);
    fs.writeFile(todoFile, json, (err) => {
      if (err) {
        throw err;
      }
    });
  });

  console.log("Task removed from list.".cyan);

  var lineCount = util.getLineCount();
  if (lineCount === 0) {
    console.log("You have no more tasks on your TO-DO list!".green);
  }
};

const removeTask = (index) => {
  // remove task without marking as done
  index = parseInt(index);

  if (!util.validIndex(index)) {
    return;
  }

  fs.readFile(todoFile, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    var obj = JSON.parse(data);
    // splice out task
    obj.todo.splice(index, 1);
    json = JSON.stringify(obj);
    fs.writeFile(todoFile, json, (err) => {
      if (err) {
        throw err;
      };
    });
  });
  console.log("Task removed from list.".cyan)
};

const clearAll = () => {
  // clear all tasks from to-do list
  let lineCount = util.getLineCount();
  if (lineCount === 0) {
    console.log("Cannot clear empty to-do list.".red);
    return;
  }
  fs.readFile(todoFile, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    var obj = JSON.parse(data);
    // splice out all of todo
    var completed = obj.todo.splice(0, obj.todo.length);
    obj.done.push.apply(obj.done, completed);
    // write json back to file
    json = JSON.stringify(obj);
    fs.writeFile(todoFile, json, (err) => {
      if (err) {
        throw err;
      }
    });
  });

  console.log("All tasks have been cleared.".green);
}

const doneTasks = () => {
  // show completed tasks
  fs.readFile(todoFile, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    console.log("\nYour Completed list:".green)
    var obj = JSON.parse(data);

    if (obj.done.length === 0) {
      console.log("You don't have any completed tasks! Finish something.".red);
      return;
    }

    obj.done.forEach((item, index) => {
      var indexOutput = "[" + index.toString() + "]"
      var date = new Date(item.date);
      console.log(indexOutput.gray, date.toLocaleDateString().magenta, item.task.cyan);
      console.log("Completed at: ".gray + item.completed_at.green);
    });
  });
}

module.exports = {
  addTask,
  listTasks,
  checkTask,
  clearAll,
  removeTask,
  doneTasks
};
