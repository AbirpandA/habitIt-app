module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // NativeWind Babel plugin - transforms className props to style objects
      ["nativewind/babel"],
    ],
  };
};
