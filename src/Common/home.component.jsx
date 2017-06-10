var React = require("react");
var Router=require("react-router");
var Route=require("react-router");
var ReactDOM = require('react-dom');
var $ = require ('jquery')



      

module.exports = React.createClass({
    getInitialState:function(){
      return {
          name:"",
          tagline:""
      }  
    },
    
 
  
/*    addSchool:function(e){
     var name = e.target.name;
      var state = this.state;
       $.ajax({

      url: "http://localhost:8081/api",
      dataType: 'json',
      type: 'POST',
      data: e.target.name,
      success: function(data) {
        //We set the state again after submission, to update with the submitted data
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
},*/

//  FLUX Actions--Dispatchers--Stores--Views
viewprocess:function(e){
    e.preventDefault();
    //console.log("came her")
     //console.log(<Process />)
     //console.log(<Chokers />)
        return <Chokers />
        
     
   
},

handleClick(compName, e){
        console.log(compName);
        this.setState({render:compName});        
      },
   
addSchool:function(e){
    e.preventDefault();
     //actions.addSchool(this.state);
var name = e.target.name;
      var state = this.state;
      var lookup = {
    
    'description': state,
}
   $.ajax({
      url: "http://localhost:3000/defineProcess",
      dataType: 'json',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(lookup),
      success: function(data) {
        //We set the state again after submission, to update with the submitted data
        this.setState({data: data});
        console.log(data)
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:8081/defineProcess", status, err.toString());
      }.bind(this)
    });
      this.setState({
      BusinessUnit: '',
      Env:'',
      name:'',
      address:''

    });
},
    handleInputChange:function(e){
      e.preventDefault();
      var name = e.target.name;
      var state = this.state;
      state[name] = e.target.value;
      this.setState(state);
    },

    render:function(){
        const wellStyles = {Width: 400, margin: '0 auto 10px'};
        return(
            <form className="form" >
                    <div className="form-group">
                    <label className="control-label" htmlFor="BusinessUnit">Business Unit Name:</label>
                    <input type="text" className="form-control" id="BusinessUnit" name="BusinessUnit" value={this.state.BusinessUnit} onChange={this.handleInputChange} placeholder="Cox Media or Cox Automotive" />                    
                </div>
                  <div className="form-group">
                    <label className="control-label" htmlFor="Env">Environment Name:</label>
                    <input type="text" className="form-control" id="Env" name="Env" value={this.state.Env} onChange={this.handleInputChange} placeholder="AWS or ONPRIME " />                    
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="name">Process Name:</label>
                    <input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Process Name" />                    
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="tagline">Process Description:</label>
                    <input type="text" className="form-control" id="tagline" name="tagline" value={this.state.address} onChange={this.handleInputChange} placeholder="Process Description" />                    
                </div>
            <div className="form-group" style={wellStyles}>
                <label className="control-label" htmlFor="selcetion">Procesnng:</label>
                     <select value={this.state.value} onChange={this.handleInputChange}>
                            <option value="AWS">AWS</option>
                            <option value="OnPrime">ONPRIME</option>
                    </select>
            </div>
                <div className="form-group">
                    <button className="btn" onClick={this.addSchool} type="submit">Add Process</button>
                    <button className="btn" onClick={this.handleClick.bind(this, 'chockers')} type="submit1">View Process</button>
                </div>
                 
            </form>
        )
    }
})
class Chokers extends React.Component {
   render(){
      return <div>Inside Chockers</div>
   }
}

   
  