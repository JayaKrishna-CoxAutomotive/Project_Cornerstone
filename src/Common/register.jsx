var React = require("react");
var Router=require("react-router");
var Route=require("react-router");
var ReactDOM = require('react-dom');
import {browserHistory} from 'react-router';

var $ = require ('jquery');
var Errors=[]

class register extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
   handleSubmit(e) {
    e.preventDefault();
    
    const formData = {};
    for (const field in this.refs) {
      formData[field] = this.refs[field].value;
    }
    console.log('-->', formData);
  
    $.ajax({
      url: "http://localhost:3000/register",
      dataType: 'json',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(formData),
      success: function(data) {
        //We set the state again after submission, to update with the submitted data
        console.log("great")
        console.log(data);
        Errors.push(data)
        console.log(Errors.length)
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("error status"+err)
        console.log(status)
        console.log("end"+xhr)
        console.error("http://localhost:3000/register", status, err.toString());
      }.bind(this)
    });
     //console.log("here are your ")
     console.log("Length of error matrix"+Errors.length)
     //browserHistory.push('/Login');
       //alert('You are ready to login with your new username')
   }
      //browserHistory.push('/Login');
       //alert('You are ready to login with your new username')
      //browserHistory.push('/login');
      // this.setState({ redirectToNewPage: true })
      //   e.preventDefault();
    

//  FLUX Actions--Dispatchers--Stores--Views

    render(){
      console.log("here are your errors"+Errors);
      
        return(
           <form className="form" onSubmit={this.handleSubmit}>  
             <div className='alert-danger'>Waring </div>
   <div class="form-group">
    <label className="control-label">Name</label>
    <input ref="name" type="text"  className="form-control" class="form-control" placeholder="Name"  name="name" required/>
  </div>
  <div class="form-group">
    <label>Username</label>
    <input ref="username" type="text" className="form-control" class="form-control" placeholder="Username" name="username" required/>
  </div>
   <div class="form-group">
    <label>Email</label>
    <input ref="email" type="email"  className="form-control" class="form-control" placeholder="Email" name="email" required/>
  </div>
  <div class="form-group">
    <label>Password</label>
    <input ref="password" type="password" className="form-control"  class="form-control" placeholder="Password" name="password" required/>
  </div>
  <div class="form-group">
    <label>Confirm Password</label>
    <input ref="password2" type="password" className="form-control" class="form-control" placeholder="Password" name="password2" required/>
  </div>
  <button type="submit" className="form-control"   class="btn btn-default">Submit</button>
</form>
        )
    }
}
   
  export default register