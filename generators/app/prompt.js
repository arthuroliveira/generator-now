/**
 * Created by arthur.oliveira on 5/16/17.
 */


var widgets_obj = {
  "widget_client": {
    "table": "sp_widget",
    "key": "id",
    "field": "client_script",
    "extension": "js"
  },
  "widget_css": {
    "table": "sp_widget",
    "key": "id",
    "field": "css",
    "extension": "scss"
  },
  "widget_html": {
    "table": "sp_widget",
    "key": "id",
    "field": "template",
    "extension": "html"
  },
  "widget_server": {
    "table": "sp_widget",
    "key": "id",
    "field": "script",
    "extension": "js"
  }
};

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

  this.selection = function (selection) {
    var initialObj = {};
    if (selection.indexOf('sp_widgets') != -1)
      initialObj = widgets_obj;

    return {}
  };

  return this;
};



