#!/usr/bin/env node

const { Command } = require("commander");
const colors = require("colors");
const core = require("../lib/core.js");
const pckg = require("../package.json");

program = new Command();

program
  .name("cook")
  .version(pckg.version)
  .description(
    "A todo list CLI -- nothing to do with actually cooking. It's all a metaphor."
      .cyan
  );

program
  .command("add")
  .alias('a')
  .description("Add a task to the todo list")
  .argument("<task>", "what you gotta do")
  .action((task) => {
    core.addTask(task);
  });

program
  .command("list")
  .alias('l')
  .option('-t', '--time')
  .description("list all in to-do")
  .action((option) => {
    core.listTasks(option.t);
  });

program
  .command("check")
  .alias('c')
  .description("check off an item on the to-do list")
  .argument("<index>")
  .action((index) => {
    core.checkTask(index);
  });

program
  .command("clear")
  .description("clear all items on to-do list")
  .action(() => {
    core.clearAll();
  });

program
  .command("remove")
  .description("remove item from to-do list (does not mark as complete)")
  .argument("<index>").action((index) => {
    core.removeTask(index);
  });

program
  .command("done")
  .description("show all done items from to-do list.")
  .action(() => {
    core.doneTasks();
  })

program.parse(process.argv);
