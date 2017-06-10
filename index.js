const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname,"../app/dist")));
// var express = require("express");
// var path = require("path");
// var bodyParser = require('body-parser');
// var app = express();
console.log("came")
// serve static assets normally
app.use(express.static(__dirname + '/public'))

// Handles all routes so you do not get a not found error
app.get('*', function (request, response){
    console.log("came")
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.post('/getAllProcess', function(req, res) {
          db.cypherQuery('MATCH (n:Process) return n', function (err, result) {
      res.json(result.data);
      });
});



var neo4j = require('node-neo4j');
db = new neo4j('http://neo4j:OMSAIRAM@faith1@0.0.0.0:7474');



/*app.post('/ap1', function(req, res) {
  console.log("awesome")
  //console.log(req.data)
  console.log(req.body)
  console.log(req.body.description.BusinessUnit)
  console.log(req.body.description.Env)
  console.log(req.body.description.name)
  console.log(req.body.description.tagline)
});*/
//started my code her
/*var net = require('net');
 var HOST = '127.0.0.1'; // parameterize the IP of the Listen 
 var client = new net.Socket();
 client.connect(8081, '127.0.0.1', function() {
	console.log('Client Connected');
	//client.write('Hello, server! Love, Client.');
});
    client.on('data', function(data) {
	console.log('Received: '+ data);
	client.destroy(); // kill client after server's response
})
 var PORT = 8081; // TCP LISTEN port
 // Create an instance of the Server and waits for a conexão 
 net.createServer(function(sock) { 
     // Receives a connection - a socket object is associated to the connection automatically 
     console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
  // Add a 'data' - "event handler" in this socket instance 
   
  sock.on('data', function(data) { 
        outData = data.toString('utf8');
      // data was received in the socket 
     console.log ("Socketmessage: " + outData);
      // Writes the received message back to the socket (echo) 
      sock.write(data); });
       // Add a 'close' - "event handler" in this socket instance 
  
       sock.on('close', function(data) { 
           // closed connection 
           console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort); 
        }); 
    }).listen(PORT, HOST); 
           console.log('Server listening on ' + HOST +':'+ PORT);*/



///ended my code here

//This will be called from the frontend and will be used to create process node.
app.post('/defineProcess', function(req, res) {
      db.insertNode({
                    ProcessName: req.body.description.name,
                    ProcssDescription:req.body.description.tagline,
                    Department:req.body.description.BusinessUnit,
                    Owner: req.body.description.Env,
                }, 'Process', function (err, result) {
                  console.log("Process with name " + result.ProcessName + " has been created.");
                });
    res.json({ message: 'Hurrah! Process has been created' });   
});

//This will be called from Java library to create a Process instance for the Process
app.post('/creatProcessInstance', function(req, res) {
    var dateTime = new Date();
      db.insertNode({
                    ProcessName: req.body.ProcessName,
                    StartTime:dateTime,
                    EndTime: " ",
                    Status:  "Running"
                }, 'ProcessInstance', function (err, result) {
                    getProcessId(result); // This is used to get Internal Process id of the Process
                    console.log("Process Instance has been assigned to the Process");
                    res.json({ "ProcessInstanceId" : " " + result._id });
                });   
});

//This will be called from Java library to update the status of the process instance
app.post('/stopInstance', function(req, res) {
    var dateTime = new Date();
    db.cypherQuery('MATCH (n) where ID(n) = ' + req.body.ProcessInstanceId + ' SET n.Status = "Completed" return n', function (err, result) {
    });
    db.cypherQuery('MATCH (n) where ID(n) = ' + req.body.ProcessInstanceId + ' SET n.EndTime = "' + dateTime + '" return n', function (err, result) {
    });
    res.json({ message: 'ProcessInstance has stopped and updated with the logs.' });
});

// This is called to attach logs to the process instance
app.post('/creatLog', function(req, res) {
    var dateTime = new Date();
    db.insertNode({
                    ProcessInstanceId : req.body.ProcessInstanceId,
                    LogDescription: req.body.LogDescription,
                    time:req.body.dateTime
                }, 'Log', function (err, result) {
                makeRelationshipInstanceLog(result);
                console.log("Log for current Process Instance has been generated");
                });
     res.json({ message: 'hooray! Log has been created' });
});

// This is called internally to make relationship between Log and Process Instance 
function makeRelationshipInstanceLog(result){
    console.log(result.ProcessInstanceId);
    var root_node_id = result.ProcessInstanceId;
    var other_node_id = result._id;
    db.insertRelationship(other_node_id, root_node_id, 'LOGS_OF', {}, function(err, result){
    });
}

// This method will return internal process id for the process
function getProcessId(result){
    db.readNodesWithLabelsAndProperties('Process', {
        "ProcessName" : result.ProcessName
    }, function(err, node){
    if(err) throw err;
        makeRelationshipProcessInstance(node,result);
});
}

// This is called internally to make relationship between Process and Process Instance 
function makeRelationshipProcessInstance(node,result){
    var root_node_id = node[0]._id;
    var other_node_id = result._id;
    db.insertRelationship(other_node_id, root_node_id, 'INSTANCE_OF', {}, function(err, result){
    });

}

//Port on which the pplication is listening
/*app.listen(8081,function(){
    //console.log("awesome")
    console.log("Started listening on port", 8081);
})*/

app.listen(port)
console.log("server started on port " + port)

