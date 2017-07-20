import React, { Component } from 'react';
import { Link } from 'react-router';
import SplitPane from 'react-split-pane';
import Popup from 'react-popup';
import Dropdown from 'react-dropdown'
var $ = require('jquery');
var classNames = require('classnames');
var FileInput = require('react-file-input');
var JSONViewer = require('react-json-viewer');

var dataSetList = [];
var metaData = undefined;
var moviearr=[]
var state_selected=''
//---------------------------------------------
class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            size: undefined,
            dragging: false,
            files: [],
            dataSetFlag: false,
            ProcessFlag: false,
            metaDataFlag: false,
            show: true,
            initial: false,
            class: undefined,
        };
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }


    componentWillMount() {
        var self = this;
        $.ajax({
            async: "false",
            url: "http://localhost:3000/getDataSetList",
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json',
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    dataSetList[i] = { Name: data[i].Name, Path: data[i].path };
                }
                self.setState({ dataSetFlag: true });
            }
        }),
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
                self.setState({ ProcessFlag: true });

            },


        })
        console.log(moviearr)
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
    handleInputChange(e) {
        var self = this;
        if (e != null) {
            e.preventDefault();
            var name = e.target.name;
            var state = this.state;
            state[name] = e.target.value;
            this.setState(state);
            var data = { 'dataSetPath': e.target.id };
            console.log(data);
        } else {
            var data = { 'dataSetPath': dataSetList[0].Path };
            self.setState({ class: dataSetList[0].Path });
            self.setState({ initial: true });
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/getMetaData',
            data: data,
            async: false,
            dataType: 'json',
            success: function (data) {
                metaData = data;
                self.setState({ metaDataFlag: true });
                self.setState({ class: e.target.id });
            }
        });

    }
     handleInputChange1(e){
      e.preventDefault();
    
      var name = e.target.name;
      //console.log( e.target.value)
       state_selected = e.target.value;
      console.log(state_selected )
       var state = this.state;
      state[name] = e.target.value;
      this.setState(state);
      
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

    handleChange(e, results) {
        console.log(results);
        results.forEach(result => {
            const [e, file] = result;
            this.props.dispatch(uploadFile(e.target.result));
            console.log(`Successfully uploaded ${file.name}!`);
        });
    }
    addtoProducer(e){
        console.log(state_selected)
  
  /* $.ajax({
      url: "http://localhost:3000/defineProcess",
      dataType: 'json',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(lookup),
      success: function(data) {
        //We set the state again after submission, to update with the submitted data
        this.setState({data: data});
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:8081/defineProcess", status, err.toString());
      }.bind(this)
    });*/
   
}

    render() {
        if (this.state.dataSetFlag && this.state.ProcessFlag) {
            var Process_List = moviearr.map((env) =>
                <option value={env}>{env}</option>
            );
            if (!this.state.initial) {
                this.handleInputChange();
            }
            var dslist = [];
            for (var i = 0; i < dataSetList.length; i++) {
                var liClasses = classNames({
                    'list-group-item': true,
                    'active': this.state.class === dataSetList[i].Path
                });
                dslist.push(<li id={dataSetList[i].Path} value={dataSetList[i].Path} key={dataSetList[i].Path} onClick={this.handleInputChange.bind(this)} className={liClasses}>{dataSetList[i].Path}</li>);
            }
            return (
                <SplitPane split="vertical" minSize={150} defaultSize={445}>
                    <div style={Object.assign({})} >
                        <h4>Data Set</h4>
                        <div>
                            {dslist}
                        </div>
                    </div >
                    <div style={Object.assign({})}>
                      
                        <h4>Meta Data</h4>
                        <JSONViewer json={metaData}></JSONViewer>
                          <div className="form-group">
                    <button className="btn" type="submit">Process</button>
                </div>

                <div className="form-group" >
                     <form className="form" >
                        <label className="control-label" htmlFor="selection">Business Unit Name:</label>
                        <select className="form-control" id="BusinessUnit" name="name" value={this.state.name} onChange={this.handleInputChange1}  >
                            {Process_List}
                        </select>
                         <button className="btn" onClick={this.addtoProducer} type="submit">Add to Producer</button>
                         </form>
                    </div>
                   
                    </div>
                </SplitPane>
            );
        } else {

            return <div>No result found for this subscription</div>;

        }
    }
}

export default About