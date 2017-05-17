'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const slugify = require('slugify');
const tablesData = require('./data/tables');

module.exports = class extends Generator {

  prompting() {
    const initPrompt = require('./prompt')(this, Object.keys(tablesData));

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fabulous ' + chalk.red('generator-now') + ' generator!'
    ));

    return this.prompt(initPrompt.choices).then(props => {
      // To access props later use this.props.someAnswer;
      props.projectName = slugify(props.projectName);
      props.folders = {
        script_includes: {
          table: "sys_script_include",
          key: "name",
          field: "script",
          extension: "js"
        },
        themes: {
          table: "sp_theme",
          key: "name",
          field: "css_variables",
          extension: "scss"
        }
      };
      props.folders = JSON.stringify(props.folders);
      this.props = props;
    });
  }

  writing() {

    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationPath('client'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('.sn-config.json'),
      this.destinationPath('client/.sn-config.json'),
      this.props
    );

  }

  install() {
    // this.installDependencies({
    //   bower: false,
    //   npm: true
    // });
  }
};
