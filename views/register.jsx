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
        
         
            <form method="post" action="/users/register">    
         
   <div class="form-group">
    <label className="control-label">Name</label>
    <input type="text"  className="form-control" class="form-control" placeholder="Name" name="name"/>
  </div>
  <div class="form-group">
    <label>Username</label>
    <input type="text" className="form-control" class="form-control" placeholder="Username" name="username"/>
  </div>
   <div class="form-group">
    <label>Email</label>
    <input type="email"  className="form-control" class="form-control" placeholder="Email" name="email"/>
  </div>
  <div class="form-group">
    <label>Password</label>
    <input type="password" className="form-control"  class="form-control" placeholder="Password" name="password"/>
  </div>
  <div class="form-group">
    <label>Confirm Password</label>
    <input type="password" className="form-control" class="form-control" placeholder="Password" name="password2"/>
  </div>
  <button type="submit" className="form-control" class="btn btn-default">Submit</button>
</form>
        )
    }
})



   
  