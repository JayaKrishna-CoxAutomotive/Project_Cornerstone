import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import SplitPane from 'react-split-pane';
import Popup from 'react-popup';
import Dropdown from 'react-dropdown';
var classNames = require('classnames');
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// or in ECMAScript 5 

var products = [{
    id: 3,
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


    render() {
        const listItems = numbers.map((number) =>

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

                    <BootstrapTable
                        data={products}
                        pagination>
                        <TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
                    </BootstrapTable>

                </div>
            </SplitPane>
             <SplitPane split="vertical" minSize={150} defaultSize={445}>

                <div style={Object.assign({})} >
                    <h1>Process Name </h1>
                    {ProcessInstances}
                    {/*<Dropdown listItems={moviearr}  onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />*/}

                </div >
                <div  >
                    <h1> Process Instances of </h1>
                    <BootstrapTable
                        data={products}
                        hover pagination>
                        <TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
                    </BootstrapTable>

                </div>
            </SplitPane>


        );
    }
}

export default Car
