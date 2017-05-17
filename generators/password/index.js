'use strict';
const Generator = require('yeoman-generator');
const fs = require('fs');
const path = require('path');


module.exports = class extends Generator {
  prompting() {
    const promptObj = require('../prompt')(this);

    return this.prompt(promptObj.authentication).then(props => {
      props.auth = promptObj.generatePassword(props.username, props.password);
      this.props = props;
    });
  }

  updateFile() {
    const auth = this.props.auth;
    const configFile = path.join(this.destinationRoot(), '.sn-config.json');

    fs.readFile(configFile, 'UTF-8', function (err, content) {
      let config = JSON.parse(content);
      config.auth = auth;
      fs.writeFile(configFile, JSON.stringify(config, null, 4), null);
    });

  }

};
