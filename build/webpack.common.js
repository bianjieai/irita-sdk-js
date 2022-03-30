const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const root = path.resolve(`${__dirname}/..`);
const srcRoot = `${root}/src`;
const production = (process.env.NODE_ENV === 'production');

module.exports = {
    entry: `${srcRoot}/index.ts`,
    output: {
        path: `${root}/dist`,
        filename: 'index.js',
        library: 'irishub-sdk',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
          "buffer": false,
          "stream": false,
        },
    },
    externals: {
      bufferutil: "bufferutil",
      "utf-8-validate": "utf-8-validate",
    },
    module: {
        rules: [{
            test: /\.ts$/,
            include: [srcRoot],
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        compact: false,
                        presets: [
                            '@babel/preset-typescript',
                            ['@babel/preset-env', {
                                targets: {
                                    chrome: '73',
                                    ie: '11',
                                    firefox: '66',
                                    safari: '12'
                                }
                            }]
                        ]
                    }
                }
            ]
        }]
    }
};
