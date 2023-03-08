#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const c = require("./colors");

// Define the path to the docker-compose override files.
const OVERRIDE_FILE = path.join(
  __dirname,
  "..",
  "docker-compose.override.yaml"
);
const OVERRIDE_PRODUCTION_FILE = path.join(
  __dirname,
  "..",
  "-docker-compose.override.yaml"
);

// Check if either the override file or the production override file exists.
let toggleToProduction = false;
if (fs.existsSync(OVERRIDE_FILE)) {
  // Rename to OVERRIDE_PRODUCTION_FILE.
  fs.renameSync(OVERRIDE_FILE, OVERRIDE_PRODUCTION_FILE);
  toggleToProduction = true;
} else if (fs.existsSync(OVERRIDE_PRODUCTION_FILE)) {
  // Rename to OVERRIDE_FILE.
  fs.renameSync(OVERRIDE_PRODUCTION_FILE, OVERRIDE_FILE);
} else {
  // File does not exist.
  console.log(
    `\n${c.Pink}Docker compose override file does not exist.${c.Reset}`
  );
  console.log(
    `${c.Pink}Use ${c.White}npm run init ${c.Pink}to create the file.${c.Reset}`
  );
  return;
}

// Log whether we toggled to production or development mode.
if (toggleToProduction) {
  // Toggling to Production.
  console.log(
    `\n${c.Cyan}Toggled to local ${c.White}production ${c.Cyan}mode.${c.Reset}`
  );
  console.log(
    `${c.Cyan}Rebuild the containers for changes to take affect.${c.Reset}`
  );
  console.log(
    `\n${c.Grey}This means the local servers will mimic a production environment${c.Reset}`
  );
  console.log(
    `${c.Grey}by setting the target to 'prod' in frontend and backend Dockerfiles.${c.Reset}`
  );
} else {
  // Toggling to Development.
  console.log(
    `\n${c.Cyan}Toggled to local ${c.White}development ${c.Cyan}mode.${c.Reset}`
  );
  console.log(
    `${c.Cyan}Rebuild the containers for changes to take affect.${c.Reset}`
  );
  console.log(
    `\n${c.Grey}This means the local servers will 'refresh'${c.Reset}`
  );
  console.log(`${c.Grey}to update with changes to the local files.${c.Reset}`);
}
