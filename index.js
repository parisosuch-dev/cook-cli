#!usr/bin/env node

const { Command } = require("commander");
const figlet = require("figlet");
const fs = require("fs");

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
  .action((task, options) => {});

program.parse();
