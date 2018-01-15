module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      {
        test:/\.s?css$/,
        loader: ["style-loader", "css-loader"]
      }
    ],
  },
};

// module.exports = require('../webpack.config.js');