var React = require("react");
var Router=require("react-router");
var Route=require("react-router");
var ReactDOM = require('react-dom');
import {browserHistory} from 'react-router';

var $ = require ('jquery');



class register extends React.Component {
  
    handleSubmit(e){
      browserHistory.push('/Login');
       alert('You are ready to login with your new username')
      browserHistory.push('/login');
      // this.setState({ redirectToNewPage: true })
      //   e.preventDefault();
    }

//  FLUX Actions--Dispatchers--Stores--Views

    render(){
        return(
            <form className="form" onSubmit={this.handleSubmit}>      
   <div class="form-group">
    <label className="control-label">Name</label>
    <input type="text"  className="form-control" class="form-control" placeholder="Name" name="name" required/>
  </div>
  <div class="form-group">
    <label>Username</label>
    <input type="text" className="form-control" class="form-control" placeholder="Username" name="username" required/>
  </div>
   <div class="form-group">
    <label>Email</label>
    <input type="email"  className="form-control" class="form-control" placeholder="Email" name="email" required/>
  </div>
  <div class="form-group">
    <label>Password</label>
    <input type="password" className="form-control"  class="form-control" placeholder="Password" name="password" required/>
  </div>
  <div class="form-group">
    <label>Confirm Password</label>
    <input type="password" className="form-control" class="form-control" placeholder="Password" name="password2" required/>
  </div>
  <button type="submit" className="form-control" class="btn btn-default">Submit</button>
</form>
        )
    }
}



   
  export default register