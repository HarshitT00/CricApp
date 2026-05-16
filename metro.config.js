const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
// FIXED: Using the absolute path to your library folder to avoid path resolution issues
const libraryRoot = '/Users/harshit/Projects/react-native-facerecognition';

const config = getDefaultConfig(projectRoot);

config.watchFolders = [projectRoot, libraryRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(libraryRoot, 'node_modules'),
];

config.resolver.extraNodeModules = {
  'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
  'react': path.resolve(projectRoot, 'node_modules/react'),
};

module.exports = config;