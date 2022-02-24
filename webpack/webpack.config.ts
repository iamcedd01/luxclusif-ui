const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.ts');

module.exports = (envVars: any) => {
    const { env } = envVars;
    const envConfig = require(`./webpack.${env}.ts`);
    const config = merge(commonConfig, envConfig);
    return config;
};
