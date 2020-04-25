export const babelOverrides = () => {
  return [
    {
      test: /\.tsx?$/,
      plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
    },
  ];
};
