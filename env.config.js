const environment = process.env.NODE_ENV || 'local';
const config = require(`./environments/${environment}/env.config.js`);
module.exports = config;
