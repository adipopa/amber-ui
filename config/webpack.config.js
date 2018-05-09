const chalk = require("chalk");
const fs = require('fs');
const path = require('path');

const useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

const env = process.env.IONIC_ENV;

const appPaths = {
  "@app": path.resolve('./src/app/'),
  "@assets": path.resolve('./src/assets/'),
  "@environment": path.resolve(environmentPath()),
  "@pages": path.resolve('./src/pages/'),
  "@components": path.resolve('./src/components/'),
  "@models": path.resolve('./src/models/'),
  "@services": path.resolve('./src/services/'),
  "@interceptors": path.resolve('./src/interceptors/'),
};

if (env === 'prod' || env === 'dev') {
  useDefaultConfig[env].resolve.alias = appPaths;
} else {
  // Default to dev config
  useDefaultConfig[env] = useDefaultConfig.dev;
  useDefaultConfig[env].resolve.alias = appPaths;
}

function environmentPath() {
  const filePath = './src/environments/environment' + (env === 'prod' ? '.' + env : '') + '.ts';
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red('\n' + filePath + ' does not exist!'));
  } else {
    return filePath;
  }
}

module.exports = function () {
  return useDefaultConfig;
};
