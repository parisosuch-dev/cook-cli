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
  .argument('"<task>"', "what you gotta do")
  .action((task, options) => {
    const homeDir = os.homedir();
    const folder = homeDir + "/.cook";
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    // write to file
    fs.writeFileSync(
      homeDir + "/.cook/to-do.txt",
      task,
      { flag: "a+" },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Task added to list.");
        }
      }
    );
  });

program.parse();
