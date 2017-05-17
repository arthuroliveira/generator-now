/**
 * Created by arthur.oliveira on 5/16/17.
 */


const widgets_obj = {
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

const tablesData = require('./data/tables');

module.exports = function (app) {
  var projectPrefix = "";

  this.choices = [
    {
      type: "input",
      name: "instance",
      message: "Enter servicenow instance name (\<instance\>.service-now.com). "
    },
    {
      type: 'string',
      name: 'projectName',
      message: 'What\'s the project name?',
      default: app.appname,
      validate: function (input) {
        if (input) {
          projectPrefix = input + "__";
        }
        return true;
      }
    },
    {
      type: 'string',
      name: 'libs',
      message: 'Libraries used (separated by comma)'
    },
    {
      type: "input",
      name: "project_prefix",
      message: "Enter your project prefix.",
      default: function () {
        return projectPrefix;
      }
    },
    {
      type: "checkbox",
      name: "folders",
      message: "What tables are you going to be working with?",
      choices: Object.keys(tablesData),
      paginated: true
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

  this.folders = [{
    type: "checkbox",
    name: "folders",
    message: "What tables are you going to be working with?",
    choices: Object.keys(tablesData),
    paginated: true
  }]

  this.selectFoders = function (selection) {
    var initialObj = {};
    var widget_index = selection.indexOf('sp_widgets');
    if (widget_index != -1) {
      selection.splice(widget_index, 1);
      initialObj = widgets_obj;
    }


    selection.forEach(function (item) {
      initialObj[item] = tablesData[item];
    });

    return JSON.stringify(initialObj);
  };

  this.selectLibs = function (libs) {
    libs = libs.trim();

    if (libs == "") {
      libs = []
    } else {
      libs = libs.split(',');
    }
    return JSON.stringify(libs)
  };
  return this;
};



