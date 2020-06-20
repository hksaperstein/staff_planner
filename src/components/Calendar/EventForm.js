import React, { Component } from 'react'
import DateTimePicker from 'react-datetime-picker'
class EventForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            eventReasons: ["Vacation", "Family", "Other"],
            eventAllDay: false,
            calendarEvent:{
                id: 0,
                startDate: new Date(),
                endDate: new Date(),
                eventReason: ""
                
            }
             
        }
    }
    handleIDChange = (event) => {
        this.setState({
            calendarEvent:{
                ...this.state.calendarEvent,
                id: parseInt(event.target.value)
            }
        })
        // console.log(this.state.calendarEvent.startDate)
    }
    handleReasonSelection = (event) =>{
        const value = event.target.value
        this.setState({
            calendarEvent:{
                ...this.state.calendarEvent,
                eventReason: value
            }
        })
    }

    handleDateChange = (date, name) =>{
        this.setState({
            calendarEvent:{
                ...this.state.calendarEvent,
                [name]: date
            }
        })
    }

    componentDidMount(){
        console.log(this.state.calendarEvent.eventReason)
    }
    
    render() {
        const create = React.createElement
        const {calendarEvent} = this.state
        return (
            create('div', null, 
                //TODO add required functionality
                create('form', {onSubmit: (event) => this.props.onSubmitButton(calendarEvent, event)},
                // TODO Change this to UUID somehow..
                    create('div', {}, 
                        create('label', {className: "p-1"}, "DynamoDB ID"),
                        create('input', {
                            type: "number", 
                            name: "id",
                            required: true,
                            onChange: this.handleIDChange,
                            value: this.state.calendarEvent.id,
                            placeholder: "Enter New ID"

                        }, null)
                    ),

                    // TODO add all day selection and functionality
                    create('div', null, 
                        create('label', null, "Start Date and Time"),
                        create(DateTimePicker, {
                            name: "startDate",
                            disableClock: true,
                            value: this.state.calendarEvent.startDate,
                            onChange: (date, name) => this.handleDateChange(date, "startDate")
                        })
                    ),
                    create('div', null, 
                        create('label', null, "End Date and Time"),
                        create(DateTimePicker, {
                            name: "endDate",
                            disableClock: true,
                            value: this.state.calendarEvent.endDate,
                            onChange: (date, name) => this.handleDateChange(date, "endDate")
                        })
                    ),
                    create('div', {}, 
                        create('h2', null, "Reason for Absence"),
                        this.state.eventReasons.map(
                            reason =>
                            create('div', {key: `${reason}`}, 
                                create('label', {}, `${reason}`,
                                    create('input', {
                                        type:"radio",
                                        value: `${reason}`,
                                        checked: this.state.calendarEvent.eventReason === `${reason}`,
                                        onChange: this.handleReasonSelection
                                    })
                                )
                            )
                        )
                    ),
                    // create(DatetimeRangePicker,
                    //     {
                    //         inline: true,
                    //         onChange: this.handleDateSelectionChange,
                    //         onEndDateChange: this.handleEndDateSelectionChange,
                    //         startDate: this.state.eventDates.startDate,
                    //         endDate: this.state.eventDates.endDate
                    //     }, this.state.eventDates.startDate),
                    create('button', {type: "submit"}, "Submit New Event")
                )
            )
        )
    }
}

export default EventForm
