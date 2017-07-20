const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
var router = express.Router();
var LocalStrategy = require('passport-local').Strategy;
const app = express()
var fs = require("fs");
var avro = require('avro-js');
var file = require("file");
var dateFormat = require('dateformat');
var lastRunDate = new Date('2013-05-23');
var scanTime = 0;
var fileList = [];

var bodyParser = require( 'body-parser' );
var dateFormat = require('dateformat');
// initialize swagger-jsdoc
var bodyParser = require('body-parser');
var neo4j = require('node-neo4j');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var subpath = express();
app.use(bodyParser());
//Passport coding Starts here...
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var neo4j = require('node-neo4j');
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/loginapp');
var db = new neo4j('http://neo4j:OMSAIRAM@faith1@0.0.0.0:7474');


//Intialize the routes
var routes = require('./routes/index');
var users = require('./routes/users');
// View Engine
app.set('common', path.join(__dirname, 'common'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', routes);
app.use('/users', users);

//Passport Coding ends here

//console.log("came")
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
app.post('/getEnvironment', function(req, res) {
          db.cypherQuery('MATCH (n:Environment) WHERE n.State = "Active" return n', function (err, result) {
      res.json(result.data);
      });
});
app.post('/getProcessInstance', function (req, res) {
    db.cypherQuery('MATCH (n:Process{ProcessName:"'+req.body.processName+'"})-[:INSTANCE_OF]-(pi:ProcessInstance) return pi', function (err, result) {
        res.json(result.data);
    });
});

app.post('/getInstanceLog', function (req, res) {
   // console.log(req.body.)
    db.cypherQuery('MATCH (n:ProcessInstance)-[:LOGS_OF]-(pi:Log) where ID(n) = '+ req.body.processInstanceId +' return pi', function (err, result) {
        console.log(err)
        res.json(result.data);
    });
});

// serve swagger
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.post('/register', function(req, res) {
    console.log(req)
   var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
		req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

console.log(name)
	var errors = req.validationErrors();
      	if(errors){
			  console.log("errors are there")
              res.json({ message: errors }); 
		
	} else {
		  db.insertNode({
                    Name :req.body.name,
	                Email : req.body.email,
	                Username : req.body.username,
	                Password : req.body.password,
	                Password2:req.body.password2
                   
                }, 'Users', function (err, result) {
                  console.log("User with name " + result.Name + " has been created.");
                });
    res.json({ message: 'User has been created' }); 
    res.redirect('/Login')
	}
   
     //res.json(result.data);
});
module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	db.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});



  app.post('/login', function(req, res) {
  
});

app.post('/getDataSetList', function(req, res) {
   db.cypherQuery('MATCH (n:DataSet) return n', function (err, result) {
            res.json(result.data);
        });
});
app.post('/dataSetNodeCreater', function(req, res) {
    
        fileList = [];
        file.walkSync("./avroFiles", function (start, dirs, names) {
            fileList.push({
                FileName: "" + names,
                path: "./" + start + "/" + names,
                time: "",
                size: ""
            });
        });
        fileList.reverse().pop();
        console.log("Last Run Time :" + lastRunDate);
        getFileDetails(fileList);
        makeNodeForAFile(fileList);
        var now = new Date();
        lastRunDate = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
        res.json(fileList);
    }
);

app.post('/getMetaData', function(req, res) {
   console.log("In meta");
        console.log(req.body.dataSetPath);
        avro.createFileDecoder(req.body.dataSetPath)
            .on('metadata', function (type) {
                res.json(type);
            })
            .on('data', function (record) {
                console.log(record);
            })
});

  app.post('/getAllBUnit', function(req, res) {
    db.cypherQuery('MATCH (n:BusinessUnit)  WHERE n.State = "Active" return n', function(err, result) {
            res.json(result.data);
        });
});
  
   
db = new neo4j('http://neo4j:OMSAIRAM@faith1@0.0.0.0:7474');

app.post('/CreateBU', function(req, res) {
    console.log(req)
    console.log("vampire")
    console.log(req.body.description)
    db.insertNode({
        Name: req.body.description,
        State: 'Active',
    }, 'BusinessUnit', function(err, result) {
        console.log("BusinessUnit with name " + result.Name + " has been created.");
    });
    res.json({ message: 'Process has been created' });
});

