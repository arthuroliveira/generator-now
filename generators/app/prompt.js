/**
 * Created by arthur.oliveira on 5/16/17.
 */
module.exports = function (app, folders) {
  this.choices = [
    {
      type: "checkbox",
      name: "folders",
      message: "What record types do you want to pull from?",
      choices: folders,
      paginated: true
    },
    {
      type: 'string',
      name: 'projectName',
      message: 'What\'s the project name?',
      default: app.appname
    },
    {
      type: "input",
      name: "host",
      message: "Enter servicenow instance name (\<instance\>.service-now.com). "
    },
    {
      type: "input",
      name: "project_prefix",
      message: "Enter your project prefix (e.g. ProjectName__). "
    },
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
  return this;
};



