import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import SplitPane from 'react-split-pane';
import Popup from 'react-popup';
import Dropdown from 'react-dropdown';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

var classNames = require('classnames');
// or in ECMAScript 5 

var products = [{
    id: 1,
    name: "Product1",
    price: 120
}, {
    id: 2,
    name: "Product2",
    price: 80
},{
    id: 3,
    name: "Product2",
    price: 80
},{
    id: 4,
    name: "Product2",
    price: 80
},{
    id: 5,
    name: "Product2",
    price: 80
},{
    id: 1,
    name: "Product1",
    price: 120
}, {
    id: 2,
    name: "Product2",
    price: 80
},{
    id: 3,
    name: "Product2",
    price: 80
},{
    id: 4,
    name: "Product2",
    price: 80
},{
    id: 12,
    name: "Product2",
    price: 80
},{
    id: 11,
    name: "Product2",
    price: 80
}];
//var SplitPane=require('SplitPane');
var $ = require('jquery');
var lastActiveTool = ''
var moviearr = [];
var ProcessInstancesF = [];
var ProcessInstance_Table = [];
var instanceLog = []
var n = '';
var i = 0;
var dataList = []
//For the Table

class Car extends Component {


    /*   constructor(props) {
           super(props);
           this.state = {
               size: undefined,
               dragging: false,
           };
           this.handleDragStart = this.handleDragStart.bind(this);
           this.handleDragEnd = this.handleDragEnd.bind(this);
           this.handleDrag = this.handleDrag.bind(this);

       }*/

    constructor(props) {

        super(props)

        this.state = {
            selectedCircle: {

            },
        };
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
    getProcessData() {

        console.log("hey")
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/getAllProcess',
            async: false,
            dataType: 'json',
            success: function (data) {
                //console.log("Hello")
                //console.log(data[2].ProcessName);
                for (let i = 0; i < data.length; i++) {
                    moviearr[i] = (data[i].ProcessName)
                };

            },


        });

    }
    getIntialProcessInstance() {
        var data = { 'processName': moviearr[0] };
        var classHighlight = 'highlight';
        $(this).addClass(classHighlight);
        lastActiveTool = moviearr[0];
        n = moviearr[0]
        console.log(data)
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/getProcessInstance',
            data: data,
            async: false,
            dataType: 'json',
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    ProcessInstancesF[i] = ("Process Instance Id : " + data[i]._id + "  Start Time : " + data[i].StartTime + "   End Time :  " + data[i].EndTime);
                    ProcessInstance_Table[i] = data[i];
                }
                console.log("ProcessInstancesF");
            },
        });
    }

    getProcessInstance(event) {
        ProcessInstancesF = []
        ProcessInstance_Table = []
        n = event.target.getAttribute('value')
        var data = { 'processName': event.target.getAttribute('value') };

        console.log(data)
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/getProcessInstance',
            data: data,
            async: false,
            dataType: 'json',
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    ProcessInstancesF[i] = ("Process Instance Id : " + data[i]._id + "  Start Time : " + data[i].StartTime + "   End Time :  " + data[i].EndTime);
                    ProcessInstance_Table[i] = data[i];
                }
                //ProcessInstance_Table.push(data)
                console.log("thought as json");
                console.log(ProcessInstance_Table)
                console.log(products)


            }


        });
        this.forceUpdate();
    }

    getInstanceLog(event) {
        //var data = { 'processInstanceId': event.target.getAttribute('value')};
        var list = event.target.getAttribute('value').split(" ");
        console.log(list[4])
        var data = { 'processInstanceId': list[4] };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/getInstanceLog',
            data: data,
            async: false,
            dataType: 'json',
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    instanceLog[i] = ("Log " + (i + 1) + " " + data[i].LogDescription);
                }
                alert(instanceLog.join("\n"));
                console.log(data);
            },
        });
    }


    getComponent(event) {
        //event.preventDefault()
        console.log(event.target.getAttribute('value'));

        //event.currentTarget.style.backgroundColor = '#ccc';
    }
    _onSelect(option) {
        console.log('You selected ', option.label)
        this.setState({ selected: option })
    };



    render() {
        var options = {
            onRowClick: function (row) {
                var list = row._id;
                //console.log(list[4])
                var data = { 'processInstanceId': list };
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:3000/getInstanceLog',
                    data: data,
                    async: false,
                    dataType: 'json',
                    success: function (data) {
                        for (let i = 0; i < data.length; i++) {
                            instanceLog[i] = ("Log " + (i + 1) + " " + data[i].LogDescription);
                        }
                        alert(instanceLog.join("\n"));
                    },
                });

            }
        }

        var classHighlight = 'highlight';
        var $thumbs = $('.list-group-item').click(function (e) {
            e.preventDefault();
            $thumbs.removeClass(classHighlight);
            $(this).addClass(classHighlight);
        });


        var ulStyle = {
            padding: '0px',
            margin: '20px'
        };

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
        if (i == 0) {
            console.log("Intial Instance")
            this.getIntialProcessInstance();
            i++;
        }

        // Get data from route props
        const cars = this.props.route.data;


        // Map through cars and return linked data



        const numbers = [1, 2, 3, 4, 6]
        // Map through cars and return linked cars
        const ProcessInstances = ProcessInstancesF.map((number) =>
            <li value={number} onClick={this.getInstanceLog.bind(this)} className="list-group-item">{number}</li>)


        const listItems = moviearr.map((number) =>

            <li value={number} onClick={this.getProcessInstance.bind(this)} className="list-group-item">{number}</li>
        );


        return (
            <SplitPane split="vertical" minSize={150} defaultSize={445}>

                <div style={Object.assign({})} >
                    <h1>Process Name {this.props.numbers}</h1>
                    {listItems}
                    {/*<Dropdown listItems={moviearr}  onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />*/}

                </div >
                <div  >
                    <h1> Process Instances of {n}</h1>
                    {/*{ProcessInstances}*/}
                      <BootstrapTable data={ProcessInstance_Table} hover options={options} pagination>
                        <TableHeaderColumn dataField='_id' isKey={ true }>P_Inst Id</TableHeaderColumn>
                        <TableHeaderColumn dataField='StartTime' >Start Time</TableHeaderColumn>
                        <TableHeaderColumn dataField='EndTime'>End Time</TableHeaderColumn>
                    </BootstrapTable>

                </div>
            </SplitPane>


        );
    }
}

export default Car
