'use strict';
const Generator = require('yeoman-generator');
const slugify = require('slugify');
const snAscii = require('../snascii');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('command', {type: String, required: false});
    this.promptObj = require('../prompt')(this);
  }

  prompting() {
    if (this.options.command == 'password') {
      return this._printPassword();
    }

    return this._processStandard();
  }

  writing() {
    if (this.processFile) {
      this.fs.copyTpl(this.templatePath('_sn-config.json'), this.destinationPath('.sn-config.json'), this.props);
      this.fs.copyTpl(this.templatePath('_gitignore'), this.destinationPath('.gitignore'), this.props);
      this.fs.copyTpl(this.templatePath('Gruntfile.js'), this.destinationPath('Gruntfile.js'), this.props);
      this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this.props);
    }

  }

  install() {
    if (this.processFile) {

      this.installDependencies({
        bower: false,
        yarn: false,
        npm: true
      });
    }
  }

  _processStandard() {
    snAscii.print();

    const promptObj = this.promptObj;
    return this.prompt(promptObj.choices).then(props => {
      // To access props later use this.props.someAnswer;
      props.projectName = slugify(props.projectName);
      props.folders = promptObj.selectFoders(props.folders);
      props.folders_key = Object.keys(JSON.parse(props.folders));
      props.auth = promptObj.generatePassword(props.username, props.password);
      props.libs = promptObj.selectLibs(props.libs);
      props.dist = promptObj.selectDist(props);
      props.project_prefix = props.project_prefix || "";
      props.scope = props.scope || "";
      this.props = props;
      this.processFile = true;
    });
  }

  _printPassword() {
    const promptObj = this.promptObj;
    return this.prompt(promptObj.authentication).then(props => {
      console.log(promptObj.generatePassword(props.username, props.password));
    });
  }
};
