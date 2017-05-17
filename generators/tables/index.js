'use strict';
var Generator = require('yeoman-generator');
const fs = require('fs');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    const promptObj = require('../prompt')(this);

    return this.prompt(promptObj.folders).then(props => {
      props.folders = promptObj.selectFoders(props.folders);
      this.props = props;
    });
  }

  updateFile() {
    const folders = this.props.folders;
    const configFile = path.join(this.destinationRoot(), '.sn-config.json');

    fs.readFile(configFile, 'UTF-8', function (err, content) {
      let config = JSON.parse(content);
      config.folders = JSON.parse(folders);

      console.log(config);

      fs.writeFile(configFile, JSON.stringify(config, null, 4), null);
    });
  }
};
