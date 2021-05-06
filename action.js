const core = require('@actions/core');
const github = require('@actions/github');

const endpoint = "teamwork.com/projects/api/v3/notebooks/"
let url = "https://" + core.getInput(domain) + "." + endpoint + core.getInput('notebook_id') + '.json';

var xhrGet = new XMLHttpRequest();
xhrGet.withCredentials = true;

xhrGet.onreadystatechange = function () {
  if (xhrGet.readyState === 4) {
    console.log(xhrGet.status);
    console.log(xhrGet.response);
  }
};

// Send GET request to get the current contents of the notebook
xhrGet.open("GET", url);
xhrGet.setRequestHeader("Authorization", "Basic dHdwX3Vxd2J6ZEg3YUh4NGtveGlMQ05uOXN6RzV3SFk6MQ==");
xhrGet.setRequestHeader("Accept", "application/json");
xhrGet.setRequestHeader("Content-Type", "application/json");
xhrGet.send();

// Send PATCH request to append the new release tag to the notebook
var xhrPatch = new XMLHttpRequest();
xhrPatch.withCredentials = true;

xhrPatch.onreadystatechange = function () {
  if (xhrGet.readyState === 4) {
    console.log(xhrPatch.status);
    console.log(xhrPatch.response);
  }
};

xhrPatch.open("PATCH", url);
xhrPatch.setRequestHeader("Authorization", "Basic dHdwX3Vxd2J6ZEg3YUh4NGtveGlMQ05uOXN6RzV3SFk6MQ==");
xhrPatch.setRequestHeader("Accept", "application/json");
xhrPatch.setRequestHeader("Content-Type", "application/json");

var data = `{
  "notebook": {
    "newVersion": true,
    "contents": "
    <div><div><h1 data-ot-auto-id=\"true\" id=\"version-104-released-in-february-8-2021\"><span style=\"font-size: 20pt;\"><span style=\"color: rgb(0, 0, 0);\"><span style=\"background-color: transparent;\">Version ${github.context.ref} - Released on ${(new Date()).toDateString()}</span></span></span></h1>
    <table><tbody><tr><td style=\"border-color: rgb(0, 0, 0); border-style: solid; border-width: 1pt; padding: 5pt;\"><p><strong><span style=\"font-size: 11pt;\"><span style=\"color: rgb(0, 0, 0);\"><span style=\"background-color: transparent;\">Update</span></span></span></strong></p></td><td style=\"border-color: rgb(0, 0, 0); border-style: solid; border-width: 1pt; padding: 5pt;\"><p><strong><span style=\"font-size: 11pt;\"><span style=\"color: rgb(0, 0, 0);\"><span style=\"background-color: transparent;\">Author</span></span></span></strong></p></td></tr><tr><td style=\"border-color: rgb(0, 0, 0); border-style: solid; border-width: 1pt; padding: 5pt;\"><p><span style=\"font-size: 11pt;\"><span style=\"color: rgb(0, 0, 0);\"><span style=\"background-color: transparent;\">Fix in events not showing date of, addition of alert bar</span></span></span></p></td><td style=\"border-color: rgb(0, 0, 0); border-style: solid; border-width: 1pt; padding: 5pt;\"><p><span style=\"font-size: 11pt;\"><span style=\"color: rgb(0, 0, 0);\"><span style=\"background-color: transparent;\">Julie, Audrey, Bob</span></span></span></p></td></tr></tbody></table>",
  }
}`;

xhrPatch.send(data);
