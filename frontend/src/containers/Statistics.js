import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Time from '../components/Time'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
const server = "http://localhost:5000/";

function appendLeadingZeroes(n){
    if(n <= 9){
      return "0" + n;
    }
    return n
}

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = { tablepart: "",
        }
    }
    render() {
        let tabledata;
        fetch(server+ "users/" + this.props.userId + "/listall/", {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => tabledata = data)
        .then(() => {tabledata.forEach(function(element) {
            //Start Time
            let tmpDate = (new Date(element.startTime))
            element.startTime = tmpDate.getFullYear() + "/" + (tmpDate.getMonth() + 1) + "/" + tmpDate.getDate() + " " + appendLeadingZeroes(tmpDate.getHours()) + ":" + appendLeadingZeroes(tmpDate.getMinutes()) + ":" + appendLeadingZeroes(tmpDate.getSeconds());
            tmpDate = (new Date(element.endTime))
            element.endTime = tmpDate.getFullYear() + "/" + (tmpDate.getMonth() + 1) + "/" + tmpDate.getDate() + " " + appendLeadingZeroes(tmpDate.getHours()) + ":" + appendLeadingZeroes(tmpDate.getMinutes()) + ":" + appendLeadingZeroes(tmpDate.getSeconds());
            //Elapse
            let secs = element.elapse;
            let minutes = Math.floor(secs/60);
            let hours = Math.floor(minutes/60);
            secs = secs%60;
            minutes = minutes % 60;
            if(hours > 0) {
                if(hours === 1) {
                    hours = hours + " hr ";
                }
                else {
                    hours = hours + " hrs ";
                }
            }
            else hours = "";
            if(minutes > 0) {
                if(minutes === 1) {
                    minutes = minutes + " min ";
                }
                else {
                    minutes = minutes + " mins ";
                }
            }
            else minutes = "";
            if(secs > 0) {
                if(secs === 1) {
                    secs = secs + " sec";
                }
                else {
                    secs = secs + " secs";
                }
            }
            else secs = "";
            element.elapse = hours + minutes + secs;
            //isPomodoro
            if(element.isPomodoro) {
                element.isPomodoro = "✓";
            }
            else element.isPomodoro = "";
          });})//modified data
        .then(() => this.setState({tablepart: <ReactTable className="statTable -highlight" data={tabledata} defaultPageSize={20} columns={[
            {
                Header: "Working On",
                accessor: "title"
            },
            {
                Header: "Start from",
                accessor: "startTime"
            },
            {
                Header: "To",
                accessor: "endTime"
            },
            {
                Header: "For",
                accessor: "elapse"
            },
            {
                Header: "Pomodoro?",
                accessor: "isPomodoro"
            }
        ]} />}))        
    return (
        <div>
            <NavLink to="/setting" className="SettingLink">Setting</NavLink>
            <NavLink to="/Home" className="StatLink">Home</NavLink>
            <Time className="Timer-header" hours={this.props.hours} minutes={this.props.minutes} seconds={this.props.seconds} showHours={this.props.showHours}/>
            {this.state.tablepart}
        </div>
    )
    }
}

export default Statistics;
