#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const c = require("./colors");

// Define the directory where the templates are located.
const TEMPLATES_DIR = path.join(__dirname, "..", "templates");

// Read the list of files in the templates directory.
const templates = fs.readdirSync(TEMPLATES_DIR);

// Loop over each template file and create a new file.
templates.forEach((template) => {
  // Parse the template file to get the destination directory.
  const templatePath = path.join(TEMPLATES_DIR, template);
  const content = fs.readFileSync(templatePath, "utf8");
  const directoryMatch = content.match(/^# Directory: (.*)$/m);
  if (!directoryMatch) {
    console.error(`Error: ${template} doesn't specify a directory.`);
    return;
  }
  const destDir = directoryMatch[1];

  // Construct the destination path for the new file.
  const destName = template.replace(/^template\./, "");
  const destPath = path.join(destDir, destName);

  // Check if the file already exists.
  if (fs.existsSync(destPath)) {
    console.error(`${destPath} already exists.`);
    return;
  }

  // Read the content of the template file, remove the first 3 lines, and write it to the destination file.
  const lines = content.split("\n");
  const newContent = lines.slice(3).join("\n");
  fs.writeFileSync(destPath, newContent);

  console.log(`Created ${destPath}`);
});

console.log(
  `${c.Lime}Check these files for any secrets/variables that need to be added.${c.Reset}\n`
);
