'use strict';
var Generator = require('yeoman-generator');
const choices = [
  {
    type: "input",
    name: "username",
    message: "Enter servicenow username. "
  },
  {
    type: "password",
    message: "Enter your servicenow password. ",
    name: "password"
  }
];

module.exports = class extends Generator {
  prompting() {
    const promptObj = require('../prompt')(this);
    return this.prompt(promptObj.folders).then(props => {
      props.folders = promptObj.selectFoders(props.folders);
      this.props = props;
    });
  }

  updateConfig() {
    console.log('Updating Config');
  }
};
