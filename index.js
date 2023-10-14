#!usr/bin/env node

const { Command } = require("commander");
const figlet = require("figlet");
const colors = require("colors");
const fs = require("fs");
// core
const core = require("./core.js");

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
    core.addTask(task);
  });

program
  .command("list")
  .description("list all in to-do")
  .action(() => {
    core.listTasks();
  });

program
  .command("check")
  .description("check off an item on the to-do list")
  .argument("<index>")
  .action((index) => {
    core.checkTask(index);
  });

program.parse();
