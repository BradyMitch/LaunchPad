const c = require("./colors");

/**
 * ADD NEW COMMANDS HERE!
 *
 * 1. Create the command with JSDoc-style comment here.
 * 2. Add to "scripts" of package.json at root level.
 *
 * NOTE: Include a JSDoc-style comment with the following properties...
 * command - The name of the npm script in package.json
 * description - Displayed in the help command.
 *
 * Use 'npm run help' to see a list of commands.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 */

/**
 * @command init
 * @description Initializes the project files.
 */
exports.INIT = [
  `echo ${c.Yellow}[INIT] ${c.Cyan}Initializing project files...${c.Reset}`,
  `echo \n${c.Cyan}Creating files from templates...${c.Reset}`,
  "node scripts/createFromTemplates",
  `echo \n${c.Cyan}Installing frontend packages...${c.Reset}`,
  "cd frontend",
  "npm i",
  `echo \n${c.Cyan}Installing backend packages...${c.Reset}`,
  "cd ../backend",
  "npm i",
  `echo \n${c.Cyan}Get Started Coding!${c.Reset}`,
  `echo \n${c.Yellow}Use ${c.White}npm run help ${c.Yellow}for a list of commands.${c.Reset}`,
  `echo ${c.Aqua}Use ${c.White}npm run up ${c.Aqua}to start the servers.${c.Reset}`,
];

/**
 * @command up
 * @description Starts docker containers.
 */
exports.DOCKER_UP = [
  `echo ${c.Yellow}[UP] ${c.Cyan}Starting containers...${c.Reset}\n`,
  "docker compose up -d",
];

/**
 * @command down
 * @description Stops docker containers.
 */
exports.DOCKER_DOWN = [
  `echo ${c.Yellow}[DOWN] ${c.Cyan}Stopping containers...${c.Reset}\n`,
  "docker compose down",
];

/**
 * @command prune
 * @description Stops and removes docker containers, images and volumes.
 */
exports.DOCKER_PRUNE = [
  `echo ${c.Yellow}[PRUNE] ${c.Cyan}Stopping and removing docker containers, images and volumes...${c.Reset}\n`,
  "docker compose down --rmi all --volumes",
];

/**
 * @command toggle-dev
 * @description Toggles local development/production modes.
 */
exports.TOGGLE_DEV = [
  `echo ${c.Yellow}[TOGGLE-DEV] ${c.Cyan}Toggling local dev/prod mode...${c.Reset}`,
  "node scripts/toggleDevelopmentMode",
  `echo \n${c.Cyan}Rebuilding frontend and backend...${c.Reset}`,
  "docker rm --force frontend",
  "docker rm --force backend",
  "docker rmi --force react-express-postgres-frontend",
  "docker rmi --force react-express-postgres-backend",
  "docker compose up -d frontend backend",
];

/**
 * @command npm-refresh
 * @description Removes existing node_modules and reinstalls packages.
 */
exports.NPM_REFRESH = [
  `echo ${c.Yellow}[NPM-REFRESH] ${c.Cyan}Reinstalling packages...${c.Reset}`,
  `echo \n${c.Cyan}Frontend...${c.Reset}`,
  "cd frontend",
  "rm -rf node_modules",
  "npm i",
  `echo \n${c.Cyan}Backend...${c.Reset}`,
  "cd ../backend",
  "rm -rf node_modules",
  "npm i",
];

/**
 * @command npm-refresh:f
 * @description Removes existing frontend node_modules and reinstalls packages.
 */
exports.NPM_REFRESH_FRONTEND = [
  `echo ${c.Yellow}[NPM-REFRESH] ${c.Cyan}Reinstalling frontend packages...${c.Reset}`,
  "cd frontend",
  "rm -rf node_modules",
  "npm i",
];

/**
 * @command npm-refresh:b
 * @description Removes existing backend node_modules and reinstalls packages.
 */
exports.NPM_REFRESH_BACKEND = [
  `echo ${c.Yellow}[NPM-REFRESH] ${c.Cyan}Reinstalling backend packages...${c.Reset}`,
  "cd backend",
  "rm -rf node_modules",
  "npm i",
];

/**
 * @command rebuild
 * @description Removes containers and images and re-creates them.
 */
exports.REBUILD = [
  `echo ${c.Yellow}[REBUILD] ${c.Cyan}Rebuilding all services...${c.Reset}`,
  "docker rm --force frontend",
  "docker rm --force backend",
  "docker rm --force database",
  "docker rmi --force react-express-postgres-frontend",
  "docker rmi --force react-express-postgres-backend",
  "docker rmi --force react-express-postgres-database",
  "docker compose up -d",
];

/**
 * @command rebuild:f
 * @description Removes frontend container and image and re-creates them.
 */
exports.REBUILD_FRONTEND = [
  `echo ${c.Yellow}[REBUILD] ${c.Cyan}Rebuilding frontend...${c.Reset}`,
  "docker rm --force frontend",
  "docker rmi --force react-express-postgres-frontend",
  "docker compose up -d frontend",
];

/**
 * @command rebuild:b
 * @description Removes backend container and image and re-creates them.
 */
exports.REBUILD_BACKEND = [
  `echo ${c.Yellow}[REBUILD] ${c.Cyan}Rebuilding backend...${c.Reset}`,
  "docker rm --force backend",
  "docker rmi --force react-express-postgres-backend",
  "docker compose up -d backend",
];

/**
 * @command dep-versions
 * @description Check for the latest versions of each dependency/package.
 */
exports.DEP_VERSIONS = [
  `echo ${c.Yellow}[DEPENDENCIES] ${c.Cyan}Checking for latest ${c.LBlue}frontend ${c.Cyan}dependency versions...${c.Reset}`,
  "node scripts/checkDepVersions frontend",
  `echo \n\n${c.Yellow}[DEPENDENCIES] ${c.Cyan}Checking for latest ${c.LBlue}backend ${c.Cyan}dependency versions...${c.Reset}`,
  "node scripts/checkDepVersions backend",
];
