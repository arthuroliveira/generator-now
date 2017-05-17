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
    return this.prompt(choices).then(props => {
      this.props = props;
    });
  }
};
