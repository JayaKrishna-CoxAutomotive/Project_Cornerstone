import React, { Component } from 'react';
import { Link } from 'react-router';
import SplitPane from 'react-split-pane';
import Popup from 'react-popup';
import Dropdown from 'react-dropdown'

//var SplitPane=require('SplitPane');
  var $ = require ('jquery');

var moviearr=[];     
var ProcessInstancesF=[];
var instanceLog=[]

class Car extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: undefined,
            dragging: false,
        };
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleDragStart() {
        this.setState({
            dragging: true,
        });
    }

    handleDragEnd() {
        this.setState({
            dragging: false,
        });
        setTimeout(() => {
            this.setState({ size: undefined });
        }, 0);
    }

    handleDrag(width) {
        if (width >= 300 && width <= 400) {
            this.setState({ size: 300 });
        } else if (width > 400 && width <= 500) {
            this.setState({ size: 500 });
        } else {
            this.setState({ size: undefined });
        }
    }
    getProcessData(){
        

                    $.ajax({
                    type: 'POST',
                    url: 'http://localhost:3000/getAllProcess',
                    async : false,
                    dataType : 'json',
                    success: function (data){
                        console.log("Hello")
                        console.log(data[2].ProcessName);
                        for(let i=1;i<10;i++){
                            moviearr[i]=(data[i].ProcessName)
                        };
                        
                    },
                  

                });
                console.log(moviearr.length);
                for(let i=1;i<10;i++)
                {
                         //console.log(moviearr[i]);
                }



                //console.log(moviearr);
                          
    }
   
     getProcessInstance(event) {
         ProcessInstancesF=[]
        var data = { 'processName':event.target.getAttribute('value')};
        console.log(data)
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/getProcessInstance',
            data: data,
            async: false,
            dataType: 'json',
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    ProcessInstancesF[i] = (data[i]._id);
                }
                console.log(ProcessInstancesF);
            },
        });
        this.forceUpdate();
    }

    getInstanceLog(event) {
        var data = { 'processInstanceId': event.target.getAttribute('value')};
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/getInstanceLog',
            data: data,
            async: false,
            dataType: 'json',
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    instanceLog[i] = (data[i].LogDescription);
                }

                console.log(instanceLog);
                 alert ("instanceLog");
            },
        });
    }


    getComponent(event) {
        //event.preventDefault()
       console.log(event.target.getAttribute('value'));
       
      //event.currentTarget.style.backgroundColor = '#ccc';
  }
  _onSelect (option) {
    console.log('You selected ', option.label)
    this.setState({selected: option})
  };


    render(){
    
          const dropWarnStyle = {
            backgroundColor: 'yellow',
            left: 300,
            width: 200,
        };
        const centeredTextStyle = {
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
        };
        this.getProcessData();


        // Get data from route props
        const cars = this.props.route.data;
       
        //const numbers = [1, 2, 3, 4, 5]
        // Map through cars and return linked cars
         const listItems = moviearr.map((number) =>
         
        <li value={number} onClick={this.getProcessInstance.bind(this)} className="list-group-item">{number}</li>
  );
  
         const numbers = [1, 2, 3, 4, 6]
        // Map through cars and return linked cars
         const ProcessInstances = ProcessInstancesF.map((number) =>
        <li value={number} onClick={this.getInstanceLog.bind(this)} className="list-group-item">{number}</li>)
        return (
            <SplitPane  split="vertical" minSize={150} defaultSize={445}>
             
            <div style={Object.assign({})} >
            <h1>Process</h1>
               {listItems}
            {/*<Dropdown listItems={moviearr}  onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />*/}

           </div >
           <div style={Object.assign({})}>
               <h1> Process Instances</h1>
            {ProcessInstances}
               </div>
        </SplitPane>
        
         /* <div style={{ height: '100%' }}>
                <SplitPane
                    size={this.state.dragging ? undefined : this.state.size}
                    onChange={this.handleDrag}
                    onDragStarted={this.handleDragStart}
                    onDragFinished={this.handleDragEnd} split="vertical" minSize={50} defaultSize={100}
                >
                    <div style={{ backgroundColor: 'blue', height: '100%', zIndex: 1, opacity: 0.1 }} />
                    <div />
                </SplitPane>
                <div style={Object.assign({}, centeredTextStyle, { left: 0, width: 300 })} className="list-group">
                    {listItems}
                </div>
                <div style={Object.assign({}, centeredTextStyle, dropWarnStyle)}>
                    Will snap to edges
                </div>
                <div style={Object.assign({}, centeredTextStyle, { left: 500, width: 'calc(100% - 500px)' })}>
                    Can drop anywhere
                </div>
            </div>*/
 
        );
    }
}

export default Car
