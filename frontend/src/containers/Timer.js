import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Setting from './Setting'
import Statistics from './Statistics'
import Home from './Home'
const server = "http://localhost:5000/";

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {hours: 0, minutes: 0, seconds: 0, showHours: true, userId: 1, pomodoroMinutes: 10, altFont: false,
            pomodoro: false, intervalId: null, inTimer: false, pause: false, input:"", startTime: new Date()};
        this.setPomodoro = this.setPomodoro.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.changeFont = this.changeFont.bind(this);
        this.intervalHandle = null;
        this.tick = this.tick.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.pauseTimer = this.pauseTimer.bind(this);
        this.continueTimer = this.continueTimer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.endNormal = this.endNormal.bind(this);
        this.endPomodoro = this.endPomodoro.bind(this);
        this.changePomo = this.changePomo.bind(this);
        this.resetState = this.resetState.bind(this);
        this.changeHours = this.changeHours.bind(this);
    }
    setPomodoro(time) {
        this.setState((prevstate, props) =>({pomodoroMinutes: time}));
    }
    handleChange(event) {
        this.setState({input: event.target.value});
    }
    changePomo(event) {
        if(!this.state.inTimer || (this.state.inTimer && !this.state.pomodoro)) {
            if(this.state.pomodoro) {
                if(parseInt(event.target.value) >= 60 && this.state.showHours) {
                    console.log("in greater");
                    
                    let minute = parseInt(event.target.value)%60;
                    let hours = Math.floor(parseInt(event.target.value)/60);
                    this.setState({hours: hours, minutes: minute, pomodoroMinutes: parseInt(event.target.value)})
                }
                else
                    this.setState({hours: 0, minutes: parseInt(event.target.value), pomodoroMinutes: parseInt(event.target.value)})
            }
            else
                this.setState({pomodoroMinutes: parseInt(event.target.value)})
        }
    }
    resetState() {
        clearInterval(this.state.intervalId);
        if(this.state.pomodoro) {
            let hours = 0;
            let minutes = this.state.pomodoroMinutes;
            if(minutes > 60 && this.state.showHours) {
                hours++;
                minutes -= 60;
            }
            this.setState({inTimer: false, pause: false, hours: hours, minutes: minutes, seconds: 0, input:""})
        }
        else {
            this.setState({inTimer: false, pause: false, hours: 0, minutes: 0, seconds: 0, input:""})
        }
    }
    endNormal() {
        let elapse = this.state.minutes * 60 + this.state.seconds;;
        if(this.state.isPomodoro) {
            elapse = this.state.pomodoroMinutes * 60 - elapse;
        }
        fetch(server+ "users/" + this.state.userId + "/newtask/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                userId: this.state.userId,
                title: this.state.input,
                startTime: this.state.startTime,
                endTime: new Date(),
                elapse: elapse,
                isPomodoro: false
            })
        })
        .then(
            function(response) {
                response.json().then(function(data) {
                    console.log(data);
                });
            }
        )
        .then(()=>this.resetState())
        .catch((err) => console.log('Error :', err));
    }

    endPomodoro() {
        fetch(server+ "users/" + this.state.userId + "/newtask/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                userId: this.state.userId,
                title: this.state.input,
                startTime: this.state.startTime,
                endTime: new Date(),
                elapse: this.state.pomodoroMinutes*60,
                isPomodoro: true
            })
        })
        .then(
            function(response) {
                response.json().then(function(data) {
                    console.log(data);
                });
            }
        )
        .then(()=>this.resetState())
        .catch((err) => console.log('Error :', err));
    }

    changeFont() {
        this.setState((prevstate, props) =>({altFont: !prevstate.altFont}));
    }
    changeHours() {
        if(this.state.showHours) {
            this.setState((prevstate, props) =>({hours:0, minutes: prevstate.hours*60+prevstate.minutes, showHours: !prevstate.showHours}));
        }
        else {
            this.setState((prevstate, props) =>({hours: Math.floor(prevstate.minutes/60), minutes: prevstate.minutes%60, showHours: !prevstate.showHours}));
        }
    }
    changeMode(pomodoro) {
        if(pomodoro) {
            this.setState((prevstate, props) =>({minutes: prevstate.pomodoroMinutes, pomodoro: pomodoro}));
        }
        else {
            this.setState((prevstate, props) =>({minutes: 0, pomodoro: pomodoro}));
        }
    }
    tick() {
        if(this.state.pomodoro) {//pomodoro
            if(this.state.seconds > 0) {
                this.setState((prevstate, props) =>({seconds: prevstate.seconds - 1}));
            }
            else {
                if(this.state.minutes > 0)
                    this.setState((prevstate, props) =>({minutes: prevstate.minutes - 1, seconds: 59}));
                else {
                    if(this.state.showHours && this.state.hours > 0) {
                        this.setState((prevstate, props) =>({hours: prevstate.hours - 1, minutes: 59, seconds: 59}));
                    }
                    else {
                        this.endPomodoro();//End Pomodoro
                    }
                }
            }
            
        }
        else {//time
            if(this.state.seconds < 59) {
                this.setState((prevstate, props) =>({seconds: prevstate.seconds + 1}));
            }
            else{
                this.setState((prevstate, props) =>({minutes: prevstate.minutes + 1, seconds: 0}))
            }
        }
    }
    startTimer() {
        var intervalId;
        intervalId = setInterval(this.tick, 1000);
        this.setState((prevstate, props) =>({intervalId: intervalId, inTimer: true, startTime: new Date()}));
    }
    pauseTimer() {
        clearInterval(this.state.intervalId);
        this.setState((prevstate, props) =>({pause: true}));
    }
    continueTimer() {
        var intervalId;
        intervalId = setInterval(this.tick, 1000);
        this.setState((prevstate, props) =>({intervalId: intervalId, pause: false}));
    }
    render() {
        
        let font = "tradFont";
        if(!this.state.altFont) {
        font = "modernFont";
        }
        return (
            <div className={font}>
                <Switch>
                    <Route exact path="/setting" render={(props) => <Setting {...props} fontBool={this.state.altFont} changeFont={this.changeFont}
                    hours={this.state.hours} minutes={this.state.minutes} seconds={this.state.seconds} showHours={this.state.showHours}
                    pomoMinutes={this.state.pomodoroMinutes} changePomo={this.changePomo} changeHours={this.changeHours}/>} />

                    <Route exact path="/statistics" render={(props) => <Statistics {...props} userId={this.state.userId}
                    hours={this.state.hours} minutes={this.state.minutes} seconds={this.state.seconds} showHours={this.state.showHours}/> } />

                    <Redirect from="/home" to="/" />
                    <Route path="/" render={(props) => <Home {...props} hours={this.state.hours} minutes={this.state.minutes}
                    seconds={this.state.seconds} showHours={this.state.showHours} startTimer={this.startTimer} pause={this.state.pause}
                    changeMode={this.changeMode} checkBoxValue={this.state.pomodoro} inTimer={this.state.inTimer} pauseTimer={this.pauseTimer} endTimer={this.endNormal}
                    continueTimer={this.continueTimer} handleChange={this.handleChange} input={this.state.input}/>} />

                </Switch>
            </div>
        )
    }
}

export default Timer;
