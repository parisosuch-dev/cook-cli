#!usr/bin/env node

const { Command } = require("commander");
const figlet = require("figlet");
const colors = require("colors");
const fs = require("fs");
// core
const addTask = require("./core.js");

program = new Command();

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
  .action((task) => {
    addTask(task);
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
      console.log("\nYOUR TO-DO LIST".green);
      console.log("===============\n".green);
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