app.post('/DeleteBU', function(req, res) {
    console.log(req.body.description)
    db.cypherQuery('MATCH (n:BusinessUnit) Where n.Name in [ ' + req.body.description + ' ]  SET n.State = "InActive"', function(err, result) {
       
        console.log(result)
            //res.json(result.data);
    });

});

app.post('/ModifyBU', function(req, res) {
    console.log("Modify" + req.body.description)
    console.log("Old" + req.body.OldState)
    db.cypherQuery('MATCH (n:BusinessUnit) Where n.Name="' + req.body.OldState + '" SET n.Name = "' + req.body.description + '"', function(err, result) {
        console.log(err)
            //res.json(result.data);
    });

});



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
app.post('/CreateEnvironment', function(req, res) {
    console.log(req)
    console.log("vampire")
    console.log(req.body.description)
      db.insertNode({
                    Name:req.body.description,
                    State:'Active'
                   
                }, 'Environment', function (err, result) {
                  console.log("Environment with name " + result.Name + " has been created.");
                });
    res.json({ message: 'Process has been created' });   
});

    app.post('/DeleteEnvironment', function(req, res) {
        console.log("server"+req.body.description)
        db.cypherQuery('MATCH (n:Environment) Where n.Name in [ ' + req.body.description + ' ]  SET n.State = "InActive"', function(err, result) {
            
        console.log(err)
        //res.json(result.data);
    });
      
});
app.post('/ModifyEnvironment', function(req, res) {
        console.log("Modify"+req.body.description)
        console.log("Old"+req.body.OldState)
        db.cypherQuery('MATCH (n:Environment) Where n.Name="' + req.body.OldState + '" SET n.Name = "'+req.body.description+'"', function(err, result) {
        console.log(err)
        //res.json(result.data);
    });
      
});

app.post('/defineProcess', function(req, res) {
      db.insertNode({
                    ProcessName: req.body.description.name,
                    ProcssDescription:req.body.description.tagline,
                    Department:req.body.description.BusinessUnit,
                    Owner: req.body.description.Env,
                }, 'Process', function (err, result) {
                  console.log("Process with name " + result.ProcessName + " has been created.");
                });
    res.json({ message: 'Process has been created' });   
});


//This will be called from Java library to create a Process instance for the Process
app.post('/creatProcessInstance', function(req, res) {
    var dateTime = new Date();
    var dateTime = dateFormat(dateTime, "ddd mmm d yyyy HH:MM:ss o (Z)");
    db.insertNode({
        ProcessName: req.body.ProcessName,
        StartTime: dateTime,
        EndTime: " ",
        Status: "Running"
    }, 'ProcessInstance', function (err, result) {
        getProcessId(result); // This is used to get Internal Process id of the Process
        console.log("Process Instance has been assigned to the Process");
        res.json({ "ProcessInstanceId": " " + result._id });
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
function makeNodeForAFile(fileList) {
    var query = "create";
    var flag = false;
    for(i = 0; i < fileList.length; i++){
        var date = new Date(fileList[i].time);
        if(date>lastRunDate){
            flag = true;
            query += " (:DataSet {Name : '"+fileList[i].FileName+"', path : '"+fileList[i].path+"', time : '"+fileList[i].time+"' , size: '"+fileList[i].size+"'}),"
        }
    }
    if(flag){
        console.log(query);
        query = query.substring(0, query.length - 1);
        db.cypherQuery(query, function (err, result) {
            console.log(err);
        });
    }
}

function getFileDetails(fileList) {
    for (i = 0; i < fileList.length; i++) {
        var fileName = fileList[i].path;
        if (fs.existsSync(fileName)) {
            var stats = fs.statSync(fileName);
        }
        fileList[i].time = stats.birthtime;
        fileList[i].size = stats.size;
    }
}

//Port on which the pplication is listening
/*app.listen(8081,function(){
    //console.log("awesome")
    console.log("Started listening on port", 8081);
})*/

app.listen(port)
console.log("server started on port " + port)

