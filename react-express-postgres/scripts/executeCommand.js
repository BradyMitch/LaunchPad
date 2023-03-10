#!/usr/bin/env node

const { execSync } = require("child_process");
const { colors: c } = require("../utils");

// Import the available commands from utils.
const { commands } = require("../utils");

// Get the command identifier as a command line argument.
const commandIdentifier = process.argv[2];

// Look up the command string or array of commands associated with the given command alias.
const command = commands[commandIdentifier];

// If the command is a string, split it into the command itself and any additional arguments (if any).
// If the command is an array, treat each element as a separate command.
const commandsToRun = Array.isArray(command) ? command : [command];

// Execute each command in sequence.
try {
  for (let i = 0; i < commandsToRun.length; i++) {
    const cmd = commandsToRun[i];

    if (cmd.startsWith("echo")) {
      // If the command is an echo command, log it to the console.
      // Echo is asynchronous and would not run in sequence if run with execSync().
      console.log(cmd.slice(5));
    } else if (cmd.startsWith("cd")) {
      // If the command is a cd command, change the current working directory using process.chdir().
      // Change Directory would have no effect on following commands if run in execSync().
      const dir = cmd.slice(3).trim(); // Extract the directory path from the command.
      process.chdir(dir); // Change the current working directory.
    } else {
      // Otherwise, run the command synchronously.
      execSync(cmd, { stdio: "inherit" });
    }
  }
} catch {
  console.log(`${c.Pink}Command failed.${c.Reset}`);
}

// Exit the parent process with a success code.
process.exit(0);
