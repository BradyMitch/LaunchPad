/**
 * The help command is auto generated based on the jsDoc comments in the commands.js file.
 * Use 'npm run help' to see a list of commands.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 */

const fs = require("fs");
const path = require("path");
const { colors: c } = require("../utils");

// Define the path to the "commands.js" file.
const filePath = path.join(__dirname, "../utils", "commands.js");

console.log(
  `${c.Yellow}Available commands: ${c.White}"npm run <command>"${c.Reset}`
);

// Use the "fs" module to read the contents of the "commands.js" file.
fs.readFile(filePath, "utf8", (error, data) => {
  // If an error occurs, print it to the console and exit the function.
  if (error) {
    console.error(error);
    return;
  }

  // Define a regular expression that matches JSDoc-style "@command" and "@description" comments.
  const regex = /@command ([-:\w]+)\n\s+\* @description ([^\n]+)/g;

  // Loop through all the matches in the file.
  let match;
  while ((match = regex.exec(data)) !== null) {
    // Extract the "command" and "description" values from the match.
    const command = match[1];
    const description = match[2];

    // Print the each command to console.
    console.log(` ${c.Aqua}${command} ${c.Reset}- ${description}`);
  }
});
