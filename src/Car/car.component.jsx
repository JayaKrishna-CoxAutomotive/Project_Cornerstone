import React, { Component } from 'react';
import { Link } from 'react-router';
import SplitPane from 'react-split-pane';
//var SplitPane=require('SplitPane');
  var $ = require ('jquery');


        
var moviearr=[];     

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
    getComponent(event) {
        event.preventDefault()
    var el = event.target.value
    console.log(el)
      console.log('li item clicked!');
       
      //event.currentTarget.style.backgroundColor = '#ccc';
  }


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
        <li onClick={this.getComponent.bind(this)} className="list-group-item">{number}</li>
  );
         const numbers = [1, 2, 3, 4, 6]
        // Map through cars and return linked cars
         const ProcessInstances = numbers.map((number) =>
        <li  className="list-group-item">{number}</li>)
        return (
            <SplitPane  split="vertical" minSize={150} defaultSize={445}>
             
            <div style={Object.assign({})}>
            <h1>View Process and Logs</h1>
               {listItems}
           </div >
           <div style={Object.assign({})}>
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
