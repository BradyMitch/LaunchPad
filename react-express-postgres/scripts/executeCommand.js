#!/usr/bin/env node

const { execSync } = require("child_process");

// Import the available commands from the './commands' module.
const commands = require("./commands");

// Get the command alias as a command line argument.
const commandAlias = process.argv[2];

// Look up the command string or array of commands associated with the given command alias.
const command = commands[commandAlias];

// If the command is a string, split it into the command itself and any additional arguments (if any).
// If the command is an array, treat each element as a separate command.
const commandsToRun = Array.isArray(command) ? command : [command];

// Execute each command in sequence.
for (let i = 0; i < commandsToRun.length; i++) {
  const cmd = commandsToRun[i];

  if (cmd.startsWith("echo")) {
    // If the command is an echo command, log it to the console.
    console.log(cmd.slice(5));
  } else if (cmd.startsWith("cd")) {
    // If the command is a cd command, change the current working directory using process.chdir().
    const dir = cmd.slice(3).trim(); // Extract the directory path from the command.
    process.chdir(dir); // Change the current working directory.
  } else {
    // Otherwise, run the command synchronously.
    execSync(cmd, { stdio: "inherit" });
  }
}

// Exit the parent process with a success code.
process.exit(0);
