module.exports = {
  test: /\.scss$/,

  module: {
    rules: [
      {
        use: [
          {
            loader: " style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into Common JS
          },
          {
            loader: " sass - loader ", // compiles Sass to CSS
          },
        ],
      },
    ],
  },
};