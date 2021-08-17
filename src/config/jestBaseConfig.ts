import type { Config } from '@jest/types';

export default function (source: string): Config.Argv {
  return {
    _: [],
    $0: '',
    roots: [`<rootDir>/${source}`],
    testMatch: [`<rootDir>/${source}/**/*.test.{js,jsx,ts,tsx}`],
    transform: JSON.stringify({
      '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': require.resolve(
        './addons/babelTransform',
      ),
      '^.+\\.css$': require.resolve('./addons/cssTransform'),
      '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': require.resolve(
        './addons/fileTransform',
      ),
    }),
    collectCoverage: true,
    coverageReporters: ['json', 'html', 'lcovonly', 'cobertura'],
    collectCoverageFrom: [
      `${source}/**/*.{js,jsx,ts,tsx}`,
      `!${source}/**/*.d.ts`,
    ] as any,
    moduleFileExtensions: [
      'web.js',
      'js',
      'web.ts',
      'ts',
      'web.tsx',
      'tsx',
      'json',
      'web.jsx',
      'jsx',
      'node',
    ],
    transformIgnorePatterns: [
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
      '[/\\\\]dist[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
      '^.+\\.module\\.(css|sass|scss)$',
    ],
    testEnvironment: 'jsdom',
    modulePaths: [],
    resetMocks: true,
  };
}
