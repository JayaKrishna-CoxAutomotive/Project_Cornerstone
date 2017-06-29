var React = require("react");
var Router=require("react-router");
var Route=require("react-router");
var ReactDOM = require('react-dom');
var $ = require ('jquery');


      

module.exports = React.createClass({
  

//  FLUX Actions--Dispatchers--Stores--Views

    render:function(){
        const wellStyles = {Width: 400, margin: '0 auto 10px'};
        return(
<form method="post" action="/users/login">
  <div class="form-group">
    <label className="control-label">Username</label>
    <input type="text" className="form-control" class="form-control" name="username" placeholder="Username"/>
  </div>
  <div class="form-group">
    <label className="control-label">Password</label>
    <input type="password" className="form-control" class="form-control" name="password" placeholder="Password"/>
  </div>
  <button type="submit" className="form-control" class="btn btn-default">Submit</button>
</form>
        )
    }
})



   
  