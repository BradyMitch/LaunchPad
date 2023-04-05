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
  // Loop through the list of dependencies.
  for (let i = 0; i < dependencyList.length; i++) {
    // Get the name of the dependency and the URL of its latest version.
    const dep = dependencyList[i];
    const url = `https://registry.npmjs.org/${dep}/latest`;

    // Make an HTTP request to get the latest version of the dependency.
    https.get(url, (res) => {
      let data = "";

      // When the response receives data, add it to the 'data' variable.
      res.on("data", (chunk) => {
        data += chunk;
      });

      // When the response ends, parse the data as JSON and compare the current and latest versions.
      res.on("end", () => {
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

          // Output the current and latest versions of the dependency.
          console.log(
            `${c.Aqua}${dep}${c.Reset} - ${c.White}Current:${c.Reset} ${currentVersion}, ${c.White}Latest:${c.Reset} ${color}${latestVersion}${c.Reset} (${versionType})`
          );
        }
      });
      res.on("error", () => {
        return;
      });
    });
  }
};

(async () => {
  await checkVersions(dependencies);
  await checkVersions(devDependencies);
})();
