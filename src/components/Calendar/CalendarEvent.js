import React, { Component } from 'react'

class CalendarEvent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            id: 0,
            day: 0,
            month: 0,
            year: 0,
            starttime: 0,
            endTime: 0,
            reason: "",
            username: ""
        }
    }

    militaryToStandard() {
        return null
    }
    standartToMilitary() {
        return null
    }
    
    render() {
        return (
            <div>
                {this.props.id} {this.props.month}/{this.props.day}/{this.props.year} {this.props.startTime} {this.props.endTime} {this.props.reason} {this.props.username}
            </div>
        )
    }
}

export default CalendarEvent
