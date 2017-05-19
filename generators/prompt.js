'use strict';
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

  var obj = {};
  let projectPrefix = "";

  obj.choices = [
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
          projectPrefix = input + "-";
        }
        return true;
      }
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
      type: "list",
      name: "app_dir",
      message: "Where would you like to download files to?",
      choices: ["dist", "RootDirectory", "other"]
    },
    {
      type: "input",
      name: "custom_app_dir",
      message: "Enter folder name",
      validate: function (input) {
        return input != ""
      },
      when: function (answers) {
        return answers.app_dir == "other"
      }
    },
    {
      type: 'string',
      name: 'libs',
      message: 'Libraries used (separated by comma)'
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

  obj.folders = [{
    type: "checkbox",
    name: "folders",
    message: "What tables are you going to be working with?",
    choices: Object.keys(tablesData),
    paginated: true
  }];

  obj.authentication = [{
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

  obj.selectFoders = function (selection) {
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

  obj.selectLibs = function (libs) {
    libs = libs.trim();

    if (libs == "") {
      libs = []
    } else {
      libs = libs.split(',');
    }
    return JSON.stringify(libs)
  };

  obj.selectDist = function (answers) {
    if (answers.app_dir == "dist")
      return answers.app_dir;

    if (answers.app_dir == "other")
      return answers.custom_app_dir;

    return "";
  };


  obj.generatePassword = function (username, password) {
    return new Buffer(username + ':' + password).toString('base64');
  };

  return obj;
};



