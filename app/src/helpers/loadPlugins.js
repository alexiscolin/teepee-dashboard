const loadPlugins = (filenames) => {
  //-> https://vitejs.dev/guide/features.html#glob-import -> same as require.context in Webpack
  const pluginsList = import.meta.glob("../plugins/*.js");
  const PluginsRelPath = "../plugins/";

  // Create an object map to avoid nested loop for checking
  // each file passed against files found by import glob
  let fileMap = {};

  // Loop through files found and add them to the fileMap
  // Remove './' prefix so we can match filename found with plugin filenames
  // we want to import
  for (const filename of Object.keys(pluginsList)) {
    fileMap[filename.replace(PluginsRelPath, "")] = true;
  }

  // Loop through plugins which we want to import
  for (const filename of filenames) {
    const filenameWithExt = `${filename}.js`;

    // Cheak if a plugin is registered in filemap list
    if (Object.prototype.hasOwnProperty.call(fileMap, filenameWithExt)) {
      pluginsList[`${PluginsRelPath + filenameWithExt}`]().then((mod) => {
        try {
          mod.default(); // promise
        } catch (error) {
          throw new Error(
            `Need a default export in the plugin file.
            Module content is: "${Object.keys(mod)}"`
          );
        }
      });
    } else {
      // Throw an error if we have no match
      throw new Error(
        `No plugin found for ${filename}.
        Did you spell the plugin filename correctly?`
      );
    }
  }
};
export { loadPlugins };
