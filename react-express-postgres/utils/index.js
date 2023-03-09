/**
 * Use an index file in any directory to export components of the directory.
 * In other directories, you can import from the utils directory like so:
 * const { colors, commands } = require("./utils");
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 */

exports.colors = require("./colors");
exports.commands = require("./commands");
