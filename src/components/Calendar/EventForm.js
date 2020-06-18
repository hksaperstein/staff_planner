import React, { Component } from 'react'

class EventForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            eventReasons: ["Vacation", "Family", "Other"],
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
        console.log(value)
        this.setState({
            calendarEvent:{
                ...this.state.calendarEvent,
                eventReason: value
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
                create('form', {onSubmit: (event) => this.props.onSubmitButton(calendarEvent, event)},
                    create('div', {}, 
                        create('label', {className: "p-1"}, "DynamoDB ID"),
                        create('input', {
                            type: "number", 
                            name: "id",
                            onChange: this.handleIDChange,
                            value: this.state.calendarEvent.id,
                            placeholder: "Enter New ID"

                        }, null)
                    ),
                    create('div', null, 
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
                        // create('div', null, 
                        //     create('label', {}, "Doctor's Appointment",
                        //         create('input', {
                        //             type:"radio",
                        //             value: "Doctor's Apt.",
                        //             checked: this.state.calendarEvent.eventReason === "Doctor's Apt.",
                        //             onChange: this.handleReasonSelection
                        //         })
                        //     )
                        // ),
                        // create('div', null, 
                        //     create('label', {}, "Family",
                        //         create('input', {
                        //             type:"radio",
                        //             value: "Family",
                        //             checked: this.state.calendarEvent.eventReason === "Family",
                        //             onChange: this.handleReasonSelection
                        //         })
                        //     )
                        // ),
                        // create('div', null, 
                        //     create('label', {}, "Vacation",
                        //         create('input', {
                        //             type:"radio",
                        //             value: "Vacation",
                        //             checked: this.state.calendarEvent.eventReason === "Vacation",
                        //             onChange: this.handleReasonSelection
                        //         })
                        //     )
                        // ),
                        // create('div', null, 
                        //     create('label', {}, "Other",
                        //         create('input', {
                        //             type:"radio",
                        //             value: "Other",
                        //             checked: this.state.calendarEvent.eventReason === "Other",
                        //             onChange: this.handleReasonSelection
                        //         })
                        //     )
                        // )
                         // TODO Add user input for other
                    // ),
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
