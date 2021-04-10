const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack/common');

module.exports = (_env, { mode }) => {
    const properlyConfig = require(`./webpack/${mode}`);
    return merge(commonConfiguration, properlyConfig);
}