const fs = require('fs-extra');
const path = require('path');
const untildify = require('untildify');
const url = require('url');

module.exports = {

  resolvePath: target => {

    return path.resolve(untildify(target));

  },

  writeFile: async (target = '', file) => {

    let result = false;

    if (target && file) {

      try {

        await fs.outputFile(target, file);

        result = true;

      } catch (err) {

        console.error(err);

        result = false;

      }

    }

    return result;

  },

  validate: (uri) => {

    const parsed = url.parse(uri);

    return ( !! (parsed.protocol && parsed.protocol.length));

  },

  joinPaths: (... paths) => {

    return path.join(... paths);

  },

}
