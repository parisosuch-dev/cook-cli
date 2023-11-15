# cook-cli
An open source todo list for a better DX. Cook in real time. 🍳

> "Let me cook"

*Made with [commander.js](https://github.com/tj/commander.js)*

> [!WARNING]
> This project is in pre-release and is not complete.

## Installation
cook-cli has not been added to the npm registry yet. (soon)

```sh
$ npm install -g https://github.com/parisosuch-dev/cook-cli
```

**You must install npm package globally in order to add the binary to your path.**

## Quick Guide
Get usage:
```sh
$ cook
```
```console
Usage: cook [options] [command]

A todo list CLI -- nothing to do with actually cooking. It's all a metaphor.

Options:
  -V, --version     output the version number
  -h, --help        display help for command

Commands:
  add|a <task>      Add a task to the todo list
  list|l [options]  list all in to-do
  check|c <index>   check off an item on the to-do list
  clear             clear all items on to-do list
  help [command]    display help for command
```

### Add a task
```sh
cook add "<task>"
```
### List tasks
```sh
cook list
```
```console
Your TODO list:
[0] 10/26/2023 this is an example task.
```
If you want to list tasks with the timestamp:
```sh
cook list -t
```

### Check off a task
Using the index from the resulting list command:
```sh
cook check <index>
```

### Clear all items on list
```sh
cook clear
```

## Want to contribute?
Feel free to open up a PR with detailed reasoning in description or open up an issue to prompt an idea.
