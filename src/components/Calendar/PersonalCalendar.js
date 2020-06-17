import React, { Component, Fragment } from 'react'
import Axios from 'axios'
import CalendarEvent from './CalendarEvent'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const config = require("../../config.json")
class PersonalCalendar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            selectedDate: new Date(),
            calendarEvents:[],
            newEvent:{
                id: 0,
                day: 0,
                month: 0,
                year: 0,
                startTime: 0,
                endTime: 0,
                response: "TESTING",
                username: '',

            }
        }
    }

    handleEventFormChange = (event) => {
        this.setState({
            newEvent:{
                ...this.state.newEvent,
                [event.target.name]: event.target.value ? parseInt(event.target.value) : ''
            }
        })

        console.log(this.state.newEvent)
        
    }
    

    handleNewEventSubmit = async (event) =>{
        // Todo
        let response = null

        try{
            response = Axios.post(
                `${config.api.invokeUrl}/calendarevents/${this.state.newEvent.id}`,


            )
        } catch (error) {
            console.log(`Unable to create new calendar events: ${error}`)
        }

    }




    fetchCalendarEvents = async () => {
        let response = null
        try{
            response = await Axios.get( `${config.api.invokeUrl}/calendarevents`);
            this.setState({
                calendarEvents: response.data.Items
            })
            console.log(this.state.calendarEvents)
        } catch(error) {
            console.log(`Unable to retrieve calendar events: ${error}`)
        }
    }
    handleCreateEvent = async (id, event) =>{

    }
    handleDateClick = (date) =>{
        this.setState({
            newEvent: {
                ...this.state.newEvent,
                day: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear()
            }
        })
        
    }


    componentDidMount = () => {
        console.log(this.props.authProps)
        this.setState({
            newEvent: {
                ...this.state.newEvent,
                username: this.props.authProps.user.attributes.email
            }
        })
        this.fetchCalendarEvents()
    }

    render() {
        const create = React.createElement
        return (
            create(Fragment, null, 
                create('section', {style:{"textAlign": "center"}},
                    create(Calendar, 
                        {
                            onClickDay: this.handleDateClick,
                            value: this.state.selectedDate
                        }, null),
                    this.state.calendarEvents && this.state.calendarEvents.length > 0 
                    ? this.state.calendarEvents.map(
                        calendarEvent => 
                        create(CalendarEvent,
                            {
                                key: calendarEvent.id,
                                id: calendarEvent.id,
                                username: calendarEvent.username,
                                day: calendarEvent.day,
                                month: calendarEvent.month,
                                year: calendarEvent.year,
                                startTime: calendarEvent.starttime,
                                endTime: calendarEvent.endtime,
                                reason: calendarEvent.reason,
                            }), null)
                    : create('h1', null, "No events"),
                    create('form', {onSubmit:this.handleNewEventSubmit},
                        create('div', {}, 
                            create('label', {className: "p-1"}, "DynamoDB ID"),
                            create('input', {
                                type: "number", 
                                name: "id",
                                onChange: this.handleEventFormChange,
                                value:this.state.newEvent.id,
                                placeholder: "Enter New ID"

                            }, null),
                        ),
                        create('div', {}, 
                            create('label', {className: "p-1"}, "Enter Day"),
                            create('input', {
                                type: "number", 
                                name: "day",
                                onChange: this.handleEventFormChange,
                                value:this.state.newEvent.day,
                                placeholder: "Enter Day"
                            }, null)
                        ),
                        create('div', {}, 
                            create('label', {className: "p-1"}, "Enter Month"),
                            create('input', {
                                type: "number",
                                name: "month",
                                onChange: this.handleEventFormChange,
                                value:this.state.newEvent.month,
                                placeholder: "Enter Month"
                            }, null)
                        ),
                        create('div', {}, 
                            create('label', {className: "p-1"}, "Enter Year"),
                            create('input', {
                                type: "number",
                                name: "year", 
                                onChange: this.handleEventFormChange,
                                value:this.state.newEvent.year,
                                placeholder: "Enter Year"
                            }, null)
                        ),
                        create('div', {}, 
                            create('label', {className: "p-1"}, "Enter Start Time"),
                            create('input', {
                                type: "number",
                                name: "startTime",
                                onChange: this.handleEventFormChange,
                                value:this.state.newEvent.startTime,
                                placeholder: "Enter Start Time"
                            }, null)
                        ),
                        create('div', {}, 
                            create('label', {className: "p-1"}, "Enter End Time"),
                            create('input', {
                                type: "datetime", 
                                name: "endTime",
                                onChange: this.handleEventFormChange,
                                value:this.state.newEvent.endTime,
                                placeholder: "Enter End time"
                                }, null)
                        ),
                        create('button', {type: "submit"}, "Submit New Event")
                        // create('input', {
                        //     type: "radio", 
                        //     value:this.state.newEvent.id,
                        //     placeholder: "Enter New ID"
                        // }, null),
                        )
                    )
        )       )
    }
}

export default PersonalCalendar
