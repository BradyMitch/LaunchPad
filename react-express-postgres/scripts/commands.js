const c = require("./colors");

/**
 * @command up
 * @description Starts docker containers.
 */
exports.DOCKER_UP = [
  `echo ${c.Yellow}[UP] ${c.Lime}Starting containers...${c.Reset}`,
  "docker compose up -d",
];

/**
 * @command down
 * @description Stops docker containers.
 */
exports.DOCKER_DOWN = [
  `echo ${c.Yellow}[DOWN] ${c.Lime}Stopping containers...${c.Reset}`,
  "docker compose down",
];

/**
 * @command prune
 * @description Stops and removes docker containers, images and volumes.
 */
exports.DOCKER_PRUNE = [
  `echo ${c.Yellow}[PRUNE] ${c.Lime}Stopping and removing docker containers, images and volumes...${c.Reset}`,
  "docker compose down --rmi all --volumes --remove-orphans",
];
