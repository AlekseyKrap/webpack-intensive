// 1. ✓ webpack
// 2. webpack-dev-server (express + webpack-dev-middleware + много хелперов)
// 3. webpack-hot-middleware
// 4. ✓ конфигурация ⚙️
// 5. ✓ создать компайлер webpack
// 6. ✓ запуск 🚀

// Core
const webpack = require('webpack');
const chalk = require('chalk'); // Раскрашивает консоль

// Config
const getConfig = require('./webpack.config');

const compiler = webpack(getConfig());