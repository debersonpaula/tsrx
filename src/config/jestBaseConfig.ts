// tslint:disable: no-eval
export default function (source: string) {
  return {
    testMatch: [`<rootDir>/${source}/**/*.test.{js,jsx,ts,tsx}`],
    transform: JSON.stringify({
      '^.+\\.(js|jsx|ts|tsx)$': eval(
        `require.resolve('./addons/babelTransform')`,
      ),
      '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': eval(
        `require.resolve('./addons/fileTransform')`,
      ),
    }),
    clearMocks: true,
    collectCoverage: true,
    coverageReporters: ['json', 'html', 'lcovonly', 'cobertura'],
    collectCoverageFrom: [`${source}/**/*.{ts,tsx}`, `!${source}/**/*.d.ts`],
    coverageThreshold: JSON.stringify({
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    }),

    moduleFileExtensions: ['ts', 'tsx', 'js'],
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': eval(
        `require.resolve('./addons/fileMock')`,
      ),
      '\\.(css)$': eval(`require.resolve('./addons/styleMock')`),
    },
    setupFiles: [eval(`require.resolve('./addons/test-setup')`)],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    verbose: true,
    reporters: [
      'default',
      [
        'jest-junit',
        { outputDirectory: './coverage', outputName: './junit.xml' },
      ],
    ],
    transformIgnorePatterns: [
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
      '^.+\\.module\\.(css|sass|scss)$',
    ],
  };
}
