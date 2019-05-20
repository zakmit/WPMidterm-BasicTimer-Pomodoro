import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Switch from "react-switch";
import Time from '../components/Time'

class Setting extends Component {
    render() {
        
        return (
            <div>
                <NavLink to="/Home" className="SettingLink">Home</NavLink>
                <NavLink to="/statistics" className="StatLink">Statistics</NavLink>
                <Time className="Timer-header" hours={this.props.hours} minutes={this.props.minutes} seconds={this.props.seconds} showHours={this.props.showHours}/>
                <div className="SettingContainer">
                    <div>
                        <label>
                            <span></span>
                            <Switch className="settingSlider" onChange={this.props.changeFont} activeBoxShadow='0 0 2px 3px #c0c3c4' checked={this.props.fontBool} offColor="#c2c8ca" onColor="#626b6e" uncheckedIcon={false} checkedIcon={false} width={100} height={40} handleDiameter={35}/>
                        </label>
                        <div className="settingDes">
                            Use Alternative Font
                        </div>
                    </div>
                    <div>
                        <label>
                            <span></span>
                            <Switch className="settingSlider" onChange={this.props.changeHours} activeBoxShadow='0 0 2px 3px #c0c3c4' checked={this.props.showHours} offColor="#c2c8ca" onColor="#626b6e" uncheckedIcon={false} checkedIcon={false} width={100} height={40} handleDiameter={35}/>
                        </label>
                        <div className="settingDes">
                            Show hours or not?
                        </div>
                    </div>
                    <div>
                        <input className="PomoInput" placeholder="How long for a Pomodoro?" value={this.props.pomoMinutes} 
                    onChange={this.props.changePomo}/>
                        <div className="settingDes">
                            How long for a Pomodoro?(Can't be modified while Pomodoro timer running)
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Setting;
