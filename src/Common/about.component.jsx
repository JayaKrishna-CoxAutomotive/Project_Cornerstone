import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import SplitPane from 'react-split-pane';
var $ = require('jquery');
var Env = [];
let Old_state=''
var i = 0;
const MAX_HEIGHT = 600;
const ROW_HEIGHT = 42;

var products = [{
    id: 3,
    name: "Product1",
    price: 120
}, {
    id: 2,
    name: "Product2",
    price: 80
},];

function addProducts(quantity) {
    $.ajax({
        async: "false",
        url: "http://localhost:3000/getEnvironment",
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        success: function (data) {
            Env = []
            for (var i = 0; i < data.length; i++) {
              var j=i+1                
                Env.push({
                    name: '' + j,
                     state: '' + data[i].Name,
                });
            }
            console.log(Env)

        }
    });
}


//addProducts(1);
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
    let puEnv = []

    for (const prop in row) {
        
        newRowStr += prop + ': ' + row[prop] + ' \n';
        puEnv = row[prop]
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
        success: function (data) {
            //We set the state again after submission, to update with the submitted data
            //this.setState({data: data});
            console.log(data);
        }.bind(this),
        error: function (xhr, status, err) {
            console.error("http://localhost:3000/CreateEnvironment", status, err.toString());
        }.bind(this)
    });

    //addProducts(1);
    alert('The new row is:\n ' + newRowStr);

}

function customConfirm(next, dropRowKeys) {
    var EnvOld='';
    const dropRowKeysStr = dropRowKeys.join(',');
    var list = dropRowKeysStr.split(",");
    console.log(list.length)
    if(list.length==1){
             EnvOld="'"+Env[dropRowKeysStr-1].state+"'"
    }
    else{
        for(let k=0;k<list.length;k++){
             console.log(Env[list[k]-1].state)
             
             if(k==list.length-1){
                    EnvOld+="'"+Env[list[k]-1].state+"'"
             }
             else{
                    EnvOld+="'"+Env[list[k]-1].state+"',"
             }
        }
    }
   
     
    console.log("teo delete"+ EnvOld)
    console.log(list)
    var lookup = {

        'description': EnvOld,
    }
    console.log(dropRowKeysStr)
    $.ajax({
        url: "http://localhost:3000/DeleteEnvironment",
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(lookup),
        success: function (data) {
            //We set the state again after submission, to update with the submitted data
            //this.setState({data: data});
            console.log(data);
        }.bind(this),
        error: function (xhr, status, err) {
            console.error("http://localhost:3000/DeleteEnvironment", status, err.toString());
        }.bind(this)
    });
    if (confirm(`Are you sure you want to delete ${dropRowKeysStr}?`)) {
        // If the confirmation is true, call the function that
        // continues the deletion of the record.
        next();
    }
}


const cellEditProp = {
  mode: 'click'
};

class NameEditor extends React.Component {
    
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.state = {
      name: props.defaultValue,
      open: true
    };
    console.log(props.defaultValue)
Old_state=''+props.defaultValue

  }
  focus() {
    this.refs.inputRef.focus();
  }
  updateData() {
    this.props.onUpdate(this.state.name);
    var lookup = {

        'description': this.state.name,
        'OldState':Old_state
    }
    console.log(this.state.name)
    console.log(Old_state)
     $.ajax({
        url: "http://localhost:3000/ModifyEnvironment",
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(lookup),
        success: function (data) {
            //We set the state again after submission, to update with the submitted data
            //this.setState({data: data});
            console.log(data);
        }.bind(this),
        error: function (xhr, status, err) {
            console.error("http://localhost:3000/ModifyEnvironment", status, err.toString());
        }.bind(this)
    });

  }
   close (){
    this.setState({ open: false });
    this.props.onUpdate(this.props.defaultValue);
  }
 
  render() {
    const fadeIn = this.state.open ? 'in' : '';
    const display = this.state.open ? 'block' : 'none';
    return (
      <div className={ `modal fade ${fadeIn}` } id='myModal' role='dialog' style={ { display } }>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-body'>
              <input
                ref='inputRef'
                className={ ( this.props.editorClass || '') + ' form-control editor edit-text' }
                style={ { display: 'inline', width: '50%' } }
                type='text'
                value={ this.state.name }
                onChange={ e => { this.setState({ name: e.currentTarget.value }); } } />
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-primary' onClick={ this.updateData }>Save</button>
              <button type='button' className='btn btn-default' onClick={ this.close.bind(this) }>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class About extends Component {


    constructor(props) {
        super(props);
    }
  
    getEnvList() {
        console.log("about")

        $.ajax({
            async: "false",
            url: "http://localhost:3000/getEnvironment",
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json',
            success: function (data) {
                Env = []
                for (var i = 0; i < data.length; i++) {
                    Env.push({
                        name: '' + i+1,
                        state:'' + data[i].Name
                    });
                }
                console.log(Env)

            }
        });

    }


    render() {

        //this.getEnvList();
        addProducts(1);
      
 
       const selectRowProp = {
            mode: 'checkbox',
            bgColor: 'pink',
            showOnlySelected: true
        };
        const cellEditProp = {
            mode: 'click'
};
        var options = {
            afterInsertRow: onAfterInsertRow,
            handleConfirmDeleteRow: customConfirm  // A hook for after insert rows
        };
        const createNameEditor = (onUpdate, props) => (<NameEditor onUpdate={ onUpdate } {...props}/>);


        // this.getEnvironment()
        const numbers = [1, 2, 3, 4, 6]
        // Map through cars and return linked cars
        const ProcessInstances = numbers.map((number) =>
            <li value={number} className="list-group-item">{number}</li>)

        return (
            <div>
                <BootstrapTable data={Env} condensed height={String(Math.min([MAX_HEIGHT, (Env.length + 1) * ROW_HEIGHT]))} cellEdit={ cellEditProp } insertRow={true} deleteRow={true} selectRow={selectRowProp} options={options} search={true} hover pagination >
                    <TableHeaderColumn dataField='name'  width="50" dataAlign="center" isKey={true} >S.No</TableHeaderColumn>
                     <TableHeaderColumn dataField='state' customEditor={ { getElement: createNameEditor } } >State</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default About