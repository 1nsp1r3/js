export default {
  entry: "./src/main.js",
  mode: "production",
  experiments: {
    outputModule: true,
  },
  output: {
    library: {
      type: "module",
    },
    filename: "lib.storage.min.mjs",
  },
}
