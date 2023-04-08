const { spawn } = require("child_process");
const { colors: c, commands } = require("../utils");

// Get the command identifier as a command line argument.
const commandIdentifier = process.argv[2];

// Look up the command string or array of commands associated with the given command alias.
const command = commands[commandIdentifier];

// If the command is a string, split it into the command itself and any additional arguments (if any).
// If the command is an array, treat each element as a separate command.
const commandsToRun = Array.isArray(command) ? command : [command];

// Takes a string of output and replaces any instances of keywords with their respective replacement text.
const replaceKeywords = (str, keywordMap) => {
  let result = str;
  for (let [keyword, replacement] of keywordMap) {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    result = result.replace(regex, replacement);
  }
  return result;
};

// Execute each command in sequence.
(async function () {
  for (let i = 0; i < commandsToRun.length; i++) {
    const cmd = commandsToRun[i];

    if (cmd.startsWith("echo")) {
      // If the command is an echo command, log it to the console.
      // Echo is asynchronous and would not run in sequence if run with spawnSync().
      console.log(cmd.slice(5));
    } else if (cmd.startsWith("cd")) {
      // If the command is a cd command, change the current working directory using process.chdir().
      // Change Directory would have no effect on following commands if run in spawnSync().
      const dir = cmd.slice(3).trim(); // Extract the directory path from the command.
      process.chdir(dir); // Change the current working directory.
    } else {
      // Otherwise, run the command asynchronously using spawn
      // and replace any instances of keywords with their respective replacement text.
      const keywordMap = new Map([
        ["Error", `${c.Pink}Error${c.Reset}`],
        ["ERROR", `${c.Pink}ERROR${c.Reset}`],
        [" ^", `${c.Pink} ^${c.Reset}`],
        ["vulnerabilities", `${c.Pink}vulnerabilities${c.Reset}`],
        ["Deleted", `${c.Pink}Deleted${c.Reset}`],
        ["Untagged", `${c.Yellow}Untagged${c.Reset}`],
        ["Done", `${c.Lime}Done${c.Reset}`],
      ]);
      const child = spawn(cmd, { shell: true });

      child.stdout.on("data", (data) => {
        const outputLines = data.toString().split("\n");
        let lastLineWasEmpty = false;
        outputLines.forEach((line) => {
          // Remove extra newlines made by stdout data.
          if (!lastLineWasEmpty && line.length === 0) {
            lastLineWasEmpty = true;
            return;
          } else if (line.length !== 0) {
            lastLineWasEmpty = false;
          }

          // Modify and log the line.
          const modifiedLine = replaceKeywords(line, keywordMap);
          console.log(modifiedLine);
        });
      });

      child.stderr.on("data", (data) => {
        console.error(data.toString());
      });

      await new Promise((resolve) => {
        child.on("exit", resolve);
      });
    }
  }
})();
