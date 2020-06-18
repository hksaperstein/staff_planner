import React, { Component, Fragment } from 'react'

class CalendarEvent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            id: null,
            startDate: new Date(),
            endDate: new Date(),
            reason: "",
            username: "",


        }
    }
    componentDidMount = () => {
        this.setState({
            id: this.props.calendarEvent.id,
            startDate: this.props.calendarEvent.dates.startDate,
            endDate: this.props.calendarEvent.dates.endDate,
            reason: this.props.calendarEvent.reason,
            username: this.props.calendarEvent.username

        })
    }
    render() {
        const create = React.createElement
        const {id, startDate, endDate, reason} = this.state
        return (
            create(Fragment, null, 
                create('tr', {key: id},
                    // TODO allow for clickable items and accessability
                    create('td', {name: "Event ID"},`${id}`),
                    create('td', {name: "Event Start Date"}, `${startDate}`),
                    create('td', {name: "Event End Date"}, `${endDate}`),
                    create('td', {name: "Event Reason"}, `${reason}`),
                    create('td', {name: "Event Update Button"},
                        create('button', {type: "button"}, "Update Event")
                    ),
                    create('td', {name: "Event Delete Button"},
                        create('button', {type: "button", onClick: (event) => this.props.onDeleteButton(id, event)}, "Delete Event")
                    )
                )
            )
        );
    };
};

export default CalendarEvent
