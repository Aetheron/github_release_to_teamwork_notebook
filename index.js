const core = require('@actions/core');
const github = require('@actions/github');

const endpoint = "teamwork.com/projects/api/v3/notebooks/"
let url = "https://" + core.getInput('domain') + "." + endpoint + core.getInput('notebook_id') + '.json';

// Send GET request to get the current contents of the notebook
let getHeaders = new Headers();
getHeaders.append("Authorization", `Basic ${core.getInput('api_key')}`);
getHeaders.append("Accept", "application/json");
getHeaders.append("Content-Type", "application/json");

const opts = {
  method: 'GET',
  headers: getHeaders,
  redirect: 'follow'
};

fetch(url, opts)
  .then(response => response.json())
  .then(data => console.log(data));

// Send PATCH request to append the new release tag to the notebook
let patchHeaders = new Headers();
patchHeaders.append("Authorization", `Basic ${core.getInput('api_key')}`);
patchHeaders.append("Accept", "application/json");
patchHeaders.append("Content-Type", "application/json");

let data = `{
  "notebook": {
    "newVersion": true,
    "contents": "
    <div><div><h1 data-ot-auto-id=\"true\" id=\"version-104-released-in-february-8-2021\"><span style=\"font-size: 20pt;\"><span style=\"color: rgb(0, 0, 0);\"><span style=\"background-color: transparent;\">Version ${github.context.ref} - Released on ${(new Date()).toDateString()}</span></span></span></h1>
    <table><tbody><tr><td style=\"border-color: rgb(0, 0, 0); border-style: solid; border-width: 1pt; padding: 5pt;\"><p><strong><span style=\"font-size: 11pt;\"><span style=\"color: rgb(0, 0, 0);\"><span style=\"background-color: transparent;\">Update</span></span></span></strong></p></td><td style=\"border-color: rgb(0, 0, 0); border-style: solid; border-width: 1pt; padding: 5pt;\"><p><strong><span style=\"font-size: 11pt;\"><span style=\"color: rgb(0, 0, 0);\"><span style=\"background-color: transparent;\">Author</span></span></span></strong></p></td></tr><tr><td style=\"border-color: rgb(0, 0, 0); border-style: solid; border-width: 1pt; padding: 5pt;\"><p><span style=\"font-size: 11pt;\"><span style=\"color: rgb(0, 0, 0);\"><span style=\"background-color: transparent;\">Fix in events not showing date of, addition of alert bar</span></span></span></p></td><td style=\"border-color: rgb(0, 0, 0); border-style: solid; border-width: 1pt; padding: 5pt;\"><p><span style=\"font-size: 11pt;\"><span style=\"color: rgb(0, 0, 0);\"><span style=\"background-color: transparent;\">Julie, Audrey, Bob</span></span></span></p></td></tr></tbody></table>",
  }
}`;

const opts = {
  method: 'PATCH',
  headers: patchHeaders,
  redirect: 'follow',
  body: data,
};

fetch(url, opts)
  .then(response => response.json())
  .then(data => console.log(data));
