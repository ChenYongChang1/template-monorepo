const path = require("path");
const resolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs");
// const alias = require("@rollup/plugin-alias");
const { readdirSync, statSync } = require("fs");
const PACKAGES = "packages";

const packageDirs = readdirSync(path.resolve(__dirname, PACKAGES)).filter(
  (dir) => {
    return statSync(path.resolve(__dirname, PACKAGES, dir)).isDirectory();
  }
);
// const externalList = packageDirs.map((pkg) => {
//   const pkgJson = require(path.resolve(
//     __dirname,
//     PACKAGES,
//     pkg,
//     "package.json"
//   ));
//   return {
//     find: pkgJson.name,
//     replacement: path.resolve(
//       __dirname,
//       path.resolve(__dirname, pkgJson.buildOptions.path)
//     )
//   };
// });

const configs = packageDirs.map((packageDir) => {
  const pkgJson = require(path.resolve(
    __dirname,
    PACKAGES,
    packageDir,
    "package.json"
  ));
  const input = path.resolve(__dirname, PACKAGES, packageDir, pkgJson.main);
  return {
    input,
    output: {
      file: path.resolve(__dirname, pkgJson.buildOptions.path),
      format: "esm",
      sourcemap: false
    },
    plugins: [
      resolve(),
      commonjs()
    ],
    external: []
  };
});

module.exports = configs;
