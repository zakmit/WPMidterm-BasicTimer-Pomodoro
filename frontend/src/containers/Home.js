import React, { Component } from 'react';
import Time from '../components/Time'
import Switch from "react-switch";
import { NavLink } from 'react-router-dom'

function StartButton(props) {
    // console.log(props.pomodoro);
    if(props.pomodoro) {
        return (<button className="startPomoTimer" onClick={props.startTimer}>
        Start
        </button>);
    }
    else {
        return (<button className="startNorTimer" onClick={props.startTimer}>
        Start
        </button>);
    }
}

class Home extends Component {
    constructor(props){
        super(props);
        this.togglecheckBoxValue = this.togglecheckBoxValue.bind(this);
    }
    togglecheckBoxValue() {
        this.props.changeMode(!this.props.checkBoxValue);
    }
    
    render() {
        let main;
        let above = null;
        if(!this.props.inTimer) {
            main =
            <div className="middleClock">
                <Time hours={this.props.hours} minutes={this.props.minutes} seconds={this.props.seconds} showHours={this.props.showHours}/>
                <div>
                    <input className="todo-input" placeholder="What are you doing?" value={this.props.input} 
                    onChange={this.props.handleChange}/>
                </div>
                <div className="clockType">
                    <div className="clockDes">
                        Timer
                    </div>
                    <label>
                        <span></span>
                        <Switch className="Slider" onChange={this.togglecheckBoxValue} activeBoxShadow='0 0 2px 3px #c0c3c4' checked={this.props.checkBoxValue} offColor="#ffda08" onColor="#e02929"  uncheckedIcon={false} checkedIcon={false} width={74} height={30} handleDiameter={25}/>
                    </label>
                    <div className="clockDes">
                        Pomodoro
                    </div>
                </div>
                <div>
                    <StartButton pomodoro={this.props.checkBoxValue} startTimer={this.props.startTimer} />
                </div>
            </div>;
        }
        else {
            above = <div className="currentTask">{this.props.input}</div>;
            let interact = <button onClick={this.props.pauseTimer}>Pause</button>;
            if(this.props.pause) {
                interact = <button onClick={this.props.continueTimer}>Continue</button>
            }
            main =
            <div className="BigClock">
                <Time hours={this.props.hours} minutes={this.props.minutes} seconds={this.props.seconds} showHours={this.props.showHours}/>
                <div className="TimerControll">
                    {interact}
                    <span></span>{/* {Title} */}
                    <button id='endButton' onClick={this.props.endTimer}>End</button>
                </div>
            </div>
        }
        return (
            <div>
                <NavLink to="/setting" className="SettingLink">Setting</NavLink>
                <NavLink to="/statistics" className="StatLink">Statistics</NavLink>
                {above}
                {main}
            </div>
        )
    }
}

export default Home;
