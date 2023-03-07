#!/usr/bin/env node

const { spawn } = require("child_process");

// Import the available commands from the './commands' module.
const commands = require("./commands");

// Get the command alias as a command line argument.
const commandAlias = process.argv[2];

// Look up the command string or array of commands associated with the given command alias.
const command = commands[commandAlias];

// If the command is a string, split it into the command itself and any additional arguments (if any).
// If the command is an array, treat each element as a separate command.
const commandsToRun = Array.isArray(command)
  ? command.map((cmd) => cmd.split(" "))
  : [command.split(" ")];

// Execute each command in sequence.
let childProcess;
for (let i = 0; i < commandsToRun.length; i++) {
  const [command, ...argsToPass] = commandsToRun[i];
  childProcess = spawn(command, argsToPass, { stdio: "inherit" });
}

// Listen for the last child process to exit, and log any errors or non-zero exit codes.
childProcess.on("exit", (code, signal) => {
  if (signal) {
    console.error(`Command '${command}' terminated with signal ${signal}`);
    process.exit(1);
  }

  if (code !== 0) {
    console.error(`Command '${command}' exited with code ${code}`);
    process.exit(1);
  }

  // If the last command exited successfully, exit the parent process with a success code.
  process.exit(0);
});
