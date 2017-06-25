import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import SplitPane from 'react-split-pane';
var $ = require('jquery');
var Env=[];
var i=0;

var products = [{
    id: 3,
    name: "Product1",
    price: 120
}, {
    id: 2,
    name: "Product2",
    price: 80
}, ];

function addProducts(quantity) {
  $.ajax({
            async: "false",
            url: "http://localhost:3000/getEnvironment",
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json',
            success: function (data) {
                Env=[]
                for (var i = 0; i < data.length; i++) {
                    Env.push({
                        name: '' + data[i].Name,
                    });
                }
                console.log(Env)
                 
            }
        });
}

   addProducts(1);
class ActionFormatter extends React.Component {

  render() {
    return (
      <button className='btn btn-info'>Action</button>
    );
  }
}
function actionFormatter(cell, row) {
  return <ActionFormatter />;
}
    function onAfterInsertRow(row) {
         var that = this;
  let newRowStr = '';
  let puEnv=[]

  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
    puEnv=row[prop]
  }
  console.log("kjfnfjk")
  console.log(puEnv)
   var lookup = {
    
    'description': puEnv,
}
   $.ajax({
      url: "http://localhost:3000/CreateEnvironment",
      dataType: 'json',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(lookup),
      success: function(data) {
        //We set the state again after submission, to update with the submitted data
        //this.setState({data: data});
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:3000/CreateEnvironment", status, err.toString());
      }.bind(this)
    });
      addProducts(1);
  alert('The new row is:\n ' + newRowStr);
  
}
class About extends Component {


    constructor(props) {
    super(props);
    }
      getEnvList(){
          console.log("about")
         
        $.ajax({
            async: "false",
            url: "http://localhost:3000/getEnvironment",
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json',
            success: function (data) {
                Env=[]
                for (var i = 0; i < data.length; i++) {
                    Env.push({
                        name: '' + data[i].Name,
                    });
                }
                console.log(Env)
                 
            }
        });
    
  }
     
    
    render() {

     
     
var options = {
  afterInsertRow: onAfterInsertRow   // A hook for after insert rows
};
  
  
   //this.getEnvList();

       // this.getEnvironment()
  
        
        const numbers = [1, 2, 3, 4, 6]
        // Map through cars and return linked cars
        const ProcessInstances = numbers.map((number) =>
            <li value={number} className="list-group-item">{number}</li>)
       return (
      <BootstrapTable data={ Env }  insertRow={ true } options={ options } >
         <TableHeaderColumn dataField='name' isKey={true}>Account</TableHeaderColumn>
      </BootstrapTable>
    );
    }
    }

export default About