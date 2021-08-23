import TerserPlugin = require('terser-webpack-plugin');

export const terserConfigPlugin = () => {
  return new TerserPlugin({
    terserOptions: {
      // parse: {
      //   // We want terser to parse ecma 8 code. However, we don't want it
      //   // to apply any minification steps that turns valid ecma 5 code
      //   // into invalid ecma 5 code. This is why the 'compress' and 'output'
      //   // sections only apply transformations that are ecma 5 safe
      //   // https://github.com/facebook/create-react-app/pull/4234
      //   ecma: 8,
      // },
      // compress: {
      //   ecma: 5,
      //   warnings: false,
      //   // Disabled because of an issue with Uglify breaking seemingly valid code:
      //   // https://github.com/facebook/create-react-app/issues/2376
      //   // Pending further investigation:
      //   // https://github.com/mishoo/UglifyJS2/issues/2011
      //   comparisons: false,
      //   // Disabled because of an issue with Terser breaking valid code:
      //   // https://github.com/facebook/create-react-app/issues/5250
      //   // Pending further investigation:
      //   // https://github.com/terser-js/terser/issues/120
      //   inline: 2,
      // },
      // output: {
      //   ecma: 5,
      //   comments: false,
      //   // Turned on because emoji and regex is not minified properly using default
      //   // https://github.com/facebook/create-react-app/issues/2488
      //   ascii_only: true,
      // },
      // mangle: {
      //   keep_fnames: true,
      //   keep_classnames: true,
      // },
      keep_fnames: true,
      keep_classnames: true,
    },
  });
};
