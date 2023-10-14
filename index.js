#!usr/bin/env node

const { Command } = require("commander");
const figlet = require("figlet");
const colors = require("colors");
const fs = require("fs");
const os = require("os");

program = new Command();

const homeDir = os.homedir();
const folder = homeDir + "/.cook";
const todoFile = folder + "/to-do.txt";

program
  .name("cook")
  .version("1.0.0")
  .description(
    "A todo list CLI -- nothing to do with actually cooking. It's all a metaphor."
      .cyan
  );

program
  .command("add")
  .description("Add a task to the todo list")
  .argument("<task>", "what you gotta do")
  .action(function (task) {
    task = task + "\r\n";
    const homeDir = os.homedir();
    const folder = homeDir + "/.cook";
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
  });

program
  .command("list")
  .description("list all in to-do")
  .action(() => {
    // read file contents and console out
    fs.readFile(todoFile, "utf-8", (err, data) => {
      if (err) {
        throw err;
      }
      let arr = data.split("\n");
      arr.splice(-1);
      console.log("\nYour to-do list:\n".magenta);
      arr.forEach((todo, i) => {
        let pos = (i + 1).toString();
        index = "(" + pos + ") ";
        console.log(index.gray + todo.cyan);
      });
    });
  });

program
  .command("check")
  .description("check off an item on the to-do list")
  .argument("<index>")
  .action((index) => {
    // remove item from to-do list
    index = parseInt(index) - 1;
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
  });

program.parse();
