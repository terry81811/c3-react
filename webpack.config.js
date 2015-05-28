module.exports = {
  entry: [
		"webpack-dev-server/client?http://localhost:3002",
		"webpack/hot/dev-server",
		"./src/index.jsx"
	],
  output: {
    path: "./build",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["react-hot", "babel-loader?stage=0&optional=runtime"] },
    ]
  }
};
