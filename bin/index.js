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

program.command("clear").description("clear all items on to-do list").action(() => {
  core.clearAll();
})

program.parse(process.argv);
