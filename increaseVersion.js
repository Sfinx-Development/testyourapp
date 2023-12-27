const { withExpo } = require("@expo/config-plugins");

module.exports = withExpo((config) => {
  config.android.config.versionCode += 1;
  return config;
});
