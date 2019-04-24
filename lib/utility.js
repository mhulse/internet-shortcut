const fs = require('fs-extra');
const path = require('path');
const untildify = require('untildify');
const url = require('url');

module.exports = {

  resolvePath: target => {

    return path.resolve(untildify(target));

  },

  getUrlParts: (path, parseQueryString = false) => {

    return url.parse(path, parseQueryString);

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

  // Returns boolean:
  makeDir: async function(target = '') {

    let result = false;

    if (target.length) {

      target = this.resolvePath(target);

      try {

        await fs.ensureDir(target);

        result = true;

      } catch (err) {

        result = false;

      }

    }

    return result;

  },

  validate: function(uri) {

    const parsed = this.getUrlParts(uri);

    return ( !! (parsed.protocol && parsed.protocol.length));

  },

  joinPaths: (... paths) => {

    return path.join(... paths);

  },

}
