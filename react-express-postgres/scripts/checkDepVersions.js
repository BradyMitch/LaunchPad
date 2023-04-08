const https = require("https");
const path = require("path");
const { colors: c } = require("../utils");

// Command line arg specified path to the package.json file.
const directoryPath = process.argv[2] || ".";

// Read the package.json file and get the list of dependencies and devDependencies.
const packageJson = require(path.join("..", directoryPath, "package.json"));
const dependencies = Object.keys(packageJson.dependencies);
const devDependencies = Object.keys(packageJson.devDependencies);

// Check the latest version of each dependency.
const checkVersions = async (dependencyList) => {
  let updatableDeps = 0;
  const dependenciesToUpdate = []; // New array to hold dependencies to update
  // Loop through the list of dependencies.
  for (let i = 0; i < dependencyList.length; i++) {
    // Get the name of the dependency and the URL of its latest version.
    const dep = dependencyList[i];
    const url = `https://registry.npmjs.org/${dep}/latest`;

    // Make an HTTP request to get the latest version of the dependency.
    try {
      const data = await new Promise((resolve, reject) => {
        https.get(url, (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            resolve(data);
          });
          res.on("error", (error) => {
            reject(error);
          });
        });
      });

      // When the response ends, parse the data as JSON and compare the current and latest versions.
      const latestVersion = JSON.parse(data).version;
      const currentVersion =
        dependencyList === dependencies
          ? packageJson.dependencies[dep]
          : packageJson.devDependencies[dep];
      let color = c.Reset;
      let versionType = "";

      // Determine the color and version type based on the
      // difference between the current and latest versions.
      if (latestVersion !== currentVersion) {
        updatableDeps += 1;
        const currentParts = currentVersion.split(".");
        const latestParts = latestVersion.split(".");
        if (currentParts[0] !== latestParts[0]) {
          color = c.Pink;
          versionType = "Major";
        } else if (currentParts[1] !== latestParts[1]) {
          color = c.Yellow;
          versionType = "Minor";
        } else {
          color = c.Lime;
          versionType = "Patch";
        }

        // Add the dependency and its latest version to the new array
        dependenciesToUpdate.push(`${dep}@latest`);
        // Output the current and latest versions of the dependency.
        console.log(
          `${c.Aqua}${dep}${c.Reset} - ${c.White}Current:${c.Reset} ${currentVersion}, ${c.White}Latest:${c.Reset} ${color}${latestVersion}${c.Reset} (${versionType})`
        );
      }
    } catch (error) {
      console.error(`Error checking ${dep}: ${error.message}`);
    }
  }
  if (updatableDeps === 0) console.log(`${c.Lime}No updates found.${c.Reset}`);
  else {
    const isDevDeps = dependencyList === devDependencies;
    // Output the npm install command with all the new versions.
    console.log(
      `\n\nRun ${c.Cyan}npm i${
        isDevDeps ? " -D" : ""
      } ${dependenciesToUpdate.join(" ")}${
        c.Reset
      } in the correct directory to update the dependencies.`
    );
  }
};

(async () => {
  console.log(`\n\nDependencies:`);
  await checkVersions(dependencies);
  console.log(`\n\nDev Dependencies:`);
  await checkVersions(devDependencies);
})();
