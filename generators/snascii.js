'use strict';

const chalk = require('chalk');
const test =
  chalk.red('            .://:.             \n')+
  chalk.red('            //////`            \n')+
  chalk.red('   `---.`   //////`  `.-:-`    \n')+
  chalk.red('  -//////`  //////` `//////-   \n')+
  chalk.red(' ://////-   //////`  -//////:  \n')+
  chalk.red('.//////.    //////`   .//////. \n')+
  chalk.red('://///:     //////`    ://///: \n')+
  chalk.red('//////-     //////`    -////// \n')+
  chalk.red('://///:     -////:     ://///: \n')+
  chalk.red('.//////.     `..`     .//////. \n')+
  chalk.red(' ://////-            .//////:  \n')+
  chalk.red('  :///////-.`    `.-://////:   \n')+
  chalk.red('   .//////////////////////-    \n')+
  chalk.red('     .:////////////////:.      \n')+
  chalk.red('       `.-:::////::--.`        \n');

module.exports = {
  print :function () {
    console.log(test)
  }
};
