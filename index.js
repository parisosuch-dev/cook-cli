#!usr/bin/env node

const { Command } = require("commander");
const figlet = require("figlet");
const fs = require("fs");
const path = require("path");
const os = require("os");

program = new Command();

program
  .name("cook")
  .version("1.0.0")
  .description(
    "A todo list CLI -- nothing to do with actually cooking. It's all a metaphor."
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

program.parse();
