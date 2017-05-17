'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const slugify = require('slugify');

module.exports = class extends Generator {

  prompting() {
    const promptObj = require('./prompt')(this);

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fabulous ' + chalk.red('generator-now') + ' generator!'
    ));

    return this.prompt(promptObj.choices).then(props => {
      // To access props later use this.props.someAnswer;
      props.projectName = slugify(props.projectName);
      props.folders = promptObj.selectFoders(props.folders);
      props.auth = new Buffer(props.username + ':' + props.password).toString('base64');
      props.libs = promptObj.selectLibs(props.libs);
      this.props = props;
    });
  }

  writing() {

    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationRoot(),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('.sn-config.json'),
      this.destinationPath('.sn-config.json'),
      this.props
    );

  }

  install() {
    this.installDependencies({
      bower: false,
      yarn: false,
      npm: true
    });
  }
};
