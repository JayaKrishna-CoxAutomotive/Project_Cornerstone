var React = require("react");
var Router=require("react-router");
var Route=require("react-router");
var ReactDOM = require('react-dom');
var $ = require ('jquery');
var LocalStrategy = require('passport-local').Strategy;

      

module.exports = React.createClass({

  login:function(e){
     const formData = {};
     e.preventDefault();
     for (const field in this.refs) {
      formData[field] = this.refs[field].value;
    }
    console.log('-->', formData);
     console.log("Login")
     $.ajax({
      url: "http://localhost:3000/login",
      dataType: 'json',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(formData),
      success: function(data) {
        //We set the state again after submission, to update with the submitted data
        console.log("great")
      
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("error status"+err)
        console.log(status)
        console.log("end"+xhr)
        console.error("http://localhost:3000/login", status, err.toString());
      }.bind(this)
    });

  },
  

//  FLUX Actions--Dispatchers--Stores--Views

    render:function(){
        const wellStyles = {Width: 400, margin: '0 auto 10px'};
        return(
<form className="form"  onSubmit={this.login}>
  <div class="form-group">
    <label className="control-label">Username</label>
    <input ref="username" type="text" className="form-control" class="form-control" name="username" placeholder="Username"/>
  </div>
  <div class="form-group">
    <label className="control-label">Password</label>
    <input ref="password" type="password" className="form-control" class="form-control" name="password" placeholder="Password"/>
  </div>
  <button type="submit" className="form-control" class="btn btn-default">Submit</button>
</form>
        )
    }
})



   
  